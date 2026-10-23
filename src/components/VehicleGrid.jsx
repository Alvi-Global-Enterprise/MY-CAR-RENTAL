import { featuredCategories } from '../data/vehicles'
import VehicleCard from './VehicleCard'
import Button from './Button'
import ScrollReveal from './ScrollReveal'

export default function VehicleGrid({
  title = 'Discover our vehicles',
  label = 'OUR FLEET',
  description = 'A wide selection of cars for every need and every budget.',
  showAllLink = true,
  categories = featuredCategories,
}) {
  return (
    <section className="section-pad bg-white" id="flotte">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal>
            <p className="section-label">{label}</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-sub max-w-xl">{description}</p>
          </ScrollReveal>
          {showAllLink && (
            <ScrollReveal delay={0.1}>
              <Button to="/fleet" variant="outline" showArrow>
                View full fleet
              </Button>
            </ScrollReveal>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, i) => (
            <VehicleCard key={category.id} category={category} mode="category" index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
