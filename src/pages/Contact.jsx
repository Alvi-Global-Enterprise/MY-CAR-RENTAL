import { useState } from 'react'
import { MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { business } from '../data/business'
import { validateContactForm } from '../utils/validation'
import { sendContactEmail } from '../utils/sendFormEmail'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import WhatsAppIcon from '../components/WhatsAppIcon'

const fieldClass =
  'w-full rounded-xl border border-navy/10 bg-light px-4 py-3 text-sm text-navy outline-none transition focus:border-red focus:bg-white focus:ring-2 focus:ring-red/15'

export default function Contact() {
  usePageTitle('Contact', 'Contact MY CAR RENTAL in Cap-Haitian via WhatsApp or the form.')

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
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
    const next = validateContactForm(form)
    setErrors(next)
    if (Object.keys(next).length) return

    setSending(true)
    setSubmitError('')
    try {
      await sendContactEmail(form)
      setReady(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setSubmitError(err.message || 'Failed to send message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        label="CONTACT"
        title="Let's talk about your rental"
        subtitle="Write to us or contact us directly on WhatsApp."
      />

      <section className="bg-light section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-navy">Contact details</h2>
              <ul className="mt-6 space-y-4">
                {business.phones.map((phone) => {
                  const isWhatsApp = phone.type === 'whatsapp'
                  return (
                    <ContactRow
                      key={phone.e164}
                      icon={isWhatsApp ? WhatsAppIcon : Phone}
                      label={phone.label}
                      value={phone.display}
                      href={phone.href}
                      iconClass={isWhatsApp ? 'text-[#25D366]' : 'text-red'}
                      external={isWhatsApp}
                    />
                  )
                })}
                <ContactRow icon={MapPin} label="Area" value={business.address} />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={business.email}
                  href={`mailto:${business.email}`}
                />
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8"
            >
              <h2 className="text-xl font-bold text-navy">Send a request</h2>
              <p className="mt-1 text-sm text-muted">
                Your message will be sent to our team by email.
              </p>

              <div className="mt-6 space-y-4">
                <Field label="Full name" htmlFor="name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className={fieldClass}
                    autoComplete="name"
                    required
                    disabled={sending}
                  />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={fieldClass}
                    autoComplete="email"
                    required
                    disabled={sending}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={fieldClass}
                    autoComplete="tel"
                    required
                    disabled={sending}
                  />
                </Field>
                <Field label="Message" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    className={`${fieldClass} resize-y`}
                    required
                    disabled={sending}
                  />
                </Field>

                <Button type="submit" className="w-full" showArrow disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </Button>

                {submitError && (
                  <p className="text-sm text-red" role="alert">
                    {submitError}
                  </p>
                )}

                {ready && (
                  <p className="inline-flex items-center gap-2 text-sm text-green-700" role="status">
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent successfully. We will get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
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

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  iconClass = 'text-red',
  external = false,
}) {
  const content = (
    <>
      <span className={`mt-0.5 ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs text-muted">{label}</span>
        <span className="font-medium text-navy">{value}</span>
      </span>
    </>
  )

  if (href) {
    return (
      <li>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex items-start gap-3 transition hover:opacity-80"
        >
          {content}
        </a>
      </li>
    )
  }

  return <li className="flex items-start gap-3">{content}</li>
}
