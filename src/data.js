/**
 * Every piece of copy that repeats as a list lives here — courses, trainers,
 * reviews, FAQs. All of it is lifted from the academy prospectus so the site
 * and the PDF can never disagree.
 *
 * Eligibility note: the prospectus prints "MBBS/BDS/BMDS/BAMS/BUMP", which its
 * own FAQ page spells out as "MBBS, BDS, BHMS, BAMS". The corrected spelling is
 * used below.
 */

// ---- hero banner slides -----------------------------------------------------
// Four photographs from the academy's own full-resolution banner shoot, with
// short headlines set in HTML over them (never baked in, so nothing crops on
// a phone). Copy is deliberately brief: a kicker, two lines, one sentence.
//
// Each slide names two files: `img` is the 16:9 banner shot for tablet and
// desktop, `mob` the same scene shot 9:16, which a <picture> swaps in below
// 720px. That way a phone gets a portrait photograph rather than a landscape
// one cropped down the middle.
export const SLIDES = [
  {
    img: 'hero/classroom',
    mob: 'hero-mobile/classroom',
    alt: 'A trainer walking through a full batch of students in the Kotil Aesthetic Academy lecture room',
    kicker: 'Admissions open',
    title: 'Crafting skincare',
    accent: 'experts of tomorrow',
    sub: 'Certified aesthetic training in Preet Vihar, New Delhi.',
  },
  {
    img: 'hero/handson',
    mob: 'hero-mobile/handson',
    alt: 'Students watching a trainer demonstrate a treatment on a client in the clinic',
    kicker: 'Hands-on training',
    title: 'Learn on',
    accent: 'real clients',
    sub: 'Supervised practice in a working clinic, from week one.',
  },
  {
    img: 'hero/students',
    mob: 'hero-mobile/students',
    alt: 'Five Kotil Aesthetic Academy students with their trainer',
    kicker: 'Our students',
    title: 'From learners',
    accent: 'to leaders',
    sub: '500+ professionals trained across India.',
  },
  {
    img: 'hero/campus',
    mob: 'hero-mobile/campus',
    alt: 'The Kotil Skin Science clinic frontage in Shankar Vihar, Preet Vihar',
    kicker: 'Our campus',
    title: 'Train inside',
    accent: 'Kotil Skin Science',
    sub: 'The rooms you learn in are the rooms patients walk into.',
  },
]

// ---- accreditation & certification partners --------------------------------
// `logo` names a file in public/media/partners/. The marks were lifted from the
// academy's own "Our Certification & Training Partners" lockup, so what the site
// shows is exactly what its printed material claims.
export const PARTNERS = [
  { name: 'Ministry of MSME', note: 'Govt. of India', logo: 'msme' },
  { name: 'Skill India', note: 'Govt. of India', logo: 'skill-india' },
  { name: 'NSDC', note: 'National Skill Development Corporation', logo: 'nsdc' },
  { name: 'Startup India', note: 'DPIIT recognised', logo: 'startup-india' },
  { name: 'Devriz Healthcare', note: 'Industry partner', logo: 'devriz' },
]

// ---- campus tour (collage) -------------------------------------------------
// `shape` sets the tile's footprint in the collage grid: 'hero' is 2x2, 'tall'
// is 1x2, 'wide' is 2x1, anything else 1x1. The shapes are chosen so the cells
// add up to whole rows at both 2 and 4 columns (16 cells) — with grid-auto-flow
// dense, that is what keeps the collage free of holes.
export const TOUR = [
  { img: 'gallery/batch-lounge', alt: 'A Kotil Aesthetic Academy batch in white coats with their trainer, under the Kotil Skin Science sign', cap: 'Our latest batch', shape: 'hero' },
  { video: true, cap: 'Watch the reel', shape: 'tall' },
  { img: 'academy/signage', alt: 'The Kotil Skin Science frontage on Shankar Vihar', cap: 'The entrance' },
  { img: 'gallery/batch-cheer', alt: 'Students celebrating with their trainer in the clinic lounge', cap: 'Batch day', shape: 'tall' },
  { img: 'academy/lecture-room', alt: 'The academy lecture room, set up for a batch', cap: 'Lecture room' },
  { img: 'academy/machine-room', alt: 'A treatment room with skin analysis charts and equipment', cap: 'Treatment room' },
  { img: 'academy/practical', alt: 'Students gathered around a treatment bed during practical training', cap: 'Practical round' },
  { img: 'academy/trainer-class', alt: 'A trainer taking a theory class', cap: 'Theory session' },
  { img: 'academy/session', alt: 'A supervised treatment session in progress', cap: 'Supervised session', shape: 'wide' },
  { img: 'academy/supervised', alt: 'Two trainers working through a treatment together', cap: 'On the machines' },
]

