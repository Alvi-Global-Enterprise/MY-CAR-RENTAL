import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { vehicleCategories, filterVehicles } from '../data/vehicles'
import { business } from '../data/business'
import PageHero from '../components/PageHero'
import VehicleCard from '../components/VehicleCard'
import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'

export default function Fleet() {
  usePageTitle('Our fleet', 'Discover our economy, sedan, SUV, and luxury vehicles in Cap-Haitian.')
  const [params] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [loading, setLoading] = useState(true)

  const location = params.get('location') || ''
  const pickup = params.get('pickup') || ''
  const ret = params.get('return') || ''

  useEffect(() => {
    const cat = params.get('category')
    if (cat) setCategory(cat)
  }, [params])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [category, location, pickup, ret])

  const results = useMemo(
    () =>
      filterVehicles({
        category: category === 'all' ? undefined : category,
        location,
        pickupDate: pickup,
        returnDate: ret,
      }),
    [category, location, pickup, ret],
  )

  return (
    <>
      <PageHero
        label="OUR FLEET"
        title="All our vehicles"
        subtitle="Filter by category and find the ideal car for your stay in Cap-Haitian."
      />

      <section className="bg-light section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-[300px_1fr] xl:gap-10">
          <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
            <ScrollReveal>
              <div className="rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-soft sm:p-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-navy">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                  <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
                    All
                  </FilterChip>
                  {vehicleCategories.map((cat) => (
                    <FilterChip
                      key={cat.id}
                      active={category === cat.id}
                      onClick={() => setCategory(cat.id)}
                    >
                      {cat.shortName}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <BookingForm
                compact
                initial={{
                  location,
                  pickupDate: pickup,
                  returnDate: ret,
                  vehicleType: category !== 'all' ? category : '',
                }}
              />
            </ScrollReveal>
          </aside>

          <div>
            {(location || pickup || ret) && (
              <p className="mb-4 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm text-muted">
                Search:{' '}
                <span className="font-medium text-navy">
                  {[location, pickup && `from ${pickup}`, ret && `to ${ret}`]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </p>
            )}

            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 animate-pulse rounded-2xl bg-white/80"
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
                <SearchX className="mb-3 h-10 w-10 text-muted" />
                <h3 className="text-lg font-bold text-navy">No vehicles found</h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Try another category or contact us on WhatsApp for personalized availability.
                </p>
                <a
                  href={business.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-red hover:underline"
                >
                  Contact on WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((vehicle, i) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} mode="vehicle" index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
        active
          ? 'bg-red text-white shadow-sm'
          : 'bg-light text-navy hover:bg-navy/5 lg:w-full'
      }`}
    >
      {children}
    </button>
  )
}
