import ScrollReveal from './ScrollReveal'
import { business } from '../data/business'

export default function CTABanner() {
  return (
    <section className="w-full overflow-hidden bg-navy" aria-label="Promotional banner">
      <ScrollReveal>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
        >
          <img
            src="/ctabannerone.png"
            alt="MY CAR RENTAL — Your next adventure starts here. Book now."
            loading="lazy"
            className="h-auto w-full object-cover object-center transition duration-500 group-hover:scale-[1.01]"
          />
          <span className="pointer-events-none absolute inset-0 bg-navy/0 transition group-hover:bg-navy/5" />
        </a>
      </ScrollReveal>
    </section>
  )
}
