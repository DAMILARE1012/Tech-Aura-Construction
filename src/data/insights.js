const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=70`

export const insightCategories = ['Company News', 'Engineering', 'Safety', 'Sustainability', 'People']

export const insights = [
  {
    id: 'ins-01',
    slug: 'digital-tools-redefining-site-safety',
    title: 'How Digital Tools Are Redefining Safety on Complex Nigerian Sites',
    category: 'Safety',
    date: '2026-08-18',
    readTime: '6 min read',
    author: 'Dr. Aisha Bello',
    featured: true,
    image: img('photo-1504307651254-35680f356dfd'),
    excerpt:
      'Tablet-based permits, geofenced plant and same-day incident analytics have cut our recordable rate by more than half in three years. Here is what actually moved the needle.',
    body: [
      'When we started digitising the permit-to-work process in 2022, the expectation was faster paperwork. What we got was something more useful: visibility. A supervisor in Trans-Amadi and a director in Victoria Island now look at the same live picture of who is working at height, which isolation is open and which permit is about to expire.',
      'The three changes that mattered most were unglamorous. First, permits moved to tablets, so an expired permit closes itself rather than sitting in a folder. Second, heavy plant carries geofence tags, so a reversing excavator inside a pedestrian zone triggers an alert before it triggers an incident. Third, every near-miss is analysed within twenty-four hours while the crew still remembers the detail.',
      'None of this replaces the daily toolbox talk. Nigerian sites run on relationships and on supervisors who know their crews by name. The technology simply removes the delay between something going wrong and somebody who can fix it finding out.',
      'Across 1.9 million man-hours at Lekki Coastal Business Park we recorded zero lost-time injuries. That number belongs to the crews, not to the software — but the software is how we knew where to look.',
    ],
  },
  {
    id: 'ins-02',
    slug: 'designing-drainage-for-real-lagos-rainfall',
    title: 'Designing Drainage for the Rain Lagos Actually Gets',
    category: 'Engineering',
    date: '2026-07-02',
    readTime: '8 min read',
    author: 'Engr. Chinedu Eze',
    featured: true,
    image: img('photo-1519692933481-e162a57d6721'),
    excerpt:
      'Too many Nigerian roads are drained to design storms that stopped being realistic a decade ago. The fix is not more concrete — it is better return-period assumptions.',
    body: [
      'A drainage channel is only as good as the storm it was sized for. Much of the legacy infrastructure across Lagos and Ogun was designed against a 1-in-10-year event using rainfall records that predate the last two decades of intensification. The channels are not failing because they were built badly. They are failing because the assumption underneath them expired.',
      'On the Ogun Industrial Corridor Access Road we moved to a 1-in-25-year design event and raised the formation level by 900mm across the flood plain. That decision added roughly nine per cent to the capital cost. Two full rainy seasons later the road has not closed once, against a previous pattern of multi-week closures.',
      'The economics are not close. A single week of closure on that corridor cost haulage operators more than the entire drainage uplift.',
      'What we recommend to clients is simple: ask what return period your drainage was designed to, and when the rainfall data behind it was last updated. If nobody can answer, that is the finding.',
    ],
  },
  {
    id: 'ins-03',
    slug: 'tech-aura-wins-maitama-hospital-contract',
    title: 'Tech-Aura Appointed for the Maitama Diagnostic & Specialist Hospital',
    category: 'Company News',
    date: '2026-06-11',
    readTime: '3 min read',
    author: 'Corporate Communications',
    featured: true,
    image: img('photo-1519494026892-80bbd2d6fd0d'),
    excerpt:
      'The ₦22.8bn, 220-bed facility in Abuja is the largest healthcare project in the company history and brings the public sector portfolio past ₦45bn.',
    body: [
      'Tech-Aura has been appointed principal contractor for the Maitama Diagnostic and Specialist Hospital, a 220-bed facility for the Federal Capital Territory Administration.',
      'The scope covers three clinical wings, four operating theatres, imaging suites with vibration-isolated foundations, and a fully redundant N+1 power topology backed by a 1.6MW array.',
      'The project is currently at 68% completion and tracking to a 34-month programme, with the outpatient wing scheduled for early handover.',
      'It is the largest healthcare contract in the company history and takes the public sector portfolio past ₦45bn in active value.',
    ],
  },
  {
    id: 'ins-04',
    slug: 'solar-hybrid-economics-nigerian-industry',
    title: 'The Solar Hybrid Maths Has Changed for Nigerian Industry',
    category: 'Sustainability',
    date: '2026-05-20',
    readTime: '7 min read',
    author: 'Engr. Ngozi Okafor',
    featured: false,
    image: img('photo-1509391366360-2e959784a276'),
    excerpt:
      'At current diesel prices, a properly sized solar and storage plant pays back in under four years for most Nigerian processing operations. The obstacle is sizing, not economics.',
    body: [
      'For years the honest answer to a Nigerian manufacturer asking about solar was that it would not pay back quickly enough to compete with capital going into production capacity. Diesel pricing has ended that argument.',
      'At the Ibadan plant we replaced roughly 40,000 litres of monthly diesel with a 6.5MW array and 12MWh of storage. Diesel use fell 78% and energy cost per tonne of output fell by about a third in the first year.',
      'The mistake we most often see is sizing the array to the daytime load and treating storage as an afterthought. In a plant running night shifts, the battery is what determines whether the generators actually stop, and generators that idle at low load are where the money leaks away.',
      'Size the storage to the night-shift load. Specify a controller that transfers between grid, solar and generator without a gap. Then the payback case holds.',
    ],
  },
  {
    id: 'ins-05',
    slug: 'apprenticeship-programme-2026-intake',
    title: 'Tech-Aura Opens 2026 Apprenticeship Intake Across Four States',
    category: 'People',
    date: '2026-04-08',
    readTime: '4 min read',
    author: 'Corporate Communications',
    featured: false,
    image: img('photo-1516321318423-f06f85e504b3'),
    excerpt:
      'Sixty places for young Nigerians in welding, formwork, electrical installation and site surveying, with a guaranteed interview on completion.',
    body: [
      'The Tech-Aura Academy has opened its 2026 intake, offering sixty apprenticeship places across Lagos, Rivers, Kano and Oyo States.',
      'Trades covered are welding and fabrication, formwork and steel-fixing, electrical installation, and site surveying. The programme runs eighteen months, combines classroom instruction with supervised site placement, and pays a stipend throughout.',
      'Every apprentice who completes the programme is guaranteed an interview for a permanent site role. Of the 210 apprentices trained since 2019, 147 are currently employed by the firm.',
      'Applications are open to Nigerians aged 18 to 26 with a minimum of an SSCE. Host community candidates receive priority consideration for placements at nearby sites.',
    ],
  },
  {
    id: 'ins-06',
    slug: 'building-on-reclaimed-lekki-land',
    title: 'What We Have Learned Building on Reclaimed Lekki Land',
    category: 'Engineering',
    date: '2026-02-26',
    readTime: '9 min read',
    author: 'Engr. Chinedu Eze',
    featured: false,
    image: img('photo-1486406146926-c627a92ad1ab'),
    excerpt:
      'High water tables, variable fill and aggressive ground chemistry make the Lekki axis unforgiving. Six lessons from four towers and a lot of geotechnical investigation.',
    body: [
      'Reclaimed ground along the Lekki axis is not one condition, it is many. Fill depth, compaction quality and chloride content vary sharply over short distances, sometimes within a single plot.',
      'The first lesson is that the site investigation budget is the cheapest money on the project. On the Lekki Coastal Business Park we ran boreholes at a tighter grid than the standard would require, and the variation we found changed the foundation solution entirely.',
      'The second is that the water table governs the programme, not just the design. Dewatering costs and concrete pour windows shape the construction sequence, and a schedule that ignores them is fiction.',
      'The third, and the one clients find hardest to hear, is that chloride-rich ground demands higher concrete cover and sulphate-resistant mixes. It costs more up front and it is the difference between a fifty-year structure and a twenty-year one.',
    ],
  },
]

export const getInsightBySlug = (slug) => insights.find((insight) => insight.slug === slug)
