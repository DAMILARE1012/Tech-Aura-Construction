/**
 * Navigation model.
 *
 * `primaryNav` drives the desktop bar. An item with `mega` opens the
 * full-width dropdown; without it, it is a plain link.
 */
export const primaryNav = [
  {
    id: 'company',
    label: 'Our Company',
    to: '/about',
    mega: {
      intro: {
        title: 'About Us',
        body: 'Tech-Aura is a Lagos-based construction and engineering services company building the roads, buildings, power and water infrastructure Nigeria depends on.',
        ctaLabel: 'Get to know us',
        ctaTo: '/about',
      },
      columns: [
        {
          id: 'who-we-are',
          title: 'Who We Are',
          links: [
            { label: 'About Us', to: '/about' },
            { label: 'Our Leadership', to: '/people' },
            { label: 'Market Sectors', to: '/services' },
            { label: 'Our Offices', to: '/contact#offices' },
            { label: 'Tech-Aura Academy', to: '/careers#academy' },
          ],
        },
        {
          id: 'our-culture',
          title: 'Our Culture',
          links: [
            { label: 'Safety and Wellbeing', to: '/approach#safety' },
            { label: 'Sustainability', to: '/approach#sustainability' },
            { label: 'Community Impact', to: '/approach#community' },
            { label: 'Nigerian Content', to: '/approach#local-content' },
            { label: 'Ethics and Compliance', to: '/approach#ethics' },
          ],
        },
        {
          id: 'resources',
          title: 'Resources',
          links: [
            { label: 'General Enquiries', to: '/contact' },
            { label: 'Certifications', to: '/about#credentials' },
            { label: 'News and Insights', to: '/insights' },
            { label: 'Tender Enquiries', to: '/contact?topic=tender' },
          ],
        },
      ],
      feature: {
        eyebrow: 'Working with us',
        title: 'Request a capability statement',
        body: 'Send us your scope and we will come back with the team, the method and an indicative programme.',
        ctaLabel: 'Start a conversation',
        ctaTo: '/contact',
        image:
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=70',
      },
    },
  },
  {
    id: 'services',
    label: 'Our Services',
    to: '/services',
    mega: {
      intro: {
        title: 'What We Do',
        body: 'Eight service lines spanning design, construction, energy, power, water and long-term facility management.',
        ctaLabel: 'See all services',
        ctaTo: '/services',
      },
      // Populated at runtime from the services dataset.
      dynamic: 'services',
    },
  },
  { id: 'projects', label: 'Our Projects', to: '/projects' },
  { id: 'insights', label: 'News & Insights', to: '/insights' },
  { id: 'careers', label: 'Careers', to: '/careers' },
]

export const utilityNav = [{ id: 'contact', label: 'Contact Us', to: '/contact' }]

export const footerNav = [
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Leadership', to: '/people' },
      { label: 'Our Approach', to: '/approach' },
      { label: 'News & Insights', to: '/insights' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    links: [
      { label: 'Building Construction', to: '/services/building-construction' },
      { label: 'Civil & Infrastructure', to: '/services/civil-and-infrastructure' },
      { label: 'Oil, Gas & Energy', to: '/services/oil-gas-and-energy' },
      { label: 'Power & Electrical', to: '/services/power-and-electrical' },
      { label: 'Water & Environmental', to: '/services/water-and-environmental' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    links: [
      { label: 'All Projects', to: '/projects' },
      { label: 'Commercial', to: '/projects?sector=Commercial' },
      { label: 'Infrastructure', to: '/projects?sector=Infrastructure' },
      { label: 'Energy', to: '/projects?sector=Energy' },
      { label: 'Public Sector', to: '/projects?sector=Public+Sector' },
    ],
  },
  {
    id: 'connect',
    title: 'Connect',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Tender Enquiries', to: '/contact?topic=tender' },
      { label: 'Our Offices', to: '/contact#offices' },
      { label: 'Work With Us', to: '/careers' },
    ],
  },
]

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
  { label: 'Modern Slavery Statement', to: '/about#credentials' },
]
