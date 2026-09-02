/**
 * Project portfolio. Images resolve to remote placeholders so the site renders
 * before real photography is supplied — swap `image` for files in /public/media.
 */
const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=70`

export const projectSectors = [
  'Commercial',
  'Residential',
  'Infrastructure',
  'Energy',
  'Power',
  'Water',
  'Public Sector',
]

export const projectStates = [
  'Lagos State',
  'FCT Abuja',
  'Rivers State',
  'Ogun State',
  'Kano State',
  'Oyo State',
  'Delta State',
]

export const projectStatuses = ['Completed', 'Ongoing', 'Handed Over']

export const projects = [
  {
    id: 'prj-001',
    slug: 'lekki-coastal-business-park',
    title: 'Lekki Coastal Business Park',
    client: 'Private Development Consortium',
    sector: 'Commercial',
    state: 'Lagos State',
    location: 'Lekki Phase 1, Lagos',
    status: 'Completed',
    year: 2024,
    value: '₦18.4bn',
    duration: '31 months',
    featured: true,
    image: img('photo-1486406146926-c627a92ad1ab'),
    summary:
      'A 14-storey Grade-A office campus on reclaimed Lekki land, delivered with a piled raft foundation and a 2.4MW solar hybrid plant.',
    challenge:
      'The site sat on reclaimed ground with a water table barely two metres below the surface, and the client needed occupancy before the next dry season closed.',
    solution:
      'Our geotechnical team specified a 780-pile bored foundation with a reinforced raft cap, then ran three concurrent work faces on a 24-hour cycle through the dry months to protect the programme.',
    outcome:
      'Handed over five weeks ahead of contract with zero lost-time injuries across 1.9 million man-hours, and an energy bill 41% below comparable Lagos towers.',
    scope: [
      'Piling and substructure',
      'Structural frame and envelope',
      'MEP installation',
      'Solar hybrid power plant',
      'External works and landscaping',
    ],
    stats: [
      { value: '14', label: 'Storeys' },
      { value: '780', label: 'Bored piles' },
      { value: '2.4 MW', label: 'Solar hybrid' },
      { value: '0', label: 'Lost-time injuries' },
    ],
  },
  {
    id: 'prj-002',
    slug: 'ogun-industrial-access-road',
    title: 'Ogun Industrial Corridor Access Road',
    client: 'Ogun State Ministry of Works & Infrastructure',
    sector: 'Infrastructure',
    state: 'Ogun State',
    location: 'Sagamu – Abeokuta Corridor, Ogun',
    status: 'Completed',
    year: 2023,
    value: '₦12.1bn',
    duration: '22 months',
    featured: true,
    image: img('photo-1545558014-8692077e9b5c'),
    summary:
      '27km of dual carriageway asphalt with box drainage, opening a manufacturing corridor between Sagamu and Abeokuta.',
    challenge:
      'The existing alignment flooded every wet season, cutting factory access for weeks and forcing haulage onto a 60km detour.',
    solution:
      'We redesigned the drainage to a 1-in-25-year storm event, raised the formation level by 900mm across the flood plain and used a stone-base pavement rated for 40-tonne axle loads.',
    outcome:
      'Two full rainy seasons without closure, and haulage times between the corridor and the Lagos ports cut by roughly 90 minutes.',
    scope: [
      'Earthworks and formation raising',
      '27km dual carriageway asphalt',
      'Box culverts and storm drainage',
      'Road furniture and solar street lighting',
    ],
    stats: [
      { value: '27 km', label: 'Dual carriageway' },
      { value: '900 mm', label: 'Formation raised' },
      { value: '1-in-25', label: 'Storm design year' },
      { value: '90 min', label: 'Haulage time saved' },
    ],
  },
  {
    id: 'prj-003',
    slug: 'trans-amadi-flow-station-upgrade',
    title: 'Trans-Amadi Flow Station Upgrade',
    client: 'Indigenous Upstream Operator',
    sector: 'Energy',
    state: 'Rivers State',
    location: 'Trans-Amadi, Port Harcourt',
    status: 'Completed',
    year: 2024,
    value: '₦9.7bn',
    duration: '17 months',
    featured: true,
    image: img('photo-1518709268805-4e9042af2176'),
    summary:
      'Brownfield capacity upgrade of a producing flow station from 15,000 to 24,000 barrels per day without a full production shutdown.',
    challenge:
      'The operator could not afford a full shutdown, so every tie-in had to happen inside narrow production windows on a live facility.',
    solution:
      'We pre-fabricated skids off-site at our Port Harcourt yard, then executed hot tie-ins across eleven scheduled windows under a dedicated permit-to-work and gas-testing regime.',
    outcome:
      'Capacity raised 60% with only nine days of cumulative downtime, and 94% of the workforce sourced from the host community.',
    scope: [
      'Off-site skid fabrication',
      'Manifold and separator installation',
      'Piping, tie-ins and hydrotesting',
      'Instrumentation and control upgrade',
    ],
    stats: [
      { value: '24,000', label: 'Barrels per day' },
      { value: '+60%', label: 'Capacity increase' },
      { value: '9 days', label: 'Total downtime' },
      { value: '94%', label: 'Host community labour' },
    ],
  },
  {
    id: 'prj-004',
    slug: 'maitama-diagnostic-hospital',
    title: 'Maitama Diagnostic & Specialist Hospital',
    client: 'Federal Capital Territory Administration',
    sector: 'Public Sector',
    state: 'FCT Abuja',
    location: 'Maitama, Abuja',
    status: 'Ongoing',
    year: 2026,
    value: '₦22.8bn',
    duration: '34 months',
    featured: true,
    image: img('photo-1519494026892-80bbd2d6fd0d'),
    summary:
      'A 220-bed specialist hospital with imaging suites, four theatres and a fully redundant power and medical gas backbone.',
    challenge:
      'Imaging and theatre suites demand vibration limits, air-change rates and power redundancy well beyond ordinary commercial construction.',
    solution:
      'We isolated the imaging wing on its own structural raft, installed a dual-feed N+1 power topology with a 1.6MW backup array, and stood up a dedicated commissioning team from month eighteen.',
    outcome:
      'Currently at 68% completion and tracking to programme, with the outpatient wing scheduled for early handover.',
    scope: [
      'Structural works across three wings',
      'Medical gas and specialist HVAC',
      'N+1 power and backup generation',
      'Imaging suite vibration isolation',
    ],
    stats: [
      { value: '220', label: 'Beds' },
      { value: '4', label: 'Operating theatres' },
      { value: '1.6 MW', label: 'Backup power' },
      { value: '68%', label: 'Complete' },
    ],
  },
  {
    id: 'prj-005',
    slug: 'kano-water-reticulation-scheme',
    title: 'Kano Municipal Water Reticulation Scheme',
    client: 'Kano State Water Board',
    sector: 'Water',
    state: 'Kano State',
    location: 'Nassarawa & Fagge LGAs, Kano',
    status: 'Ongoing',
    year: 2026,
    value: '₦7.3bn',
    duration: '19 months',
    featured: false,
    image: img('photo-1547683905-f686c993aae5'),
    summary:
      'Treatment plant refurbishment and 64km of reticulation extending piped water to roughly 340,000 residents.',
    challenge:
      'Legacy asbestos-cement mains were losing close to half of treated output before it ever reached a household tap.',
    solution:
      'We replaced the trunk mains with HDPE, installed district metering zones for leak detection, and refurbished the treatment plant to 42 million litres per day.',
    outcome:
      'Non-revenue water down from 48% to 19% across the completed zones, with the remaining zones due next year.',
    scope: [
      'Treatment plant refurbishment',
      '64km HDPE reticulation',
      'District metering zones',
      'Community standpipes',
    ],
    stats: [
      { value: '340k', label: 'Residents served' },
      { value: '64 km', label: 'Pipeline laid' },
      { value: '42 MLD', label: 'Plant capacity' },
      { value: '19%', label: 'Non-revenue water' },
    ],
  },
  {
    id: 'prj-006',
    slug: 'bourdillon-residences',
    title: 'The Bourdillon Residences',
    client: 'Private Developer',
    sector: 'Residential',
    state: 'Lagos State',
    location: 'Ikoyi, Lagos',
    status: 'Handed Over',
    year: 2023,
    value: '₦14.6bn',
    duration: '28 months',
    featured: false,
    image: img('photo-1512917774080-9991f1c4c750'),
    summary:
      '48 luxury apartments across two towers with a shared podium, basement parking and a private water treatment plant.',
    challenge:
      'A tight Ikoyi plot bounded on three sides by occupied residences left almost no laydown area and strict noise windows.',
    solution:
      'We ran just-in-time material delivery from a Lekki staging yard and used a top-down basement sequence to open up the superstructure earlier.',
    outcome:
      'Delivered on programme with no neighbour complaint escalated to the local authority, and full occupancy within four months of handover.',
    scope: [
      'Top-down basement construction',
      'Twin residential towers',
      'Podium amenities and pool',
      'Private water treatment plant',
    ],
    stats: [
      { value: '48', label: 'Apartments' },
      { value: '2', label: 'Towers' },
      { value: '3', label: 'Basement levels' },
      { value: '100%', label: 'Occupancy in 4 months' },
    ],
  },
  {
    id: 'prj-007',
    slug: 'ibadan-solar-hybrid-plant',
    title: 'Ibadan Industrial Solar Hybrid Plant',
    client: 'Food Processing Group',
    sector: 'Power',
    state: 'Oyo State',
    location: 'Oluyole Industrial Estate, Ibadan',
    status: 'Completed',
    year: 2025,
    value: '₦5.9bn',
    duration: '11 months',
    featured: false,
    image: img('photo-1509391366360-2e959784a276'),
    summary:
      'A 6.5MW solar array with 12MWh of battery storage and grid synchronisation, cutting diesel dependence at a processing plant.',
    challenge:
      'The plant was burning close to 40,000 litres of diesel a month covering grid outages, and production could not tolerate a switching gap.',
    solution:
      'We built a 6.5MW ground-mounted array with a battery bank sized for the full night-shift load, behind a controller that transfers between grid, solar and generator without interruption.',
    outcome:
      'Diesel consumption down 78% and energy cost per tonne of output down by roughly a third in the first year.',
    scope: [
      '6.5MW ground-mounted solar array',
      '12MWh battery energy storage',
      'Grid synchronisation and controls',
      '33kV substation upgrade',
    ],
    stats: [
      { value: '6.5 MW', label: 'Solar capacity' },
      { value: '12 MWh', label: 'Battery storage' },
      { value: '-78%', label: 'Diesel use' },
      { value: '11 mo', label: 'Delivery' },
    ],
  },
  {
    id: 'prj-008',
    slug: 'warri-tank-farm-civils',
    title: 'Warri Petroleum Depot Civil Works',
    client: 'Downstream Storage Operator',
    sector: 'Energy',
    state: 'Delta State',
    location: 'Warri, Delta State',
    status: 'Completed',
    year: 2022,
    value: '₦8.2bn',
    duration: '20 months',
    featured: false,
    image: img('photo-1516937941344-00b4e0337589'),
    summary:
      'Bunded tank farm foundations, firewater ring main and loading gantry civils for a 60-million-litre storage depot.',
    challenge:
      'Soft delta soils and a statutory bund containment requirement meant the tank pads had to resist both settlement and hydrocarbon ingress.',
    solution:
      'We used vibro stone columns for ground improvement under each pad, over a HDPE-lined bund with a monitored interstitial layer.',
    outcome:
      'Settlement held within 12mm across all pads at hydrotest, and the depot passed regulatory inspection first time.',
    scope: [
      'Ground improvement and tank pads',
      'Lined bund containment',
      'Firewater ring main',
      'Loading gantry civils',
    ],
    stats: [
      { value: '60M L', label: 'Storage capacity' },
      { value: '12 mm', label: 'Max settlement' },
      { value: '8', label: 'Storage tanks' },
      { value: '1st', label: 'Pass on inspection' },
    ],
  },
  {
    id: 'prj-009',
    slug: 'yaba-innovation-campus',
    title: 'Yaba Innovation Campus',
    client: 'Lagos State Government',
    sector: 'Public Sector',
    state: 'Lagos State',
    location: 'Yaba, Lagos',
    status: 'Ongoing',
    year: 2026,
    value: '₦6.4bn',
    duration: '18 months',
    featured: false,
    image: img('photo-1497366216548-37526070297c'),
    summary:
      'A four-building technology and skills campus with training halls, fabrication labs and a 900-seat auditorium.',
    challenge:
      'The brief called for teaching space that could be reconfigured as programmes change, on a live urban site beside an operating polytechnic.',
    solution:
      'We used a long-span structural grid with demountable internal partitions and phased the works so the polytechnic access road stayed open throughout.',
    outcome:
      'Two of four buildings topped out, with the fabrication labs due for handover ahead of the next academic session.',
    scope: [
      'Four-building campus construction',
      'Long-span structural frame',
      '900-seat auditorium',
      'Campus-wide fibre and power',
    ],
    stats: [
      { value: '4', label: 'Buildings' },
      { value: '900', label: 'Auditorium seats' },
      { value: '18 mo', label: 'Programme' },
      { value: '2/4', label: 'Topped out' },
    ],
  },
]

export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug)
