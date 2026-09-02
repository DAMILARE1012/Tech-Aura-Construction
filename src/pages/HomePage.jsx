import { HeroSection } from '@/features/home/components/HeroSection'
import { StatsBand } from '@/features/home/components/StatsBand'
import { ServicesPreview } from '@/features/home/components/ServicesPreview'
import { FeaturedProjects } from '@/features/home/components/FeaturedProjects'
import { ApproachPreview } from '@/features/home/components/ApproachPreview'
import { SectorsBand } from '@/features/home/components/SectorsBand'
import { InsightsPreview } from '@/features/home/components/InsightsPreview'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Construction & Engineering Services in Lagos, Nigeria')

  return (
    <>
      <HeroSection />
      <StatsBand />
      <ServicesPreview />
      <FeaturedProjects />
      <ApproachPreview />
      <SectorsBand />
      <InsightsPreview />
      <CtaBanner />
    </>
  )
}
