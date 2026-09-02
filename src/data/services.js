/**
 * Service lines. `slug` drives /services/:slug detail routes.
 */
export const services = [
  {
    id: 'svc-buildings',
    slug: 'building-construction',
    title: 'Building Construction',
    icon: 'Building2',
    summary:
      'Commercial towers, residential estates, schools and healthcare facilities delivered turnkey — designed to run on less power from the day the keys change hands.',
    heroLine: 'Homes and buildings that cost less to run, in a country where power is the running cost.',
    capabilities: [
      'Energy-efficient residential and commercial design',
      'Passive cooling — orientation, cross-ventilation, shaded glazing',
      'Insulated roofing and envelopes that cut cooling load',
      'Solar-ready roofs, risers and metering from day one',
      'High-rise and mid-rise commercial development',
      'Residential estates and multi-unit housing schemes',
      'Institutional buildings — schools, hospitals, places of worship',
      'Interior fit-out, finishes and joinery',
    ],
    sectors: ['Commercial', 'Residential', 'Public Sector', 'Healthcare'],
    stat: { value: '41%', label: 'Lower energy bills than comparable builds' },
  },
  {
    id: 'svc-civil',
    slug: 'civil-and-infrastructure',
    title: 'Civil & Infrastructure',
    icon: 'TrafficCone',
    summary:
      'Roads, bridges, drainage and earthworks engineered for Nigerian rainfall loads, traffic volumes and terrain.',
    heroLine: 'Roads and drainage that survive the rains.',
    capabilities: [
      'Asphalt and rigid pavement road construction',
      'Bridges, culverts and box drains',
      'Storm-water drainage and flood control channels',
      'Sand-filling, reclamation and site preparation',
      'Piling, foundations and ground improvement',
    ],
    sectors: ['Federal & State Works', 'Estates', 'Industrial Parks'],
    stat: { value: '480 km', label: 'Roads and drainage built' },
  },
  {
    id: 'svc-energy',
    slug: 'oil-gas-and-energy',
    title: 'Oil, Gas & Energy',
    icon: 'Factory',
    summary:
      'Onshore facility construction, pipeline works, tank farms and brownfield maintenance for operators across the Niger Delta.',
    heroLine: 'Niger Delta facility work delivered to international HSE standards.',
    capabilities: [
      'Flow station and manifold construction',
      'Pipeline laying, tie-ins and pigging facilities',
      'Tank farm and depot civil works',
      'Mechanical, piping and structural fabrication',
      'Brownfield maintenance and turnaround support',
    ],
    sectors: ['Upstream', 'Midstream', 'Depots & Terminals'],
    stat: { value: '100%', label: 'Nigerian Content compliance' },
  },
  {
    id: 'svc-power',
    slug: 'power-and-electrical',
    title: 'Power & Electrical',
    icon: 'Zap',
    summary:
      'Distribution networks, substations, solar hybrid plants and industrial electrical installations that keep operations running through grid instability.',
    heroLine: 'Reliable power where the grid is not.',
    capabilities: [
      '11kV / 33kV distribution lines and substations',
      'Solar hybrid and battery storage plants',
      'Industrial and commercial electrical installation',
      'Generator sets, synchronisation and changeover systems',
      'Street lighting and estate power infrastructure',
    ],
    sectors: ['Utilities', 'Industrial', 'Estates', 'Public Sector'],
    stat: { value: '38 MW', label: 'Installed capacity delivered' },
  },
  {
    id: 'svc-water',
    slug: 'water-and-environmental',
    title: 'Water & Environmental',
    icon: 'Droplets',
    summary:
      'Boreholes, treatment plants, reticulation networks and sanitation works that put clean water within reach of communities and industry.',
    heroLine: 'Clean water infrastructure, from borehole to tap.',
    capabilities: [
      'Industrial and community borehole drilling',
      'Water treatment and reverse-osmosis plants',
      'Reticulation networks and overhead storage',
      'Sewage treatment and waste-water management',
      'Environmental impact assessment support',
    ],
    sectors: ['Municipal', 'Industrial', 'Community Development'],
    stat: { value: '1.2M', label: 'Nigerians served with water access' },
  },
  {
    id: 'svc-mep',
    slug: 'mep-and-facility-management',
    title: 'MEP & Facility Management',
    icon: 'Wrench',
    summary:
      'Mechanical, electrical and plumbing installation plus long-term facility management that protects the value of the asset after handover.',
    heroLine: 'The building works on day one — and on day three thousand.',
    capabilities: [
      'HVAC design, supply and installation',
      'Plumbing, fire-fighting and suppression systems',
      'Lifts, escalators and building services',
      'Planned preventive maintenance contracts',
      'Integrated facility management and helpdesk',
    ],
    sectors: ['Commercial', 'Hospitality', 'Healthcare', 'Retail'],
    stat: { value: '96%', label: 'Contract renewal rate' },
  },
  {
    id: 'svc-design',
    slug: 'engineering-design-and-consultancy',
    title: 'Engineering Design & Consultancy',
    icon: 'DraftingCompass',
    summary:
      'COREN-registered structural, civil and services design, feasibility studies and value engineering — before the first block is laid.',
    heroLine: 'Get the drawings right and the build follows.',
    capabilities: [
      'Structural and civil engineering design',
      'Geotechnical investigation and soil testing',
      'Feasibility studies and cost planning',
      'Value engineering and buildability reviews',
      'Regulatory approvals and permit management',
    ],
    sectors: ['All sectors'],
    stat: { value: 'COREN', label: 'Registered practice' },
  },
  {
    id: 'svc-pm',
    slug: 'project-and-construction-management',
    title: 'Project & Construction Management',
    icon: 'ClipboardCheck',
    summary:
      'Owner-side programme, cost and quality control for clients running multiple sites or complex multi-contractor builds.',
    heroLine: 'One accountable partner across every contractor on site.',
    capabilities: [
      'Programme planning and critical-path scheduling',
      'Cost control, valuations and quantity surveying',
      'Contractor procurement and tender management',
      'Quality assurance and site supervision',
      'Handover, snagging and defect liability management',
    ],
    sectors: ['Developers', 'Public Sector', 'Multinationals'],
    stat: { value: '₦180bn', label: 'Project value managed' },
  },
]

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug)
