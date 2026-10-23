import * as Icons from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function FeatureCard({ title, description, icon, index = 0 }) {
  const Icon = Icons[icon] || Icons.Sparkles

  return (
    <ScrollReveal delay={index * 0.08}>
      <article className="group h-full rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-red/20 hover:shadow-lift sm:p-7">
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy/8 to-navy/4 text-navy transition-all duration-300 group-hover:from-red group-hover:to-red-dark group-hover:text-white group-hover:shadow-md group-hover:shadow-red/25">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h3 className="text-base font-bold text-navy sm:text-[17px]">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
      </article>
    </ScrollReveal>
  )
}
