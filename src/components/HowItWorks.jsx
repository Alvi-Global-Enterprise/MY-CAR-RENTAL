import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { howItWorks } from '../data/features'
import ScrollReveal from './ScrollReveal'

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white" id="comment">
      <div className="container-page">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-label">PROCESS</p>
          <h2 className="section-title">How it works</h2>
          <p className="section-sub">
            Four simple steps to rent your car in Cap-Haitian.
          </p>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {howItWorks.map((item, i) => {
            const Icon = Icons[item.icon] || Icons.Circle
            const isLast = i === howItWorks.length - 1
            return (
              <ScrollReveal key={item.step} delay={i * 0.08} className="relative">
                <article className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red text-2xl font-extrabold text-white shadow-md shadow-red/25">
                      {item.step}
                    </span>
                    <span className="absolute -bottom-2 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-navy text-white shadow-sm">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-navy sm:text-lg">{item.title}</h3>
                  <p className="mt-2.5 max-w-[220px] text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
                {!isLast && (
                  <div
                    className="absolute right-0 top-9 hidden w-8 translate-x-1/2 items-center justify-center lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5 text-red/35" />
                  </div>
                )}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