// ---- headline numbers ------------------------------------------------------
export const STATS = [
  { icon: 'years', value: '10+', label: 'Years in skin & aesthetics' },
  { icon: 'students', value: '500+', label: 'Professionals trained across India' },
  { icon: 'workshop', value: '100+', label: 'Hands-on workshops conducted' },
  { icon: 'certificate', value: '5', label: 'Certification & industry partners' },
]

// ---- courses ---------------------------------------------------------------
// `tier` drives the card styling; `featured` lifts one card out of the stack.
//
// `summary` is what a visitor reads while choosing a level; `topics` is the
// module list behind "Read more", which stays folded away until asked for. The
// last entries of each list are deliberately the ones that close the sale:
// practice days, placement assistance, lifetime support.
export const COURSES = [
  {
    id: 'basic',
    img: 'treatments/facial',
    imgAlt: 'A classic facial in progress on a client',
    tier: 'Basic',
    // the course page lives at ?course=<slug>
    slug: 'basic',
    // ---- course page detail (everything below is read by pages/CoursePage.jsx)
    overview: [
      'Over 30 days at 4 hours a day you learn how skin works, how to read it, and how to run a professional facial from the first consultation to the aftercare advice.',
      'It finishes with three days of supervised practice on real clients inside our working clinic, so the first client you treat on your own is not the first client you have ever treated.',
    ],
    handsOn: '3 days on real clients',
    // the illustration beside the overview; swap the image name to change it
    diagram: 'treatments/ageing-signs',
    diagramCaption: 'The visible signs of ageing: the zones you learn to read in a skin analysis.',
    idealFor: [
      'Complete beginners starting a career in skincare',
      'Beauty and salon professionals who want a clinical grounding',
      'Anyone planning to go on to the Advanced course',
    ],
    included: [
      'Certificate in Basic Skin Therapy',
      '3 days of supervised hands-on practice',
      'Training inside a working clinic',
      'Small batches, so everyone gets time on the bed',
      'A direct path on to Advanced',
    ],
    next: 'advanced',
    category: 'Skin Therapy',
    fee: 70000,
    careers: [
      ['Skin therapist', 'Facials, clean-ups and skin analysis in salons, spas and skin clinics.'],
      ['Client handling', 'The consultation, hygiene and aftercare habits every clinic hires for.'],
      ['A foundation to build on', 'Step straight into Advanced with the groundwork already done.'],
    ],
    title: 'Skin Therapy & Aesthetics',
    duration: '30 Days',
    daily: '4 hours a day',
    award: 'Certificate in Basic Skin Therapy',
    summary:
      'The foundation year in a month: skin science, analysis and the classic facial protocols every treatment room runs on.',
    eligibility: '10+2 / Any Graduate / MBBS / BDS / BHMS / BAMS / BUMS',
    topics: [
      'Skin anatomy & functions',
      'Skin types & basic analysis',
      'Cleansing, toning, exfoliation, masking',
      'Classic facials',
      'Sanitation, hygiene & client prep',
      'Communication basics for client handling',
      '3 days hands-on practice',
    ],
  },
  {
    id: 'advanced',
    img: 'treatments/microneedling',
    imgAlt: 'A microneedling device being used on a client',
    tier: 'Advanced',
    slug: 'advanced',
    overview: [
      'Over 60 days at 8 hours a day you move from routine facials to the concerns clients actually walk in with: acne, pigmentation and ageing. You learn the devices, the active ingredients, and the consultation that ties a course of treatment together.',
      'Then you put it to work across ten extra days of supervised practice, with marketing and business support, machinery setup guidance and placement assistance to take into your career.',
    ],
    handsOn: '10 extra days on real clients',
    diagram: 'treatments/ageing-signs',
    diagramCaption: 'The visible signs of ageing: the concerns you learn to treat with targeted protocols.',
    idealFor: [
      'Beauticians and therapists moving into clinic work',
      'Basic graduates ready for concern-led treatments',
      'Medical graduates adding aesthetics to their practice',
    ],
    included: [
      'Certificate in Advanced Aesthetic Techniques',
      '10 extra days of supervised hands-on practice',
      'Marketing and business support',
      'Low-cost machinery setup guidance',
      'Placement assistance',
      'Lifetime support from the academy',
    ],
    next: 'advanced-plus',
    category: 'Aesthetics',
    fee: 120000,
    careers: [
      ['Aesthetic practitioner', 'Run concern-led treatments for acne, pigmentation and ageing in skin clinics.'],
      ['Device treatments', 'Ultrasound, galvanic, high-frequency and LED work that clients book by name.'],
      ['Placement assistance', 'Help finding a clinic role, and lifetime support once you are in it.'],
    ],
    title: 'Skin Therapy & Aesthetics',
    duration: '60 Days',
    daily: '8 hours a day',
    award: 'Certificate in Advanced Aesthetic Techniques',
    featured: true,
    summary:
      'Where a therapist becomes a practitioner: concern-led protocols, machine work and consultations you can charge for.',
    eligibility: '10+2 / Any Graduate / MBBS / BDS / BHMS / BAMS / BUMS',
    topics: [
      'Advanced skin concerns (acne, pigmentation, ageing)',
      'Extractions, peels, masks, advanced facials',
      'Devices: ultrasound, galvanic, high frequency, LED',
      'Introduction to cosmetic ingredients',
      'Client consultation & treatment planning',
      'Marketing & business support',
      '10 days extra hands-on practice',
      'Low-cost machinery setup guidance',
      'Placement assistance · Lifetime support',
    ],
  },
  {
    id: 'pro',
    img: 'treatments/laser',
    imgAlt: 'A laser treatment session with the client in protective goggles',
    tier: 'Advanced Plus',
    slug: 'advanced-plus',
    overview: [
      'Over 90 days you add energy-based treatments, anti-ageing theory, skin counselling and the business of running a clinic to everything in Advanced: the full picture for someone who wants to own the practice, not only work in it.',
      'The course ends with an internship and a live client project, assessed at a final evaluation before you receive the Diploma in Clinical Aesthetics.',
    ],
    handsOn: 'Internship + 10 extra days',
    diagram: 'treatments/ageing-signs',
    diagramCaption: 'The visible signs of ageing: the map for lasers, RF, HIFU and anti-ageing treatment planning.',
    idealFor: [
      'Anyone planning to open their own aesthetic clinic',
      'Practitioners who want lasers, RF and HIFU in their skill set',
      'Doctors and medical graduates (MBBS, BDS, BHMS, BAMS, BUMS) moving into aesthetics',
    ],
    included: [
      'Diploma in Clinical Aesthetics',
      'Internship and a live client project',
      '10 extra days of supervised hands-on practice',
      'Clinic setup and legal regulations guidance',
      'Low-cost machinery setup guidance',
      'Placement assistance and lifetime support',
    ],
    category: 'Clinical Aesthetics',
    fee: 190000,
    careers: [
      ['Your own clinic', 'Clinic setup, legal regulations and business support to start on your own.'],
      ['Lasers, RF and HIFU', 'The advanced treatments that premium aesthetic clinics are built around.'],
      ['Placement assistance', 'Or step into an established clinic, with lifetime support behind you.'],
    ],
    title: 'Skin Therapy & Aesthetics',
    duration: '90 Days',
    daily: '12 hours a day',
    award: 'Diploma in Clinical Aesthetics',
    summary:
      'The clinic-owner track: lasers, RF and HIFU, anti-ageing theory, plus the business, legal and counselling side of running your own setup.',
    eligibility: '10+2 / Any Graduate / MBBS / BDS / BHMS / BAMS / BUMS',
    topics: [
      'Cosmetic dermatology foundation',
      'Lasers, RF, HIFU & skin rejuvenation',
      'Anti-ageing treatments: Botox / fillers (theory)',
      'Skin psychology & counselling',
      'Business, clinic setup & legal regulations',
      'Internship, live client project & final evaluation',
      'Marketing & business support',
      '10 days extra hands-on practice',
      'Low-cost machinery setup guidance',
      'Placement assistance · Lifetime support',
    ],
  },
  {
    // Not a rung on the 30/60/90 ladder. This one is a five-day intensive for
    // people already practising, with the theory running online for six months
    // behind it, so it carries `starts` and a `flag` of its own instead of the
    // "most enrolled" badge. Everything here is off the academy's own campaign
    // posters, which are in the strip further down the page. The two posters
    // print slightly different highlight lists; `topics` is the union of them.
    // Eligibility is deliberately absent: neither poster states it.
    id: 'pgd',
    img: 'treatments/devices',
    imgAlt: 'A clinical face treatment being applied under supervision',
    tier: 'PG Diploma',
    title: 'Clinical Cosmetology',
    duration: '5 Days',
    daily: '6 months online learning',
    starts: '25 to 29 October 2026, Delhi',
    flag: 'Limited seats',
    award: 'PG Diploma in Clinical Cosmetology',
    summary:
      'A five-day intensive on the floor for people already in practice, with six months of online learning behind it: the clinical procedures clients ask for by name.',
    topics: [
      'Dermal fillers',
      'Botox',
      'Thread lift',
      'Chemical peel',
      'Medicated facials',
      'Facial contouring',
      'Face lifting',
      'Skin tightening',
      'Laser treatments',
      'Microblading',
      'Lip pigmentation',
      'Glutathione IV',
      'Hair treatments',
    ],
  },
]

