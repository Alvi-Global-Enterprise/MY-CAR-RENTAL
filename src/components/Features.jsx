import { featureCards } from '../data/features'
import FeatureCard from './FeatureCard'

export default function Features() {
  return (
    <section className="relative z-10 -mt-6 pb-2 sm:-mt-8" aria-label="Benefits">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {featureCards.map((item, i) => (
          <FeatureCard key={item.id} {...item} index={i} />
        ))}
      </div>
    </section>
  )
}
