import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqItems } from '../data/faq'
import ScrollReveal from './ScrollReveal'

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  const left = faqItems.slice(0, Math.ceil(faqItems.length / 2))
  const right = faqItems.slice(Math.ceil(faqItems.length / 2))

  return (
    <section className="section-pad bg-white" id="faq">
      <div className="container-page">
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">QUESTIONS</p>
          <h2 className="section-title">FAQ</h2>
          <p className="section-sub">
            Sample answers — confirm according to your official policy.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {[left, right].map((column, colIdx) => (
            <div key={colIdx} className="space-y-3">
              {column.map((item, i) => {
                const isOpen = openId === item.id
                return (
                  <ScrollReveal key={item.id} delay={(colIdx * 3 + i) * 0.04}>
                    <div
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? 'border-red/20 bg-white shadow-soft'
                          : 'border-navy/8 bg-light hover:border-navy/15'
                      }`}
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6 sm:py-5"
                        aria-expanded={isOpen}
                        onClick={() => toggle(item.id)}
                      >
                        <span className="text-sm font-semibold text-navy sm:text-[15px]">
                          {item.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                            isOpen ? 'bg-red text-white' : 'bg-white text-red shadow-sm'
                          }`}
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
