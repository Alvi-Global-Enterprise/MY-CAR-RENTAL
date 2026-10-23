import { usePageTitle } from '../hooks/usePageTitle'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import VehicleGrid from '../components/VehicleGrid'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import FAQAccordion from '../components/FAQAccordion'

export default function Home() {
  usePageTitle(
    'Home',
    'MY CAR RENTAL — Car rental in Cap-Haitian, Haiti. Recent vehicles and reliable service.',
  )

  return (
    <>
      <HeroSection />
      <Features />
      <VehicleGrid />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <FAQAccordion />
    </>
  )
}
