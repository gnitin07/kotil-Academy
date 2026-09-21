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
// Photographs are the academy's own, lifted from the prospectus. Headlines are
// set in HTML over them rather than baked into the image, so nothing crops on a
// phone. `img` is a key into public/media/ — see components/Img.jsx.
export const SLIDES = [
  {
    img: 'hero/classroom',
    alt: 'A full batch of students in the Kotil Aesthetic Academy lecture room',
    kicker: 'Admissions open · Preet Vihar, New Delhi',
    title: 'Crafting skincare',
    accent: 'experts of tomorrow',
    sub: 'Certified aesthetic training with real patient exposure — 500+ professionals trained across India.',
  },
  {
    img: 'hero/handson',
    alt: 'Students practising a treatment on a client under trainer supervision',
    kicker: 'Hands-on training',
    title: 'You practise on real',
    accent: 'clients, from week one',
    sub: 'Theory in the morning, supervised treatment rooms after. You leave with a case log, not a folder of notes.',
  },
  {
    img: 'hero/facial',
    alt: 'A clinical facial treatment in progress at the Kotil clinic',
    kicker: 'Clinical protocols',
    title: 'Learn the treatments',
    accent: 'clinics actually sell',
    sub: 'Medicated facials, peels, lasers, HIFU, MNRF and PRP — on the same machines a working clinic runs.',
  },
  {
    img: 'hero/campus',
    alt: 'The Kotil Skin Science clinic frontage in Shankar Vihar, Preet Vihar',
    kicker: 'Inside a working clinic',
    title: 'Train where the',
    accent: 'patients already come',
    sub: 'Our academy runs inside Kotil Skin Science — so your training floor is a live, busy treatment centre.',
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
// `tier` drives the card styling; `featured` lifts one card out of the row.
export const COURSES = [
  {
    id: 'basic',
    img: 'treatments/facial',
    imgAlt: 'A classic facial in progress on a client',
    tier: 'Basic',
    title: 'Skin Therapy & Aesthetics',
    duration: '30 Days',
    daily: '4 hours a day',
    award: 'Certificate in Basic Skin Therapy',
    summary:
      'The foundation year in a month — skin science, analysis and the classic facial protocols every treatment room runs on.',
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
    title: 'Skin Therapy & Aesthetics',
    duration: '60 Days',
    daily: '8 hours a day',
    award: 'Certificate in Advanced Aesthetic Techniques',
    featured: true,
    summary:
      'Where a therapist becomes a practitioner — concern-led protocols, machine work and consultations you can charge for.',
    eligibility: '10+2 / Any Graduate / MBBS / BDS / BHMS / BAMS / BUMS',
    topics: [
      'Advanced skin concerns (acne, pigmentation, ageing)',
      'Extractions, peels, masks, advanced facials',
      'Devices — ultrasound, galvanic, high frequency, LED',
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
    title: 'Skin Therapy & Aesthetics',
    duration: '90 Days',
    daily: '12 hours a day',
    award: 'Diploma in Clinical Aesthetics',
    summary:
      'The clinic-owner track — lasers, RF and HIFU, anti-ageing theory, plus the business, legal and counselling side of running your own setup.',
    eligibility: '10+2 / Any Graduate / MBBS / BDS / BHMS / BAMS / BUMS',
    topics: [
      'Cosmetic dermatology foundation',
      'Lasers, RF, HIFU & skin rejuvenation',
      'Anti-ageing treatments — Botox / fillers (theory)',
      'Skin psychology & counselling',
      'Business, clinic setup & legal regulations',
      'Internship, live client project & final evaluation',
      'Marketing & business support',
      '10 days extra hands-on practice',
      'Low-cost machinery setup guidance',
      'Placement assistance · Lifetime support',
    ],
  },
]

// ---- the one-month diploma promoted on Instagram ---------------------------
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
    title: 'Govt. & international certification',
    body:
      'Certification that carries weight with recognised authorities and international bodies — career assets that build credibility, open doors abroad and earn client trust.',
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
      'The academy runs the same machines real clinics do — from laser devices to facial units. Classrooms mirror actual treatment rooms, so training feels like working.',
  },
]

// ---- trainers --------------------------------------------------------------
export const TEAM = [
  {
    name: 'Amy Aliya',
    img: 'team/amy-aliya',
    tag: 'Co-Founder',
    tint: 'rose',
    years: '10+',
    trained: '800+',
    role: 'Co-Founder — Kotil Skin Science Clinic',
    qualification: 'Aesthetic Cosmetologist & Counsellor',
    experience: '10+ years · Trained over 800 students',
    specialization: 'Laser, pigmentation & anti-ageing therapies',
    quote: 'I believe hands-on experience is the future of skincare education.',
  },
  {
    name: 'Reena Verma',
    img: 'team/reena-verma',
    tag: 'Head Trainer',
    tint: 'gold',
    years: '8+',
    trained: '1,000+',
    role: 'Head Trainer — Cosmetology & Skin Care',
    qualification: 'Dermatology · Certified in Cosmetic Dermatology',
    experience: '8+ years · Trained 1,000+ students',
    specialization: 'Skin rejuvenation, acne treatment, anti-ageing procedures',
    quote: 'Education is the foundation of transforming lives through skincare.',
  },
  {
    name: 'Dr. Riya Kapoor',
    img: 'team/riya-kapoor',
    tag: 'Lead Trainer',
    tint: 'sand',
    years: '6+',
    trained: '500+',
    role: 'Lead Trainer — Aesthetic Treatments',
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
    body: 'Call or WhatsApp us. We map your background and your goal to the right level — Basic, Advanced or Advanced Plus.',
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
]

// ---- FAQ -------------------------------------------------------------------
export const FAQS = [
  {
    q: 'What kind of courses does Kotil Aesthetic Academy offer?',
    a: 'Certified courses in aesthetic treatments including skin rejuvenation, chemical peels, laser treatments, Botox & fillers, microneedling and more — designed for both beginners and working professionals in the beauty and medical fields.',
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
    a: 'Plot No. 8, Ground Floor, Shankar Vihar, Preet Vihar, New Delhi 110092 — East Delhi, close to Nirman Vihar and Laxmi Nagar. Training runs inside a working clinic, which is how students get real patient exposure.',
  },
  {
    q: 'Do I need prior experience in skincare?',
    a: 'No. The Basic course starts from skin anatomy and builds up, so complete beginners are welcome. If you already practise, Advanced and Advanced Plus let you skip ahead to concern-led protocols and machine work.',
  },
]
