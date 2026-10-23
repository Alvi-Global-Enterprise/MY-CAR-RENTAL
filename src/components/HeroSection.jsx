import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { heroContent } from '../data/business'
import { useReducedMotion } from '../hooks/useReducedMotion'
import BookingForm from './BookingForm'
import Button from './Button'

export default function HeroSection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-light">
      <div className="absolute inset-0">
        <img
          src={heroContent.image}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Dark wash on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/40 to-transparent sm:from-navy/70 sm:via-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent lg:hidden" />
      </div>

      <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:py-20 xl:py-24">
        <motion.div
          className="max-w-xl"
          initial={reduced ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-white backdrop-blur-sm sm:text-xs">
            {heroContent.label}
          </p>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
            <span className="block">{heroContent.titleBefore}</span>
            <span className="mt-1 block text-red sm:mt-2">{heroContent.titleAccent}</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#reserver" showArrow className="w-full px-7 py-3.5 text-[15px] sm:w-auto">
              Book now
            </Button>
            <Button
              to="/fleet"
              variant="white"
              showArrow
              className="w-full px-7 py-3.5 text-[15px] sm:w-auto"
            >
              View our vehicles
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {heroContent.checks.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm ring-1 ring-white/20"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-red" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          id="reserver"
          className="scroll-mt-36 w-full max-w-[400px] justify-self-center lg:max-w-[420px] lg:justify-self-end"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <BookingForm />
        </motion.div>
      </div>
    </section>
  )
}
