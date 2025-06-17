import { createFileRoute } from '@tanstack/react-router'
import LandingPageLayout from '@/components/layout/landing-layout'
import FAQsSection from '@/features/landing/components/sections/FAQs'
import OurAchievements from '@/features/landing/components/sections/OurAchievements'
import OurTeamSection from '@/features/landing/components/sections/OurTeam'
import TestimonialsCarousel from '@/features/landing/components/sections/TestimonialsCarousel'
import CategorySection from '@/features/landing/components/sections/category'
import { CtaSection } from '@/features/landing/components/sections/cta'
import DiscoverSection from '@/features/landing/components/sections/discover'
import { FeatureSection } from '@/features/landing/components/sections/feature'
import { HeroSection } from '@/features/landing/components/sections/hero'
import Hero2Section from '@/features/landing/components/sections/hero-2'
import { SponsorsSection } from '@/features/landing/components/sections/sponsor'

export const Route = createFileRoute('/landing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LandingPageLayout>
      <HeroSection />

      <div className='container mx-auto mt-32 grid grid-cols-1 gap-32'>
        <SponsorsSection />
        <CategorySection />
        <FeatureSection />
        <CtaSection />
        <DiscoverSection />
      </div>
      <Hero2Section />
      <div className='container mx-auto grid grid-cols-1 gap-32'>
        <OurAchievements />
        <OurTeamSection />
      </div>
      <TestimonialsCarousel />
      <FAQsSection />
    </LandingPageLayout>
  )
}
