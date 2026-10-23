import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, MapPin, CalendarDays } from 'lucide-react'
import { business } from '../data/business'
import { vehicleCategories } from '../data/vehicles'
import { todayISO, validateBookingForm } from '../utils/validation'
import { sendBookingEmail } from '../utils/sendFormEmail'
import Button from './Button'

const fieldClass =
  'w-full rounded-xl border border-navy/10 bg-light px-4 py-3 text-sm text-navy outline-none transition focus:border-red focus:bg-white focus:ring-2 focus:ring-red/15'

export default function BookingForm({ compact = false, initial = {} }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    location: initial.location || '',
    pickupDate: initial.pickupDate || '',
    returnDate: initial.returnDate || '',
    vehicleType: initial.vehicleType || '',
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setSubmitError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateBookingForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSending(true)
    setSubmitError('')
    try {
      const category = vehicleCategories.find((c) => c.id === form.vehicleType)
      await sendBookingEmail({
        location: form.location,
        pickupDate: form.pickupDate,
        returnDate: form.returnDate,
        vehicleType: category?.shortName || form.vehicleType,
      })

      const params = new URLSearchParams({
        location: form.location,
        pickup: form.pickupDate,
        return: form.returnDate,
        category: form.vehicleType,
      })
      navigate(`/fleet?${params.toString()}`)
    } catch (err) {
      setSubmitError(err.message || 'Failed to send request.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-navy/[0.06] bg-white shadow-lift ring-1 ring-black/[0.02] ${
        compact ? 'p-5' : 'p-6 sm:p-8'
      }`}
      noValidate
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white shadow-sm shadow-red/30">
          <Car className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-navy sm:text-xl">Book your car</h2>
          <p className="text-xs text-muted">Quick search · WhatsApp reply</p>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Pickup location" error={errors.location} htmlFor="location">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={onChange}
              className={`${fieldClass} appearance-none pl-10`}
              required
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
          <Field label="Pickup date" error={errors.pickupDate} htmlFor="pickupDate">
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="pickupDate"
                type="date"
                name="pickupDate"
                min={todayISO()}
                value={form.pickupDate}
                onChange={onChange}
                className={`${fieldClass} pl-10`}
                required
              />
            </div>
          </Field>

          <Field label="Return date" error={errors.returnDate} htmlFor="returnDate">
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="returnDate"
                type="date"
                name="returnDate"
                min={form.pickupDate || todayISO()}
                value={form.returnDate}
                onChange={onChange}
                className={`${fieldClass} pl-10`}
                required
              />
            </div>
          </Field>
        </div>

        <Field label="Vehicle type" error={errors.vehicleType} htmlFor="vehicleType">
          <select
            id="vehicleType"
            name="vehicleType"
            value={form.vehicleType}
            onChange={onChange}
            className={fieldClass}
            required
          >
            <option value="">Select a type</option>
            {vehicleCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.shortName}
              </option>
            ))}
          </select>
        </Field>

        <Button type="submit" className="mt-1 w-full py-3.5 text-base" showArrow disabled={sending}>
          {sending ? 'Sending…' : 'Search for a car'}
        </Button>
        {submitError && (
          <p className="text-xs text-red" role="alert">
            {submitError}
          </p>
        )}
      </div>
    </form>
  )
}

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
