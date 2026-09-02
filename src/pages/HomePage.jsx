import { Seo } from '@/components/seo'
import { HeroSection } from '@/features/home/components/HeroSection'
import { StatsBand } from '@/features/home/components/StatsBand'
import { ServicesPreview } from '@/features/home/components/ServicesPreview'
import { FeaturedProjects } from '@/features/home/components/FeaturedProjects'
import { ApproachPreview } from '@/features/home/components/ApproachPreview'
import { SectorsBand } from '@/features/home/components/SectorsBand'
import { InsightsPreview } from '@/features/home/components/InsightsPreview'
import { CtaBanner } from '@/features/home/components/CtaBanner'

export default function HomePage() {

  return (
    <>
      <Seo
        title="Construction & Engineering Company in Lagos, Nigeria"
        description="Tech-Aura builds energy-efficient homes, roads, power, water and oil & gas infrastructure across Nigeria. Lagos-based, COREN registered, 340+ projects delivered since 2009."
        path="/"
      />
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
