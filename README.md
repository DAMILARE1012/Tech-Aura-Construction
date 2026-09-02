# Tech-Aura Construction and Engineering Services

Marketing and corporate website for Tech-Aura, a Lagos-based Nigerian construction
and engineering services company.

**Stack:** React 19 · Vite 8 · Redux Toolkit + RTK Query · React Router 7 · Tailwind CSS 4

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle into dist/
npm run preview  # serve the production build
npm run lint
```

---

## Add the hero background video

The homepage hero plays a looping, muted background video. Drop your footage in:

```
public/media/hero.mp4     # required
public/media/hero.webm    # optional, served first where supported
```

A generated SVG poster (`public/media/hero-poster.svg`) is painted underneath and
shows while the video buffers, if the file is missing, or when the visitor has
reduced motion enabled — so the hero never looks broken.

To serve the video from a CDN instead, copy `.env.example` to `.env` and set:

```
VITE_HERO_VIDEO_URL=https://cdn.example.com/hero.mp4
VITE_HERO_VIDEO_WEBM=https://cdn.example.com/hero.webm
VITE_HERO_POSTER=https://cdn.example.com/hero-poster.jpg
```

**Encoding guidance:** 1920×1080, H.264, 8–15 seconds, no audio track, and under
about 6 MB. Aim for a slow-moving aerial or site shot — the headline sits over
the left third, so keep that area uncluttered.

---

## Project structure

Everything is organised by **feature**, so each area of the site owns its data
fetching, its slice of state and its components in one folder.

```
src/
├── api/                      RTK Query foundation
│   ├── apiSlice.js           the single createApi instance; features inject into it
│   ├── baseQuery.js          switches between the real API and the mock
│   └── mockBackend.js        in-browser route table over local data
│
├── app/
│   ├── store.js              configureStore, reducers, middleware
│   └── routes.jsx            route manifest (all pages lazy except home)
│
├── data/                     content: projects, services, insights, careers, people
├── constants/site.js         company details, offices, credentials, hero media
│
├── features/                 one folder per feature
│   ├── ui/                   uiSlice — mega menu, mobile nav, search overlay
│   ├── home/components/      hero, stats band, previews, CTA banner
│   ├── projects/             projectsApi · projectFiltersSlice · components/
│   ├── services/             servicesApi · components/
│   ├── insights/             insightsApi · insightFiltersSlice · components/
│   ├── careers/              careersApi · jobFiltersSlice · components/
│   ├── people/               peopleApi · components/
│   └── contact/              contactApi · ContactForm · NewsletterForm
│
├── components/
│   ├── layout/               RootLayout, header/ (nav, mega menu, search), footer/
│   └── ui/                   Button, Container, Section, Field, FilterBar, …
│
├── pages/                    one file per route, composed from feature components
├── hooks/                    useScrolled, useMediaQuery, useLockBodyScroll, …
└── utils/                    cn (clsx + tailwind-merge), date and currency formatting
```

### Adding a feature

1. Create `src/features/<name>/`.
2. Add `<name>Api.js` calling `apiSlice.injectEndpoints(...)`.
3. Add a slice only if the feature needs client state (filters, toggles).
4. Register the reducer in `src/app/store.js` and import the API module there
   for its side effect — endpoint injection happens at module load.
5. Put presentational pieces in `<name>/components/`, and compose them in a page.

---

## State and data

**RTK Query** owns all server state — caching, loading flags, errors and
deduplication. **Redux slices** own only client state that RTK Query cannot:
navigation overlays and filter selections.

### The mock backend

There is no server yet, so `baseQuery` routes requests to `mockBackend.js`,
which serves `src/data/*` through a route table with realistic latency, query
parameters, 404s and 422 validation errors.

To point at a real API, set one variable:

```
VITE_API_BASE_URL=https://api.tech-aura.ng/v1
```

No component or endpoint changes are needed. The mock implements:

| Method | Route              | Notes                                         |
| ------ | ------------------ | --------------------------------------------- |
| GET    | `/projects`        | `sector`, `state`, `status`, `search`, `featured`, `limit` |
| GET    | `/projects/:slug`  | includes related projects                     |
| GET    | `/services`        | `limit`                                       |
| GET    | `/services/:slug`  | includes related projects                     |
| GET    | `/insights`        | `category`, `search`, `featured`, `limit`     |
| GET    | `/insights/:slug`  | includes related articles                     |
| GET    | `/jobs`            | `department`, `location`, `type`, `search`    |
| GET    | `/jobs/:slug`      |                                               |
| GET    | `/people`          | leadership team                               |
| POST   | `/enquiries`       | contact form                                  |
| POST   | `/applications`    | job application                               |
| POST   | `/subscriptions`   | newsletter                                    |

---

## Design system

Tokens live in `src/index.css` and come in **two layers**.

**Palette** — raw hues, never theme-dependent:

| Token    | Role                                                                   |
| -------- | ---------------------------------------------------------------------- |
| `aura`   | Brand green — deep and engineered rather than minty                     |
| `solar`  | Warm amber — rationed, for energy/sunlight cues and in-progress states  |
| `ink`    | Charcoal scale                                                          |
| `sand`   | Warm off-whites                                                         |
| `danger` | Validation errors and failure states only                               |

**Semantic** — what a colour is *for*. These are the ones components use:

| Token                     | Role                                          |
| ------------------------- | --------------------------------------------- |
| `surface`                 | Page background                               |
| `surface-raised`          | Cards and panels                              |
| `surface-sunken`          | Recessed bands                                |
| `surface-inverse`         | The alternating dark bands                    |
| `surface-inverse-raised`  | Cards sitting on a dark band                  |
| `content-strong`          | Headings                                      |
| `content` / `-muted` / `-faint` | Body, secondary, tertiary text           |
| `line` / `-soft` / `-strong`    | Borders                                  |
| `brand` / `-emphasis` / `-hover` / `-soft` / `-border` | Green accents |

> **Reach for a semantic token.** Use a raw palette token only on a surface that
> is dark in *both* themes — the homepage hero, the footer, page heroes, and
> `bg-white/10` hairlines over photography.

Type is **Archivo** for display and **Inter** for body copy.

Use the `cn()` helper from `src/utils/cn.js` for every conditional class — it
runs `tailwind-merge`, so a `className` prop passed into a component reliably
overrides that component's own defaults.

---

## Light and dark themes

The header carries a sun/moon toggle (also in the mobile drawer under
*Appearance*). It works by redefining the semantic variables under a `dark`
class on `<html>` — there are **no `dark:` variants in the markup**, so adding a
new component needs no theme work provided it uses semantic tokens.

- State lives in `src/features/theme/themeSlice.js`
- `useApplyTheme()` in `RootLayout` is the single place that touches the DOM class and `localStorage`
- First visit follows the OS `prefers-color-scheme`; an explicit choice is remembered
- An inline script in `index.html` applies the class **before first paint**, so there is no flash of the wrong theme. It mirrors `getInitialTheme()` — change one, change the other.
- `color-scheme` is set on `<html>` so native scrollbars and form controls match

Note that `surface-inverse` inverts its relationship to the page between themes:
in light mode the dark bands recede, in dark mode they sit *lighter* than the
background so the alternating section rhythm survives.

---

## Accessibility and performance

- Skip-to-content link, visible focus rings, labelled form fields with inline errors
- Full keyboard navigation, `Escape` closes the mega menu and search overlay
- Scroll locked behind overlays; every overlay closes on route change
- `prefers-reduced-motion` is honoured globally and disables the hero video
- All pages except the homepage are code-split; the poster image is preloaded

---

## SEO

### What is in place

- **Per-page metadata** via `<Seo>` (`src/components/seo/Seo.jsx`). React 19 hoists `<title>`, `<meta>` and `<link>` into `<head>` natively, so there is no head-manager dependency. Every route sets a unique title, description, canonical URL, Open Graph and Twitter card. The 404 sets `noindex`.
- **Structured data** (`src/components/seo/schema.js`) emitted as a single JSON-LD `@graph` so nodes cross-reference by `@id` instead of repeating the organisation on every page:
  - `Organization` + `GeneralContractor` with the Lagos address, geo coordinates, opening hours, contact points and all four offices
  - `WebSite` with `SearchAction` for the sitelinks search box
  - `BreadcrumbList` on every inner page
  - `Article` on insights, `Service` on service pages, `CreativeWork` on projects
  - **`JobPosting` on every vacancy** — this is what makes roles eligible for Google Jobs
- **`sitemap.xml` and `robots.txt`** generated from the real content data by `scripts/generate-sitemap.mjs`, wired to `prebuild` so they regenerate on every build. Currently 41 URLs. Adding a project or vacancy needs no manual sitemap edit.
- `lang="en-NG"`, `geo.region`, naira pricing and Nigerian place names throughout — all local-search signals.
- Descriptive `alt` text on content images; decorative images keep `alt=""`.
- One `<h1>` per page, ordered headings, semantic landmarks, skip link.
- `site.webmanifest`, preconnects for fonts, preloaded hero poster, lazy-loaded below-fold images, code-split routes.

### Configure before launch

```
VITE_SITE_URL=https://www.tech-aura.ng   # canonical origin for meta + schema
SITE_URL=https://www.tech-aura.ng        # same value for the sitemap script
```

Both default to `https://www.tech-aura.ng`. **Change them if the domain differs**, or
every canonical tag and sitemap URL will point at the wrong host.

### Outstanding

**1. Export the Open Graph image.** `public/og-image.svg` is the 1200×630 source.
Export it to `public/og-image.png` — the meta tags already point there. Social
platforms do not accept SVG for previews, so until that PNG exists, shared links
show no image.

**2. Prerendering — the one real structural gap.**

This is a client-rendered SPA, so the served HTML is an empty `<div id="root">`.

- **Google is fine.** It executes JavaScript, so it sees the rendered titles, descriptions and JSON-LD, and the site will index and rank normally.
- **Social crawlers are not.** Facebook, LinkedIn, WhatsApp, Slack and X do *not* run JavaScript. They only ever read the static tags in `index.html`, so **every shared link currently previews with the same generic homepage title, description and image** regardless of which page was shared.

The static defaults in `index.html` mean previews are never broken — just not
page-specific. Fixing it properly means prerendering each route to static HTML
at build time (SSG). That is a contained but real piece of work: a server entry
using `renderToString`, RTK Query state preloading and dehydration, `hydrateRoot`
on the client, and a build step that walks the routes. Worth doing before any
campaign that leans on shared links.

---

## Content

Copy and data are Nigerian throughout: naira contract values, Lagos/Abuja/Port
Harcourt/Kano offices, states rather than counties, and CAC, COREN, NCDMB and
NIPEX credentials. Client names are generic sector descriptions rather than
named organisations — replace them with real clients once permissions are in place.

Placeholder photography loads from Unsplash. Swap the `image` fields in
`src/data/*.js` for files in `public/media/` when real project photography is available.
