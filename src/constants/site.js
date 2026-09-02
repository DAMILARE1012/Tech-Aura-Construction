/**
 * Single source of truth for company-wide details.
 * Update here and every page, the footer and the contact block follow.
 */
export const COMPANY = {
  name: 'Tech-Aura Construction and Engineering Services Ltd.',
  shortName: 'Tech-Aura',
  tagline: 'We Build What Nigeria Needs Next',
  founded: 2009,
  rcNumber: 'RC 894213',
  coren: 'COREN/ENGR/2011/04482',
  description:
    'Tech-Aura is a Lagos-based construction and engineering services company delivering buildings, roads, energy, power and water infrastructure for public and private clients across Nigeria.',
}

export const CONTACT = {
  headOffice: {
    label: 'Head Office — Lagos',
    street: '14B Adeola Odeku Street',
    area: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
  },
  offices: [
    {
      id: 'lagos',
      city: 'Lagos',
      label: 'Head Office',
      street: '14B Adeola Odeku Street, Victoria Island',
      state: 'Lagos State',
      phone: '+234 1 291 4470',
      email: 'lagos@tech-aura.ng',
    },
    {
      id: 'abuja',
      city: 'Abuja',
      label: 'Regional Office',
      street: '7 Usuma Street, Maitama',
      state: 'FCT',
      phone: '+234 9 291 8823',
      email: 'abuja@tech-aura.ng',
    },
    {
      id: 'port-harcourt',
      city: 'Port Harcourt',
      label: 'Energy Operations',
      street: '22 Trans-Amadi Industrial Layout',
      state: 'Rivers State',
      phone: '+234 84 462 210',
      email: 'ph@tech-aura.ng',
    },
    {
      id: 'kano',
      city: 'Kano',
      label: 'Northern Operations',
      street: '5 Bompai Road, Nassarawa GRA',
      state: 'Kano State',
      phone: '+234 64 320 118',
      email: 'kano@tech-aura.ng',
    },
  ],
  phone: '+234 1 291 4470',
  whatsapp: '+234 803 412 7788',
  email: 'info@tech-aura.ng',
  careersEmail: 'careers@tech-aura.ng',
  tendersEmail: 'tenders@tech-aura.ng',
  hours: 'Monday – Friday, 8:00am – 5:00pm WAT',
}

export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/tech-aura-ng' },
  { id: 'x', label: 'X', href: 'https://x.com/techaura_ng' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/techaura.ng' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/techaurang' },
]

/**
 * Background video for the homepage hero.
 * Drop your own file at `public/media/hero.mp4` or point VITE_HERO_VIDEO_URL
 * at a CDN asset. The poster image shows while the video buffers and stands in
 * permanently for reduced-motion users and slow connections.
 */
export const HERO_MEDIA = {
  videoSrc: import.meta.env.VITE_HERO_VIDEO_URL || '/media/hero.mp4',
  videoSrcWebm: import.meta.env.VITE_HERO_VIDEO_WEBM || '/media/hero.webm',
  poster: import.meta.env.VITE_HERO_POSTER || '/media/hero-poster.svg',
}

export const CREDENTIALS = [
  { id: 'cac', label: 'CAC Registered', detail: COMPANY.rcNumber },
  { id: 'coren', label: 'COREN Registered', detail: 'Engineering practice licence' },
  { id: 'iso9001', label: 'ISO 9001:2015', detail: 'Quality management' },
  { id: 'iso45001', label: 'ISO 45001:2018', detail: 'Occupational health & safety' },
  { id: 'ncdmb', label: 'NCDMB Certified', detail: 'Nigerian Content compliance' },
  { id: 'nipex', label: 'NIPEX Registered', detail: 'Oil & gas supply chain' },
]