// ---- the one-month diploma promoted on Instagram ---------------------------
// ---- upcoming batches --------------------------------------------------------
// The programmes the "Upcoming batches" strip is selling right now. Tapping one
// opens the enquiry popup with that course already chosen, and these names are
// the popup's course list too, so an enquiry always names something the strip
// offered. `img` is the campaign creative; a course without one yet shows its
// name on a plain card rather than borrowing another programme's poster.
// ---- what each syllabus topic covers ----------------------------------------
// The one-line note under each module on a course page, keyed by the topic
// names in COURSES. Shared, so a topic taught at two levels reads the same.
export const TOPIC_NOTES = {
  'Skin anatomy & functions': 'The layers of the skin and what each one does: the ground every treatment decision stands on.',
  'Skin types & basic analysis': 'Reading oily, dry, combination and sensitive skin, and assessing a client properly before any treatment.',
  'Cleansing, toning, exfoliation, masking': 'The core sequence of a professional facial, and which products suit which skin.',
  'Classic facials': 'Step-by-step facial protocols, from the consultation through to the aftercare advice.',
  'Sanitation, hygiene & client prep': 'Clinic hygiene, sterilisation, and preparing a client safely for treatment.',
  'Communication basics for client handling': 'Consulting, setting expectations, and the habits that bring clients back.',
  '3 days hands-on practice': 'Three days of supervised practice on real clients in the clinic.',
  'Advanced skin concerns (acne, pigmentation, ageing)': 'Diagnosing acne, pigmentation and the signs of ageing, and matching each to a protocol.',
  'Extractions, peels, masks, advanced facials': 'Safe extractions, chemical peels and targeted facials for specific concerns.',
  'Devices: ultrasound, galvanic, high frequency, LED': 'How each device works, when to use it, and running it on clients yourself.',
  'Introduction to cosmetic ingredients': 'Actives, what they do on the skin, and how to read a product label.',
  'Client consultation & treatment planning': 'Building a plan across several sessions and setting results the client can expect.',
  'Marketing & business support': 'Pricing your services and finding clients, with the academy behind you.',
  '10 days extra hands-on practice': 'Ten more days of supervised work on real clients.',
  'Low-cost machinery setup guidance': 'Advice on equipping a practice properly without overspending.',
  'Placement assistance \u00b7 Lifetime support': 'Help finding a role after the course, and a line back to the academy for good.',
  'Cosmetic dermatology foundation': 'The dermatology behind aesthetic work: skin conditions, contraindications, and when to refer.',
  'Lasers, RF, HIFU & skin rejuvenation': 'Energy-based treatments: how they work, their settings, and safe practice.',
  'Anti-ageing treatments: Botox / fillers (theory)': 'How injectables work and where they fit in a treatment plan, taught as theory.',
  'Skin psychology & counselling': 'How skin concerns affect clients, and counselling them through a course of treatment.',
  'Business, clinic setup & legal regulations': 'Setting up a clinic: the space, the equipment, the registrations and the rules that apply.',
  'Internship, live client project & final evaluation': 'A supervised live client project and a final assessment before you certify.',
}

