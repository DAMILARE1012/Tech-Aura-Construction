export const jobDepartments = [
  'Engineering',
  'Construction Management',
  'HSE',
  'Finance & Commercial',
  'Corporate Services',
]

export const jobLocations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan']

export const jobTypes = ['Full-time', 'Contract', 'Graduate Programme']

export const jobs = [
  {
    id: 'job-01',
    slug: 'senior-structural-engineer-lagos',
    title: 'Senior Structural Engineer',
    department: 'Engineering',
    location: 'Lagos',
    type: 'Full-time',
    experience: '7+ years',
    posted: '2026-08-22',
    summary:
      'Lead structural design on high-rise and mid-rise commercial projects across the Lagos portfolio, working alongside the in-house geotechnical team.',
    responsibilities: [
      'Produce and check structural designs for reinforced concrete and steel frames',
      'Coordinate with geotechnical, MEP and architectural disciplines',
      'Review contractor submissions and site queries',
      'Mentor graduate and intermediate engineers',
    ],
    requirements: [
      'B.Eng / B.Sc in Civil or Structural Engineering',
      'COREN registration, or eligibility within 12 months',
      'Seven years of structural design experience, ideally in Nigeria',
      'Fluency with ETABS, SAFE or equivalent analysis software',
    ],
  },
  {
    id: 'job-02',
    slug: 'hse-manager-port-harcourt',
    title: 'HSE Manager — Energy Projects',
    department: 'HSE',
    location: 'Port Harcourt',
    type: 'Full-time',
    experience: '8+ years',
    posted: '2026-08-14',
    summary:
      'Own the safety management system across Niger Delta facility projects, including permit-to-work governance on live installations.',
    responsibilities: [
      'Maintain ISO 45001 compliance across all energy sites',
      'Govern the permit-to-work and gas-testing regime',
      'Lead incident investigation and close-out',
      'Interface with client HSE teams and regulators',
    ],
    requirements: [
      'NEBOSH IGC minimum; IDip strongly preferred',
      'Eight years in oil and gas construction HSE',
      'Experience with brownfield and hot-work operations',
      'Willingness to be site-based in Rivers State',
    ],
  },
  {
    id: 'job-03',
    slug: 'quantity-surveyor-abuja',
    title: 'Quantity Surveyor',
    department: 'Finance & Commercial',
    location: 'Abuja',
    type: 'Full-time',
    experience: '5+ years',
    posted: '2026-08-05',
    summary:
      'Handle cost planning, valuations and final accounts on public sector building projects in the FCT.',
    responsibilities: [
      'Prepare bills of quantities and cost plans',
      'Run monthly valuations and variation assessments',
      'Manage subcontract packages and payment certificates',
      'Support tender submissions to government clients',
    ],
    requirements: [
      'B.Sc in Quantity Surveying',
      'NIQS membership or working towards it',
      'Five years of post-qualification experience',
      'Familiarity with public sector procurement in Nigeria',
    ],
  },
  {
    id: 'job-04',
    slug: 'site-engineer-kano',
    title: 'Site Engineer — Water Infrastructure',
    department: 'Construction Management',
    location: 'Kano',
    type: 'Contract',
    experience: '3+ years',
    posted: '2026-07-29',
    summary:
      'Supervise pipeline laying, chamber construction and pressure testing on the Kano municipal reticulation scheme.',
    responsibilities: [
      'Set out works and verify against drawings',
      'Supervise HDPE pipeline installation and jointing',
      'Manage pressure testing and disinfection records',
      'Report progress and constraints to the project manager',
    ],
    requirements: [
      'B.Eng / HND in Civil Engineering',
      'Three years on water or pipeline projects',
      'Working knowledge of HDPE jointing methods',
      'Based in or willing to relocate to Kano',
    ],
  },
  {
    id: 'job-05',
    slug: 'electrical-engineer-ibadan',
    title: 'Electrical Engineer — Solar & Storage',
    department: 'Engineering',
    location: 'Ibadan',
    type: 'Full-time',
    experience: '4+ years',
    posted: '2026-07-16',
    summary:
      'Design and commission solar hybrid and battery storage installations for industrial clients in the South-West.',
    responsibilities: [
      'Size PV arrays, inverters and battery banks to load profiles',
      'Design LV and 33kV distribution and protection',
      'Commission grid-synchronisation and transfer controls',
      'Produce as-built documentation and O&M manuals',
    ],
    requirements: [
      'B.Eng in Electrical / Electronic Engineering',
      'Four years in solar, storage or industrial power',
      'Comfortable with PVsyst or equivalent',
      'COREN registration an advantage',
    ],
  },
  {
    id: 'job-06',
    slug: 'graduate-engineer-programme',
    title: 'Graduate Engineer Programme 2027',
    department: 'Engineering',
    location: 'Lagos',
    type: 'Graduate Programme',
    experience: 'Entry level',
    posted: '2026-07-01',
    summary:
      'A structured two-year rotation across design, site delivery and project controls for recent Nigerian engineering graduates.',
    responsibilities: [
      'Rotate through four six-month placements',
      'Support design and site teams under supervision',
      'Complete the Tech-Aura Academy technical curriculum',
      'Work towards COREN registration with company sponsorship',
    ],
    requirements: [
      'B.Eng / B.Sc in a relevant engineering discipline',
      'Second Class Upper or above',
      'NYSC completed or exempted by the start date',
      'Willingness to be posted to any Tech-Aura location',
    ],
  },
  {
    id: 'job-07',
    slug: 'procurement-officer-lagos',
    title: 'Procurement Officer',
    department: 'Corporate Services',
    location: 'Lagos',
    type: 'Full-time',
    experience: '4+ years',
    posted: '2026-06-24',
    summary:
      'Source materials and plant across a Nigerian supply base, balancing lead times, FX exposure and local content targets.',
    responsibilities: [
      'Run tenders and negotiate supplier framework agreements',
      'Track lead times against project programmes',
      'Maintain local content records for NCDMB reporting',
      'Manage supplier performance and qualification',
    ],
    requirements: [
      'B.Sc in Supply Chain, Business or a related field',
      'Four years in construction or industrial procurement',
      'Strong grasp of Nigerian import and clearing processes',
      'CIPS certification an advantage',
    ],
  },
]

export const getJobBySlug = (slug) => jobs.find((job) => job.slug === slug)

export const benefits = [
  {
    id: 'ben-01',
    title: 'HMO for you and your family',
    body: 'Comprehensive health cover extending to a spouse and up to four children, from your first day.',
  },
  {
    id: 'ben-02',
    title: 'Professional registration sponsored',
    body: 'We pay for COREN, NSE, NIQS and NEBOSH registration and the study time that goes with it.',
  },
  {
    id: 'ben-03',
    title: 'Tech-Aura Academy',
    body: 'Structured technical and leadership training, plus an apprenticeship route into the trades.',
  },
  {
    id: 'ben-04',
    title: 'Performance bonus',
    body: 'An annual bonus tied to company performance and to the safety record of your project.',
  },
  {
    id: 'ben-05',
    title: 'Site allowances and rotation',
    body: 'Location allowances, paid rotation travel and accommodation for out-of-base postings.',
  },
  {
    id: 'ben-06',
    title: 'Pension and gratuity',
    body: 'Full RSA pension contributions above the statutory minimum, with a long-service gratuity scheme.',
  },
]
