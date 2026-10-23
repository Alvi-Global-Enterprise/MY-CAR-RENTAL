import { Link } from 'react-router-dom'
import { Users, Briefcase, Fuel, ArrowRight } from 'lucide-react'
import { getVehiclesByCategory } from '../data/vehicles'
import ScrollReveal from './ScrollReveal'
import Button from './Button'

export default function VehicleCard({
  vehicle,
  category,
  index = 0,
  mode = 'category',
}) {
  const isCategory = mode === 'category'
  const data = isCategory ? category : vehicle
  const to = isCategory ? `/fleet?category=${category.id}` : `/vehicle/${vehicle.id}`
  const categoryFirstVehicle = isCategory ? getVehiclesByCategory(category.id)[0] : null
  const bookTo = isCategory
    ? categoryFirstVehicle
      ? `/reservation?vehicle=${categoryFirstVehicle.id}`
      : null
    : `/reservation?vehicle=${vehicle.id}`
  const title = isCategory ? category.name : vehicle.name
  const price = isCategory ? category.priceFrom : vehicle.pricePerDay
  const image = data.image
  const passengers = data.passengers
  const luggage = data.luggage
  const fuel = data.fuel

  return (
    <ScrollReveal delay={index * 0.07}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/[0.07] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-red/15 hover:shadow-lift">
        <Link to={to} className="relative block aspect-[16/10] overflow-hidden bg-light">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent opacity-60" />
          {isCategory && (
            <span className="absolute left-3 top-3 rounded-lg bg-navy/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white backdrop-blur-sm">
              {category.shortName.toUpperCase()}
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-[15px] font-bold tracking-wide text-navy sm:text-base">
            <Link
              to={to}
              className="transition-colors duration-200 hover:text-red"
            >
              {title}
            </Link>
          </h3>

          <ul className="mt-3.5 flex flex-wrap gap-2">
            <Spec icon={Users} value={passengers} />
            <Spec icon={Briefcase} value={luggage} />
            <Spec icon={Fuel} value={fuel} />
          </ul>

          <div className="mt-4 border-t border-navy/5 pt-4">
            <p className="text-sm text-muted">
              From{' '}
              <span className="text-xl font-extrabold text-red">${price}</span>
              <span className="text-muted"> / day</span>
            </p>
            <p className="mt-1 text-[10px] text-muted/70">Indicative rate</p>
          </div>

          {isCategory ? (
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <Link
                to={to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-all duration-300 hover:gap-2.5"
              >
                View vehicles
                <ArrowRight className="h-4 w-4" />
              </Link>
              {bookTo && (
                <Button to={bookTo} className="px-3.5 py-2 text-xs">
                  Book Now
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-auto flex flex-col gap-3 pt-4">
              <Button to={bookTo} className="w-full" showArrow>
                Book now
              </Button>
              <Link
                to={to}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-navy transition-all duration-300 hover:gap-2.5 hover:text-red"
              >
                View details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </article>
    </ScrollReveal>
  )
}

function Spec({ icon: Icon, value }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-lg bg-light px-2.5 py-1.5 text-xs font-medium text-navy">
      <Icon className="h-3.5 w-3.5 text-red" />
      {value}
    </li>
  )
}