// ---- each syllabus topic in detail -------------------------------------------
// What opens under a module on a course page: what you learn, and what you do
// with it in the clinic. Keyed like TOPIC_NOTES; a topic without an entry just
// shows its one-line note.
export const TOPIC_DETAILS = {
  "Skin anatomy & functions": {
    "learn": [
      "The epidermis, dermis and subcutaneous layer, and what each one is made of",
      "How skin renews itself: the cell cycle, the skin barrier and the acid mantle",
      "Collagen, elastin and the oil glands, and why every treatment depends on them",
      "How sun, age and lifestyle change the skin over time"
    ],
    "practice": "Used at every consultation: knowing which layer a product or device reaches is what makes a treatment safe."
  },
  "Skin types & basic analysis": {
    "learn": [
      "Telling normal, oily, dry, combination and sensitive skin apart",
      "Reading hydration, oil, pores, texture and pigmentation",
      "Using a magnifying lamp for a close skin analysis",
      "Taking a client history, and spotting when not to treat"
    ],
    "practice": "You analyse real clients and write up a skin record before any treatment begins."
  },
  "Cleansing, toning, exfoliation, masking": {
    "learn": [
      "The double cleanse, and choosing a cleanser by skin type",
      "What toners actually do, and when to use them",
      "Physical versus chemical exfoliation, and how often each is safe",
      "Clay, cream, gel and sheet masks, and when each one is used"
    ],
    "practice": "You build the core facial sequence step by step on clients until it runs smoothly."
  },
  "Classic facials": {
    "learn": [
      "A complete facial protocol, from consultation to aftercare",
      "Facial massage: the movements, the pressure and the rhythm",
      "Steaming and basic extractions done hygienically",
      "Choosing the right facial for the skin in front of you"
    ],
    "practice": "You perform full facials under supervision and learn to time a session properly."
  },
  "Sanitation, hygiene & client prep": {
    "learn": [
      "Sterilising and disinfecting tools and surfaces",
      "Hand hygiene, gloves and single-use consumables",
      "Setting up the treatment bed and trolley",
      "Consent, patch tests and preparing the client"
    ],
    "practice": "Every practical session starts and ends with this routine, until it is habit."
  },
  "Communication basics for client handling": {
    "learn": [
      "Running a consultation and asking the right questions",
      "Explaining a treatment and setting expectations the client can trust",
      "Giving aftercare advice that clients actually follow",
      "Handling a complaint, and bringing clients back"
    ],
    "practice": "You consult real clients yourself, with a trainer alongside."
  },
  "3 days hands-on practice": {
    "learn": [
      "Complete treatments on real clients, start to finish",
      "Working at clinic pace with a trainer supervising",
      "Feedback on every session you run"
    ],
    "practice": "Three days in the working clinic, treating real clients under supervision."
  },
  "Advanced skin concerns (acne, pigmentation, ageing)": {
    "learn": [
      "Grading acne, and planning treatment for each grade",
      "Types of pigmentation: melasma, sun spots and post-acne marks",
      "The signs of ageing: fine lines, loss of firmness and dullness",
      "When a concern needs a dermatologist rather than a facial"
    ],
    "practice": "You assess real clients with these concerns and plan their course of treatment."
  },
  "Extractions, peels, masks, advanced facials": {
    "learn": [
      "Safe extraction of blackheads and whiteheads without scarring",
      "Chemical peels: AHA, BHA and combination peels, their strengths and timing",
      "Treatment masks for acne, pigmentation and hydration",
      "Advanced facials built around a single concern"
    ],
    "practice": "You carry out peels and advanced facials on clients and manage their aftercare."
  },
  "Devices: ultrasound, galvanic, high frequency, LED": {
    "learn": [
      "Ultrasound for deep cleansing and pushing products further into the skin",
      "Galvanic current for deep cleansing and delivering active ingredients",
      "High frequency for acne-prone and congested skin",
      "LED light therapy: which colour treats which concern",
      "Settings, contraindications and safe use of every device"
    ],
    "practice": "You run each device on clients yourself, with the settings checked by a trainer."
  },
  "Introduction to cosmetic ingredients": {
    "learn": [
      "Key actives: retinoids, vitamin C, niacinamide, AHAs, BHAs and hyaluronic acid",
      "Which ingredients suit which concern",
      "How to read an ingredient list",
      "Combinations that work together, and ones to avoid"
    ],
    "practice": "You choose the products for each client you treat, and explain why."
  },
  "Client consultation & treatment planning": {
    "learn": [
      "Building a plan across several sessions",
      "Combining treatments safely",
      "Tracking results with notes and before-and-after photos",
      "Home-care advice between sessions"
    ],
    "practice": "You write treatment plans for real clients and follow them through."
  },
  "Marketing & business support": {
    "learn": [
      "Pricing your services",
      "Building a treatment menu",
      "Finding clients through social media and referrals"
    ],
    "practice": "Guidance from the academy as you start taking clients of your own."
  },
  "10 days extra hands-on practice": {
    "learn": [
      "Ten more days treating real clients",
      "Putting the advanced protocols and devices to work",
      "Building speed and confidence before you go out on your own"
    ],
    "practice": "Ten extra days in the working clinic, supervised throughout."
  },
  "Low-cost machinery setup guidance": {
    "learn": [
      "Which machines a new practice actually needs first",
      "What to check before you buy",
      "How to equip properly without overspending"
    ],
    "practice": "Advice from people who equip and run a clinic every day."
  },
  "Placement assistance · Lifetime support": {
    "learn": [
      "Help connecting with clinics looking for trained staff",
      "Guidance on your first role, or on starting your own setup",
      "A line back to your trainers with questions after you finish"
    ],
    "practice": "Support that carries on after the course ends."
  },
  "Cosmetic dermatology foundation": {
    "learn": [
      "Common skin conditions and how they present",
      "Contraindications: when aesthetic treatment is not safe",
      "Indian skin types and the specific risks they carry, such as pigmentation after treatment",
      "When to refer a client to a dermatologist"
    ],
    "practice": "You screen real clients and decide what is safe to treat."
  },
  "Lasers, RF, HIFU & skin rejuvenation": {
    "learn": [
      "How lasers work, and which are used for hair, pigmentation and rejuvenation",
      "Radiofrequency for tightening and texture",
      "HIFU for lifting and firming",
      "Settings, eye protection and patch testing",
      "Aftercare for energy-based treatments"
    ],
    "practice": "You work with lasers, RF and HIFU on clients under close supervision."
  },
  "Anti-ageing treatments: Botox / fillers (theory)": {
    "learn": [
      "How botulinum toxin relaxes the muscles behind expression lines",
      "Types of dermal filler, and what each one restores",
      "Facial anatomy and the danger zones",
      "Where injectables fit in an anti-ageing plan"
    ],
    "practice": "Taught as theory: you learn to plan and advise on anti-ageing care, and when to refer to a doctor."
  },
  "Skin psychology & counselling": {
    "learn": [
      "How skin concerns affect a client’s confidence",
      "Counselling anxious or unhappy clients",
      "Managing expectations honestly"
    ],
    "practice": "You counsel real clients through their treatment plans."
  },
  "Business, clinic setup & legal regulations": {
    "learn": [
      "Choosing and laying out a clinic space",
      "Equipment and staffing",
      "Registrations and licences",
      "The rules on which treatments can be done, and by whom"
    ],
    "practice": "The groundwork for opening a clinic of your own."
  },
  "Internship, live client project & final evaluation": {
    "learn": [
      "An internship inside the working clinic",
      "A live client project you manage from consultation to results",
      "A final evaluation before you certify"
    ],
    "practice": "Where you show everything you have learned, on a real case."
  }
}

