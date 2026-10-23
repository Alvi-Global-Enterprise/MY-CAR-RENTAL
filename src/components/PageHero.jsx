import ScrollReveal from './ScrollReveal'

export default function PageHero({ title, subtitle, label }) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-20">
      <div className="absolute inset-0 opacity-25">
        <img
          src="/herosectionbg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy-secondary/85" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/40 to-transparent" />
      <div className="container-page relative">
        <ScrollReveal>
          {label && <p className="mb-3 text-xs font-bold tracking-[0.2em] text-red">{label}</p>}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {subtitle}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
