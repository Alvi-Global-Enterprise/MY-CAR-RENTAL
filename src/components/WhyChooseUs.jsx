import * as Icons from 'lucide-react'
import { whyChooseUs } from '../data/features'
import ScrollReveal from './ScrollReveal'

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-light" id="pourquoi">
      <div className="container-page">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-label">OUR STRENGTHS</p>
          <h2 className="section-title">Why choose us?</h2>
          <p className="section-sub">
            Simple, transparent rentals tailored to your needs in Cap-Haitian.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {whyChooseUs.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Star
            return (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <article className="group rounded-2xl border border-transparent bg-white/60 p-6 text-center transition-all duration-300 hover:border-navy/5 hover:bg-white hover:shadow-soft">
                  <span className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red text-white shadow-md shadow-red/25 transition duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red/30">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-bold text-navy sm:text-lg">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