export const UPCOMING = [
  { course: 'Diploma in Clinical Cosmetology', img: null },
  {
    course: 'PG Diploma in Clinical Cosmetology',
    img: 'posters/pg-diploma-batch',
    alt: 'Campaign poster: PG Diploma in Clinical Cosmetology, five days hands-on with six months of online learning, admissions open for the new Delhi batch',
  },
  { course: 'Fellowship in Aesthetic Surgery', img: null },
]

// ---- past batches ------------------------------------------------------------
// Real group photographs only: this section is the proof that people have
// trained here, so nothing in it can be staged or generated. `year` shows as
// "Batch of 2025" once it is known; until then the card shows the city alone.
export const BATCH_PHOTOS = [
  { img: 'gallery/batch-lounge', city: 'Delhi', year: null, alt: 'A Kotil batch in white coats with their trainer under the Kotil Skin Science sign' },
  { img: 'gallery/batch-cheer', city: 'Delhi', year: null, alt: 'A Kotil batch celebrating together in the clinic lounge' },
  { img: 'gallery/students', city: 'Noida', year: null, alt: 'Students standing with their trainer at the academy' },
]

export const DIPLOMA = {
  title: 'Advance Diploma in Cosmetology',
  poster: 'posters/diploma',
  img: 'treatments/lips',
  imgAlt: 'A lip pigmentation treatment close-up',
  duration: 'One month',
  blurb:
    'A focused, treatment-by-treatment programme for cosmetologists, aesthetic practitioners and beauty professionals who want clinical-grade skills fast.',
  modules: [
    'Medicated facials',
    'Microblading',
    'BB glow facial',
    'Lip pigmentation',
    'HIFU',
    'MNRF',
    'Microdermabrasion',
    'Hair analyser',
    'Chemical peels',
    'Hair fall treatments',
    'PRP therapy',
  ],
  // What each module is, in a line or two: the text that drops down when a
  // module is tapped. Keyed by the names above, so a module without an entry
  // simply does not open.
  about: {
    'Medicated facials': 'Facials built around active ingredients for a specific concern, such as acne, pigmentation or dullness, rather than a routine clean-up.',
    'Microblading': 'Semi-permanent eyebrows, drawn hair by hair with a fine hand blade so they read as natural brows.',
    'BB glow facial': 'A tinted serum worked into the skin with microneedling, for an even, foundation-like glow that lasts for weeks.',
    'Lip pigmentation': 'Micropigmentation that corrects dark or uneven lips and restores a natural, even tone.',
    'HIFU': 'High-intensity focused ultrasound: heat delivered deep under the skin to lift and tighten without surgery.',
    'MNRF': 'Microneedling with radiofrequency, for acne scars, open pores and uneven texture.',
    'Microdermabrasion': 'Mechanical exfoliation that lifts away dead skin to smooth texture and brighten dull skin.',
    'Hair analyser': 'Reading the scalp and hair with a digital analyser, so a hair treatment is planned around what is actually causing the problem.',
    'Chemical peels': 'Controlled acid peels for pigmentation, acne, fine lines and uneven tone, chosen and timed to the skin in front of you.',
    'Hair fall treatments': 'Clinical treatments for hair fall and thinning, planned around the cause the analysis finds.',
    'PRP therapy': "Platelet-rich plasma from the client's own blood, used on the scalp or skin to support hair growth and repair.",
  },
}

