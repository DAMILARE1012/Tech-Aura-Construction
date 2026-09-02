const avatar = (seed) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=600&h=700&q=70`

export const leadership = [
  {
    id: 'ldr-01',
    name: 'Engr. Adebayo Ogunleye',
    role: 'Managing Director / CEO',
    location: 'Lagos',
    credentials: 'FNSE, COREN',
    image: avatar('photo-1507003211169-0a1dd7228f2d'),
    bio: 'Adebayo founded Tech-Aura in 2009 after fifteen years on major civil works across the South-West. They chair the executive committee and lead the firm on strategy, client relationships and technical governance.',
  },
  {
    id: 'ldr-02',
    name: 'Engr. Ngozi Okafor',
    role: 'Executive Director, Operations',
    location: 'Lagos',
    credentials: 'MNSE, PMP',
    image: avatar('photo-1573496359142-b8d87734a5a2'),
    bio: 'Ngozi runs delivery across all four regional offices, holding programme, cost and quality accountability for every live site in the portfolio.',
  },
  {
    id: 'ldr-03',
    name: 'Engr. Musa Abdullahi',
    role: 'Director, Energy & Industrial',
    location: 'Port Harcourt',
    credentials: 'MNSE, NEBOSH IGC',
    image: avatar('photo-1472099645785-5658abf4ff4e'),
    bio: 'Musa leads the Niger Delta business, covering flow stations, pipelines and depot works, and owns our NCDMB and NIPEX compliance programme.',
  },
  {
    id: 'ldr-04',
    name: 'Mrs. Folake Adeyemi',
    role: 'Chief Financial Officer',
    location: 'Lagos',
    credentials: 'FCA, MBA',
    image: avatar('photo-1580489944761-15a19d654956'),
    bio: 'Folake oversees finance, procurement and commercial governance, and built the treasury discipline that keeps long programmes funded through currency volatility.',
  },
  {
    id: 'ldr-05',
    name: 'Engr. Chinedu Eze',
    role: 'Director, Engineering Design',
    location: 'Lagos',
    credentials: 'MNSE, COREN, MSc Struct.',
    image: avatar('photo-1519085360753-af0119f7cbe7'),
    bio: 'Chinedu heads the in-house design practice, covering structural, civil and geotechnical work, and signs off every foundation solution the firm proposes.',
  },
  {
    id: 'ldr-06',
    name: 'Dr. Aisha Bello',
    role: 'Director, HSE & Sustainability',
    location: 'Abuja',
    credentials: 'PhD, NEBOSH IDip',
    image: avatar('photo-1594744803329-e58b31de8bf5'),
    bio: 'Aisha owns the safety management system behind our ISO 45001 certification, along with community engagement and environmental compliance.',
  },
]

export const cultureValues = [
  {
    id: 'val-safety',
    title: 'Everyone goes home',
    body: 'No programme date, no client deadline and no cost target outranks a worker getting home safely. Any member of staff can stop work, and no one has ever been penalised for it.',
  },
  {
    id: 'val-local',
    title: 'Nigerian capability first',
    body: 'We hire, train and buy locally by default. Over 90% of our workforce and the bulk of our supply chain are Nigerian, and host communities get first call on site roles.',
  },
  {
    id: 'val-honest',
    title: 'Honest programmes',
    body: 'We quote dates we can hold and raise problems while they are still small. A client should never learn about a delay from the site rather than from us.',
  },
  {
    id: 'val-craft',
    title: 'Build it properly',
    body: 'Drainage sized for the rain that actually falls. Foundations designed for the ground actually there. The work should still be standing long after the ribbon is cut.',
  },
]

export const workforceStats = [
  { value: '1,400+', label: 'Staff and site operatives' },
  { value: '92%', label: 'Nigerian workforce' },
  { value: '38%', label: 'Women in professional roles' },
  { value: '210', label: 'Apprentices trained since 2019' },
]
