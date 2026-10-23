import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import ScrollReveal from './ScrollReveal'

export default function Testimonials() {
  return (
    <section className="section-pad bg-light" id="avis">
      <div className="container-page">
        <ScrollReveal className="mx-auto mb-4 max-w-2xl text-center">
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="section-title">They trust us</h2>
          <p className="section-sub">
            Sample customer feedback — replace with verified reviews.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                <Quote
                  className="absolute right-5 top-5 h-12 w-12 text-red/10 transition group-hover:text-red/20"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.avatar}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-light"
                  />
                  <div>
                    <h3 className="font-bold text-navy">{item.name}</h3>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{item.text}&rdquo;
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
