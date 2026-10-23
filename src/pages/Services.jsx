import * as Icons from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { services } from '../data/services'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import ScrollReveal from '../components/ScrollReveal'

export default function Services() {
  usePageTitle(
    'Services',
    'Airport pickup, long-term rental, family and luxury vehicles in Cap-Haitian.',
  )

  return (
    <>
      <PageHero
        label="SERVICES"
        title="Our rental services"
        subtitle="Flexible solutions for individuals, families, and professionals in Cap-Haitian."
      />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Sparkles
            return (
              <ScrollReveal key={item.id} delay={i * 0.06}>
                <article className="group h-full rounded-2xl border border-navy/[0.07] bg-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red/20 hover:bg-white hover:shadow-lift sm:p-7">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white transition group-hover:bg-red">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="text-lg font-bold text-navy">{item.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