// ---- why choose us ---------------------------------------------------------
export const WHY = [
  {
    icon: 'trainer',
    title: 'Experienced trainers',
    body:
      'Every trainer is a certified professional with years of clinical and teaching experience. You get real-world insight, current industry knowledge and personal guidance in every session.',
  },
  {
    icon: 'certificate',
    title: 'Govt. / international certification',
    body:
      'Certification that holds value, recognised by government authorities or international bodies where applicable. Not just paper: a career asset that builds credibility, opens doors to global opportunities and earns client trust.',
  },
  {
    icon: 'hands',
    title: 'Hands-on training with real clients',
    body:
      'Training goes well past theory. You treat real clients under expert supervision, from diagnosis through to delivery, so you are job-ready from day one.',
  },
  {
    icon: 'placement',
    title: 'Placement assistance',
    body:
      'Whether you want a role in a leading clinic, your own setup or an opportunity abroad, our placement support, industry referrals and interview prep guide you through it.',
  },
  {
    icon: 'machine',
    title: 'Modern equipment & clinical setup',
    body:
      'The academy runs the same machines real clinics do, from laser devices to facial units. Classrooms mirror actual treatment rooms, so training feels like working.',
  },
]

// ---- trainers --------------------------------------------------------------
// Photo-to-role mapping confirmed by the academy (Sept 2026):
//   Cosmetologist -> Reena ma'am · Head Trainer -> Dev sir · Doctor -> Amy ma'am
// Order matters: the middle card sits forward in the fanned deck, so the Head
// Trainer goes in the centre.
//
// The qualification / experience / specialisation text for each ROLE is carried
// over from the prospectus's team page, whose entries were written for the same
// three roles. The years and student counts in particular should be confirmed
// against each person before publishing.
export const TEAM = [
  {
    name: 'Reena Verma',
    img: 'team/reena-verma',
    tag: 'Cosmetologist',
    // her portrait is a white-background studio shot rather than a cut-out, so
    // the card gives it a plain white plate instead of a tinted one
    tint: 'plain',
    years: '8+',
    trained: '800+',
    role: 'Aesthetic Cosmetologist',
    qualification: 'Aesthetic Cosmetologist',
    experience: '8+ years · Trained over 800 students',
    specialization: 'Laser, pigmentation & anti-ageing therapies',
    quote: 'I believe hands-on experience is the future of skincare education.',
  },
  {
    // Surname from the Kotil Skin Science signboard: "DEV SINGH (Aesthetic Cosmetologist)"
    name: 'Dev Singh',
    img: 'team/dev-singh',
    tag: 'Head Trainer',
    tint: 'gold',
    years: '10+',
    trained: '1,000+',
    role: 'Head Trainer, Cosmetology & Skin Care',
    qualification: 'Certified in Cosmetic Dermatology',
    experience: '10+ years · Trained 1,000+ students',
    specialization: 'Skin rejuvenation, acne treatment, anti-ageing procedures',
    quote: 'Education is the foundation of transforming lives through skincare.',
  },
  {
    // The name is the correction the academy asked for; the photograph and
    // every figure on this card are the ones that were always here.
    name: 'Dr. Amy Aliya',
    img: 'team/ruby',
    tag: 'Doctor',
    tint: 'sand',
    years: '6+',
    trained: '500+',
    role: 'Doctor, Aesthetic Treatments',
    qualification: 'Diploma in Aesthetic Medicine',
    experience: '6+ years · Trained 500+ professionals',
    specialization: 'Dermal fillers, Botox, laser hair removal',
    quote: 'Confidence begins with understanding the science of beauty.',
  },
]

