import { lazy } from 'react'
import { RootLayout } from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'

// The homepage loads eagerly; everything else is split so the first paint of
// the video hero is not held up by the rest of the site.
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ApproachPage = lazy(() => import('@/pages/ApproachPage'))
const PeoplePage = lazy(() => import('@/pages/PeoplePage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const InsightsPage = lazy(() => import('@/pages/InsightsPage'))
const InsightDetailPage = lazy(() => import('@/pages/InsightDetailPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const JobDetailPage = lazy(() => import('@/pages/JobDetailPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'approach', element: <ApproachPage /> },
      { path: 'people', element: <PeoplePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'insights/:slug', element: <InsightDetailPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'careers/:slug', element: <JobDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <LegalPage document="privacy" /> },
      { path: 'terms', element: <LegalPage document="terms" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
