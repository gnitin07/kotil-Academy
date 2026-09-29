/**
 * Kotil Aesthetic Academy: "Request a callback" requests, one row each.
 *
 * This runs inside Google Sheets, not in the website build. Setup, once:
 *
 *   1. Open the Google Sheet the counsellors will work from.
 *   2. Extensions > Apps Script. Delete what is there and paste this file in.
 *   3. Deploy > New deployment. Type: Web app.
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Deploy, and allow the permissions it asks for (it only touches this sheet).
 *   4. Copy the web app URL (it ends in /exec) into CALLBACK.sheetUrl in
 *      src/config.js, then rebuild the site.
 *
 * Rows go to a tab called "Callbacks", created on the first request, with a
 * Status column the counsellors can change from "New" as they call people back.
 * "Preferred time" is when the visitor said they are free to take the call,
 * always as a real date ("Wed 1 Oct, 3 PM"), so it still reads right tomorrow.
 *
 * If you edit this script later, deploy it again with Manage deployments >
 * edit (pencil) > Version: New version > Deploy, so the /exec URL stays the
 * same. A new deployment would issue a new URL, and the site would keep
 * posting to the old one.
 */
const SHEET_NAME = 'Callbacks'
const HEADERS = ['Received', 'Name', 'Mobile', 'State', 'Course', 'Preferred time', 'Page', 'Status']

function doPost(e) {
  // Two visitors submitting at the same moment would otherwise both write to
  // the same "next empty row".
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
      sheet.setFrozenRows(1)
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    } else {
      addMissingColumns(sheet)
    }

    const p = (e && e.parameter) || {}
    const values = {
      'Received': new Date(), // the sheet's clock, not the visitor's
      'Name': text(p.name, 80),
      'Mobile': text(p.phone, 20),
      'State': text(p.state, 60),
      'Course': text(p.course, 120),
      'Preferred time': text(p.slot, 60),
      'Page': text(p.page, 300),
      'Status': 'New',
    }

    // Written by heading, not by position, so a column the counsellors add or
    // move themselves never pushes a value under the wrong heading.
    const head = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    sheet.appendRow(head.map((h) => (h in values ? values[h] : '')))
    return ContentService.createTextOutput('ok')
  } finally {
    lock.releaseLock()
  }
}

/**
 * A sheet made by an older version of this script is missing columns added
 * since (Course, then Preferred time). Each missing one is inserted where it
 * belongs, before the next column in HEADERS that the sheet does have, or at
 * the end. Rows already in the sheet get an empty cell in it.
 */
function addMissingColumns(sheet) {
  HEADERS.forEach((name, k) => {
    const head = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    if (head.indexOf(name) !== -1) return
    const after = HEADERS.slice(k + 1).map((h) => head.indexOf(h)).find((i) => i !== -1)
    if (after === undefined) {
      sheet.getRange(1, head.length + 1).setValue(name).setFontWeight('bold')
    } else {
      sheet.insertColumnBefore(after + 1)
      sheet.getRange(1, after + 1).setValue(name).setFontWeight('bold')
    }
  })
}

/**
 * Anything a visitor typed, made safe to put in a cell. A value starting with
 * = + - or @ is read by Sheets as a formula, and every mobile number here
 * starts with "+91", so each one is written as plain text with a leading
 * apostrophe (which Sheets hides).
 */
function text(value, max) {
  const s = String(value || '').slice(0, max).trim()
  return /^[=+\-@]/.test(s) ? "'" + s : s
}