// ---- admissions ------------------------------------------------------------
export const STEPS = [
  {
    n: '01',
    title: 'Talk to a counsellor',
    body: 'Call or WhatsApp us. We map your background and your goal to the right level: Basic, Advanced or Advanced Plus.',
  },
  {
    n: '02',
    title: 'Confirm your seat',
    body: 'Batches stay small so every student gets machine time. Reserve your place and pick a start date that suits you.',
  },
  {
    n: '03',
    title: 'Train on real clients',
    body: 'Theory first, supervised treatment rooms after. You leave with a case log, not just a folder of notes.',
  },
  {
    n: '04',
    title: 'Certify & get placed',
    body: 'Sit your final evaluation, collect your certificate, then use our placement support, referrals and setup guidance.',
  },
]

// ---- student reviews -------------------------------------------------------
export const REVIEWS = [
  {
    name: 'Aditi Sharma',
    place: 'Laxmi Nagar, East Delhi',
    stars: 5,
    text:
      'The hands-on training at Kotil Aesthetic Academy truly sets it apart. Every session was detailed, practical and confidence-boosting. Thanks to this academy, I now feel fully prepared to offer clinical-grade treatments professionally.',
  },
  {
    name: 'Simran Kaur',
    place: 'Bathinda, Punjab',
    stars: 5,
    text:
      'I loved how much practice we got on real models. It is not just learning, it is skill building at Kotil Academy. Modern, professional and student-friendly.',
  },
  {
    name: 'Anjali Singh',
    place: 'Baghpat, Uttar Pradesh',
    stars: 5,
    text:
      'The Botox and filler module was especially valuable. Practical approach and updated tools made a huge difference. A great platform to upgrade your dermatology skills.',
  },
  {
    name: 'Isha Mehta',
    place: 'Jaipur, Rajasthan',
    stars: 5,
    text:
      'The training was incredibly practical. I was nervous before starting, but the faculty made it so easy to understand and perform each procedure. I loved the constant guidance during hands-on sessions.',
  },

  // Room for more. Paste each real review here and the strip picks it up: the
  // first four show, the rest appear behind "View more reviews" at the end of
  // the swipe. Keep them verbatim from the student (Google, WhatsApp, feedback
  // form) — do not write them in-house.
  //
  // { name: 'Full name', place: 'City, State', stars: 5, text: 'Their words.' },
  // { name: '', place: '', stars: 5, text: '' },
  // { name: '', place: '', stars: 5, text: '' },
  // { name: '', place: '', stars: 5, text: '' },
]

