import { Link, useParams } from 'react-router-dom'
import {
  Users,
  Briefcase,
  Fuel,
  Calendar,
  Gauge,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { getVehicleById, getCategoryById } from '../data/vehicles'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import Button from '../components/Button'
import VehicleGallery from '../components/VehicleGallery'
import ScrollReveal from '../components/ScrollReveal'

export default function VehicleDetail() {
  const { id } = useParams()
  const vehicle = getVehicleById(id)
  const category = vehicle ? getCategoryById(vehicle.categoryId) : null

  usePageTitle(
    vehicle?.name || 'Vehicle',
    vehicle
      ? `${vehicle.name} — rent from $${vehicle.pricePerDay}/day in Cap-Haitian.`
      : 'Vehicle not found',
  )

  if (!vehicle) {
    return (
      <section className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">Vehicle not found</h1>
        <p className="mt-2 text-muted">This vehicle does not exist or is no longer available.</p>
        <Button to="/fleet" className="mt-6" showArrow>
          Back to fleet
        </Button>
      </section>
    )
  }

  const waUrl = buildWhatsAppUrl({
    vehicleName: vehicle.name,
    category: category?.shortName,
  })

  return (
    <section className="bg-light py-10 lg:py-14">
      <div className="container-page">
        <Link
          to="/fleet"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-red"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to fleet
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <VehicleGallery
              name={vehicle.name}
              image={vehicle.image}
              images={vehicle.images}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xs font-semibold tracking-[0.16em] text-red">
              {category?.name || 'VEHICLE'}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">{vehicle.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {vehicle.description}
            </p>

            <p className="mt-6">
              <span className="text-3xl font-extrabold text-red">${vehicle.pricePerDay}</span>
              <span className="text-muted"> / day</span>
            </p>
            <p className="text-xs text-muted">Demo indicative rate — non-contractual.</p>

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Spec icon={Users} label="Passengers" value={vehicle.passengers} />
              <Spec icon={Briefcase} label="Luggage" value={vehicle.luggage} />
              <Spec icon={Fuel} label="Fuel" value={vehicle.fuel} />
              <Spec icon={Gauge} label="Transmission" value={vehicle.transmission} />
              <Spec icon={Calendar} label="Year" value={vehicle.year} />
            </ul>

            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">Features</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((f) => (
                  <li key={f} className="inline-flex items-center gap-2 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 text-red" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to={`/reservation?vehicle=${vehicle.id}`} showArrow>
                Book now
              </Button>
              <Button href={waUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                Inquire on WhatsApp
              </Button>
              <Button to="/fleet" variant="outline">
                View other vehicles
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Spec({ icon: Icon, label, value }) {
  return (
    <li className="rounded-xl border border-navy/8 bg-white px-3 py-3">
      <Icon className="mb-1 h-4 w-4 text-red" />
      <p className="text-[11px] text-muted">{label}</p>
      <p className="text-sm font-semibold text-navy">{value}</p>
    </li>
  )
}
