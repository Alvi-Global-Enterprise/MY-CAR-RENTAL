import { usePageTitle } from '../hooks/usePageTitle'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import { business } from '../data/business'

export default function About() {
  usePageTitle(
    'About',
    'Discover MY CAR RENTAL — reliable car rental in Cap-Haitian, Haiti.',
  )

  return (
    <>
      <PageHero
        label="ABOUT"
        title="MY CAR RENTAL"
        subtitle={business.tagline}
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <img
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1000&q=80"
              alt="MY CAR RENTAL vehicle"
              loading="lazy"
              className="w-full rounded-2xl object-cover shadow-card"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl font-extrabold text-navy">Our mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              MY CAR RENTAL supports travelers and residents in Cap-Haitian with a recent fleet,
              clear pricing, and personalized WhatsApp service. Our priority: helping you{' '}
              <strong className="font-semibold text-navy">drive in complete safety</strong>.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Whether you need an economy car for the city, a family SUV, or a premium vehicle
              for a special occasion, our team helps you find the right solution.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-navy">
              <li>• Address: {business.address}</li>
              <li>• Service area: {business.serviceArea}</li>
              <li>• Pickup & drop-off: {business.pickupLocations.join(' · ')}</li>
              <li>
                • WhatsApp: {business.phones.find((p) => p.type === 'whatsapp')?.display}
              </li>
              <li>
                • Call:{' '}
                {business.phones
                  .filter((p) => p.type === 'call')
                  .map((p) => p.display)
                  .join(' · ')}
              </li>
              <li>• Email: {business.email}</li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
    </>
  )
}