// ---- FAQ -------------------------------------------------------------------
export const FAQS = [
  {
    q: 'What kind of courses does Kotil Aesthetic Academy offer?',
    a: 'Certified courses in aesthetic treatments including skin rejuvenation, chemical peels, laser treatments, Botox & fillers, microneedling and more, designed for both beginners and working professionals in the beauty and medical fields.',
  },
  {
    q: 'Are the courses certified and recognised?',
    a: 'Yes. Every course carries industry-recognised certification, giving your training credibility and professional value in clinical and aesthetic practice.',
  },
  {
    q: 'Do you provide hands-on practical training?',
    a: 'Absolutely. We focus heavily on hands-on practice under expert supervision, so students gain real-world experience and the confidence to perform procedures safely and effectively.',
  },
  {
    q: 'Who can join these courses?',
    a: 'Our courses are open to dermatologists, cosmetologists, medical practitioners (MBBS, BDS, BHMS, BAMS), aestheticians and beauty professionals looking to upgrade their skills. The entry requirement is 10+2 or any graduate degree.',
  },
  {
    q: 'Is there placement or career support after the course?',
    a: 'Yes. We provide career guidance, clinic setup support and access to a growing network of aesthetic professionals and clinics. Advanced and Advanced Plus students also receive lifetime support and low-cost machinery setup guidance.',
  },
  {
    q: 'How long does each course run?',
    a: 'Basic runs 30 days at 4 hours a day, Advanced 60 days at 8 hours a day, and Advanced Plus 90 days at 12 hours a day. The Advance Diploma in Cosmetology is a focused one-month programme.',
  },
  {
    q: 'Where is the academy located?',
    a: 'Plot No. 8, Ground Floor, Shankar Vihar, Preet Vihar, New Delhi 110092, in East Delhi, close to Nirman Vihar and Laxmi Nagar. Training runs inside a working clinic, which is how students get real patient exposure.',
  },
  {
    q: 'Do I need prior experience in skincare?',
    a: 'No. The Basic course starts from skin anatomy and builds up, so complete beginners are welcome. If you already practise, Advanced and Advanced Plus let you skip ahead to concern-led protocols and machine work.',
  },
]

// ---- founder's welcome ------------------------------------------------------
// Dev sir's own letter, in his voice: what a student will actually do with him
// in the room, rather than a founder's mission statement. Every figure in it is
// one already recorded against him in TEAM above (ten years, a thousand
// students, certified in cosmetic dermatology, the treatments he specialises
// in), so the two cannot drift apart.
export const FOUNDER = {
  name: 'Dev Singh',
  title: 'Founder & Head Trainer, Kotil Aesthetic Academy',
  img: 'founder/dev-singh',
  headline: ['Ten years on the floor,', 'and I am still in the room for', 'every batch.'],
  lead:
    'I did not build this academy to hand out certificates. I built it so that you leave able to do the work, and the only way there is with someone standing beside you while you learn it.',
  body: [
    'My own ten years have gone into skin rejuvenation, acne work and anti-ageing procedures, and I am certified in cosmetic dermatology. Everything I teach is a protocol I am running on clients that same week, inside Kotil Skin Science, the working clinic this academy sits in. Nothing here is theory that has outlived its use.',
    'I take you through each treatment myself: the consultation, the settings on the machine, the aftercare, the client who is difficult to read. You repeat it under supervision until your hands are steady, on real equipment and real clients. And when the course ends you can still call me, because the guidance does not stop at the certificate.',
  ],
  signoff: ['Come and learn where the work actually happens.', 'I will see you on the training floor.'],
  facts: [
    { k: '10+', v: 'years in cosmetology & skin care' },
    { k: '1,000+', v: 'students trained, hands-on' },
    { k: 'Certified', v: 'in cosmetic dermatology' },
  ],
}
