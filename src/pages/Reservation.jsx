import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  IdCard,
  Building2,
  Globe2,
  ShieldCheck,
  Clock3,
  Car,
  Users,
  Fuel,
  Gauge,
  Calendar,
  CalendarDays,
} from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { business } from '../data/business'
import { getVehicleById, getCategoryById } from '../data/vehicles'
import { todayISO, validateReservationForm } from '../utils/validation'
import { sendReservationEmail } from '../utils/sendFormEmail'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'

const fieldClass =
  'w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-muted/50 focus:border-red focus:ring-2 focus:ring-red/15 disabled:opacity-60'

const emptyForm = {
  location: '',
  pickupDate: '',
  returnDate: '',
  firstName: '',
  lastName: '',
  driverLicense: '',
  companyName: '',
  country: '',
  streetAddress: '',
  townCity: '',
  stateCounty: '',
  phone: '',
  email: '',
}

export default function Reservation() {
  const [searchParams] = useSearchParams()
  const vehicleId = searchParams.get('vehicle')
  const vehicle = vehicleId ? getVehicleById(vehicleId) : null
  const category = vehicle ? getCategoryById(vehicle.categoryId) : null

  usePageTitle(
    'Reservation',
    vehicle
      ? `Reserve ${vehicle.name} with MY CAR RENTAL.`
      : 'Complete your reservation with MY CAR RENTAL.',
  )

  const [form, setForm] = useState({
    ...emptyForm,
    location: searchParams.get('location') || '',
    pickupDate: searchParams.get('pickup') || '',
    returnDate: searchParams.get('return') || '',
  })
  const [errors, setErrors] = useState({})
  const [ready, setReady] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setReady(false)
    setSubmitError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = validateReservationForm(form)
    setErrors(next)
    if (Object.keys(next).length) return

    setSending(true)
    setSubmitError('')
    try {
      await sendReservationEmail({
        ...form,
        vehicleId: vehicle?.id || '',
        vehicleName: vehicle?.name || 'Not specified',
        pricePerDay: vehicle?.pricePerDay ?? null,
      })
      setReady(true)
      setForm(emptyForm)
    } catch (err) {
      setSubmitError(err.message || 'Failed to send reservation.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        label="RESERVATION"
        title={vehicle ? `Reserve ${vehicle.name}` : 'Complete your booking'}
        subtitle="Share your billing details — our team will confirm availability and next steps by email."
      />

      <section className="relative overflow-hidden bg-light section-pad">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 18%, rgba(237,28,46,0.08), transparent 28%), radial-gradient(circle at 88% 8%, rgba(7,29,88,0.08), transparent 32%)',
          }}
        />

        <div className="container-page relative">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to={vehicle ? `/vehicle/${vehicle.id}` : '/fleet'}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy transition hover:text-red"
            >
              <ArrowLeft className="h-4 w-4" />
              {vehicle ? 'Back to vehicle' : 'Back to fleet'}
            </Link>

            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-muted">
              <StepBadge n="1" label="Vehicle" active={!ready} done={Boolean(vehicle)} />
              <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
              <StepBadge n="2" label="Details" active={!ready} />
              <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
              <StepBadge n="3" label="Confirm" active={ready} done={ready} />
            </ol>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start xl:gap-10">
            <ScrollReveal>
              <aside className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-3xl border border-navy/[0.07] bg-white shadow-lift">
                  {vehicle ? (
                    <>
                      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <p className="text-[11px] font-bold tracking-[0.18em] text-red">
                            {category?.shortName?.toUpperCase() || 'VEHICLE'}
                          </p>
                          <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                            {vehicle.name}
                          </h2>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-end justify-between gap-4 border-b border-navy/5 pb-5">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted">
                              Daily rate
                            </p>
                            <p className="mt-1">
                              <span className="text-3xl font-extrabold text-red">
                                ${vehicle.pricePerDay}
                              </span>
                              <span className="text-sm text-muted"> / day</span>
                            </p>
                          </div>
                          <span className="rounded-lg bg-light px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                            Indicative
                          </span>
                        </div>

                        <p className="mt-5 text-sm leading-relaxed text-muted">
                          {vehicle.description}
                        </p>

                        <ul className="mt-5 grid grid-cols-2 gap-2.5">
                          <SpecChip icon={Users} label="Passengers" value={vehicle.passengers} />
                          <SpecChip icon={Gauge} label="Gearbox" value={vehicle.transmission} />
                          <SpecChip icon={Fuel} label="Fuel" value={vehicle.fuel} />
                          <SpecChip icon={Calendar} label="Year" value={vehicle.year} />
                        </ul>

                        <ul className="mt-6 space-y-3 border-t border-navy/5 pt-5">
                          <TrustRow icon={ShieldCheck} text="No payment required on this form" />
                          <TrustRow icon={Clock3} text="We reply to confirm availability" />
                          <TrustRow icon={Car} text="Flexible pickup in Cap-Haitian" />
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="relative overflow-hidden p-7 sm:p-9">
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red/10" />
                      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-navy/5" />
                      <div className="relative">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                          <Car className="h-5 w-5" />
                        </span>
                        <h2 className="mt-5 text-2xl font-extrabold text-navy">Choose a vehicle</h2>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                          Pick a car from the fleet first for a faster confirmation, or still send a
                          general reservation request.
                        </p>
                        <Button to="/fleet" className="mt-6" showArrow>
                          Browse fleet
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              {ready ? (
                <div className="rounded-3xl border border-green-200/80 bg-white p-8 text-center shadow-lift sm:p-12">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold text-navy">Reservation sent</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                    Thanks — your request is with our team. We will email you shortly to confirm
                    availability and finalize the rental.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button to="/fleet" showArrow>
                      Browse more vehicles
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setReady(false)}
                    >
                      Submit another request
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="overflow-hidden rounded-3xl border border-navy/[0.07] bg-white shadow-lift"
                >
                  <div className="border-b border-navy/5 bg-gradient-to-r from-navy/[0.03] via-white to-red/[0.03] px-6 py-6 sm:px-8">
                    <p className="text-xs font-bold tracking-[0.18em] text-red">BILLING DETAILS</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-navy">Your information</h2>
                    <p className="mt-1.5 text-sm text-muted">
                      Fields marked * are required. Optional fields help us prepare your rental faster.
                    </p>
                  </div>

                  <div className="space-y-8 p-6 sm:p-8">
                    <FormSection
                      icon={CalendarDays}
                      title="Rental details"
                      description="Pickup location and dates for your booking."
                    >
                      <Field label="Pickup location *" htmlFor="location" error={errors.location}>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                          <select
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={onChange}
                            className={`${fieldClass} appearance-none pl-10`}
                            required
                            disabled={sending}
                          >
                            <option value="">Select a location</option>
                            {business.pickupLocations.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Pickup date *" htmlFor="pickupDate" error={errors.pickupDate}>
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="pickupDate"
                              type="date"
                              name="pickupDate"
                              min={todayISO()}
                              value={form.pickupDate}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              required
                              disabled={sending}
                            />
                          </div>
                        </Field>
                        <Field label="Return date *" htmlFor="returnDate" error={errors.returnDate}>
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="returnDate"
                              type="date"
                              name="returnDate"
                              min={form.pickupDate || todayISO()}
                              value={form.returnDate}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              required
                              disabled={sending}
                            />
                          </div>
                        </Field>
                      </div>
                    </FormSection>

                    <FormSection
                      icon={User}
                      title="Personal"
                      description="Driver identity for the reservation."
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name *" htmlFor="firstName" error={errors.firstName}>
                          <input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={onChange}
                            className={fieldClass}
                            autoComplete="given-name"
                            required
                            disabled={sending}
                          />
                        </Field>
                        <Field label="Last name *" htmlFor="lastName" error={errors.lastName}>
                          <input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={onChange}
                            className={fieldClass}
                            autoComplete="family-name"
                            required
                            disabled={sending}
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Driver license (optional)" htmlFor="driverLicense">
                          <div className="relative">
                            <IdCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="driverLicense"
                              name="driverLicense"
                              value={form.driverLicense}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              disabled={sending}
                            />
                          </div>
                        </Field>
                        <Field label="Company name (optional)" htmlFor="companyName">
                          <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="companyName"
                              name="companyName"
                              value={form.companyName}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              autoComplete="organization"
                              disabled={sending}
                            />
                          </div>
                        </Field>
                      </div>
                    </FormSection>

                    <FormSection
                      icon={MapPin}
                      title="Address"
                      description="Optional — useful for invoices and delivery."
                    >
                      <Field label="Country / Region (optional)" htmlFor="country">
                        <div className="relative">
                          <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                          <input
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={onChange}
                            className={`${fieldClass} pl-10`}
                            autoComplete="country-name"
                            disabled={sending}
                          />
                        </div>
                      </Field>

                      <Field
                        label="Street address (optional)"
                        htmlFor="streetAddress"
                        hint="House number and street name"
                      >
                        <input
                          id="streetAddress"
                          name="streetAddress"
                          value={form.streetAddress}
                          onChange={onChange}
                          className={fieldClass}
                          autoComplete="street-address"
                          placeholder="House number and street name"
                          disabled={sending}
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Town / City (optional)" htmlFor="townCity">
                          <input
                            id="townCity"
                            name="townCity"
                            value={form.townCity}
                            onChange={onChange}
                            className={fieldClass}
                            autoComplete="address-level2"
                            disabled={sending}
                          />
                        </Field>
                        <Field label="State / County (optional)" htmlFor="stateCounty">
                          <input
                            id="stateCounty"
                            name="stateCounty"
                            value={form.stateCounty}
                            onChange={onChange}
                            className={fieldClass}
                            autoComplete="address-level1"
                            disabled={sending}
                          />
                        </Field>
                      </div>
                    </FormSection>

                    <FormSection
                      icon={Phone}
                      title="Contact"
                      description="We use these to confirm your booking."
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Phone *" htmlFor="phone" error={errors.phone}>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              autoComplete="tel"
                              required
                              disabled={sending}
                            />
                          </div>
                        </Field>
                        <Field label="Email address *" htmlFor="email" error={errors.email}>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={onChange}
                              className={`${fieldClass} pl-10`}
                              autoComplete="email"
                              required
                              disabled={sending}
                            />
                          </div>
                        </Field>
                      </div>
                    </FormSection>

                    <div className="rounded-2xl border border-navy/5 bg-light/80 p-4 sm:p-5">
                      <Button
                        type="submit"
                        className="w-full py-3.5 text-base"
                        showArrow
                        disabled={sending}
                      >
                        {sending ? 'Sending…' : 'Submit reservation'}
                      </Button>
                      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                        By submitting, you request a rental quote. Final terms are confirmed by our team.
                      </p>

                      {submitError && (
                        <p className="mt-3 text-center text-sm text-red" role="alert">
                          {submitError}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}

function StepBadge({ n, label, active = false, done = false }) {
  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 ${
        done
          ? 'bg-green-50 text-green-700'
          : active
            ? 'bg-navy text-white'
            : 'bg-white text-muted ring-1 ring-navy/10'
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          done ? 'bg-green-600 text-white' : active ? 'bg-red text-white' : 'bg-light text-navy'
        }`}
      >
        {done ? '✓' : n}
      </span>
      {label}
    </li>
  )
}

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-base font-bold text-navy">{title}</h3>
          <p className="text-xs text-muted sm:text-sm">{description}</p>
        </div>
      </div>
      <div className="space-y-4 border-l-2 border-navy/5 pl-0 sm:pl-4">{children}</div>
    </section>
  )
}

function SpecChip({ icon: Icon, label, value }) {
  return (
    <li className="rounded-xl border border-navy/5 bg-light px-3 py-2.5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Icon className="h-3.5 w-3.5 text-red" />
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
    </li>
  )
}

function TrustRow({ icon: Icon, text }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-muted">
      <Icon className="h-4 w-4 shrink-0 text-red" />
      {text}
    </li>
  )
}

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {hint && <p className="mb-1.5 text-xs text-muted">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1 text-xs text-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
