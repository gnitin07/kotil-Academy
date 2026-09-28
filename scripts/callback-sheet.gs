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
 *
 * If you edit this script later, deploy it again with Manage deployments >
 * edit (pencil) > Version: New version > Deploy, so the /exec URL stays the
 * same. A new deployment would issue a new URL, and the site would keep
 * posting to the old one.
 */
const SHEET_NAME = 'Callbacks'
const HEADERS = ['Received', 'Name', 'Mobile', 'State', 'Course', 'Page', 'Status']

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
      addCourseColumn(sheet)
    }

    const p = (e && e.parameter) || {}
    sheet.appendRow([
      new Date(), // the sheet's clock, not the visitor's
      text(p.name, 80),
      text(p.phone, 20),
      text(p.state, 60),
      text(p.course, 120),
      text(p.page, 300),
      'New',
    ])
    return ContentService.createTextOutput('ok')
  } finally {
    lock.releaseLock()
  }
}

/**
 * Sheets set up by the first version of this script have no Course column.
 * Rather than have new rows land one column out of step with the old header,
 * insert it where it belongs (before Page) the first time it is missing.
 * Rows already in the sheet get an empty Course cell.
 */
function addCourseColumn(sheet) {
  const head = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  if (head.indexOf('Course') !== -1) return
  const page = head.indexOf('Page') // 0-based, or -1
  if (page === -1) {
    sheet.getRange(1, head.length + 1).setValue('Course').setFontWeight('bold')
  } else {
    sheet.insertColumnBefore(page + 1)
    sheet.getRange(1, page + 1).setValue('Course').setFontWeight('bold')
  }
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
