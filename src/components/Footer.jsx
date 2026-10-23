import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'
import { business } from '../data/business'
import { vehicleCategories } from '../data/vehicles'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'

function FacebookIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 8h2.5V5.5H14c-1.9 0-3.5 1.6-3.5 3.5v1.5H8.5V13H10.5v6h3v-6H16l.5-2.5H13.5V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

function InstagramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .56.04.82.12v-3.52a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div>
          <Logo variant="footer" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Car rental in Cap-Haitian, Haiti. Recent vehicles, reliable service, and WhatsApp
            support so you can drive in complete safety.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            <a
              href={business.social.facebook}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-red"
              aria-label="Facebook (link to confirm)"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={business.social.instagram}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-red"
              aria-label="Instagram (link to confirm)"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={business.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-red"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href={business.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#1ebe57]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Quick links</h3>
          <ul className="mt-5 space-y-3">
            {business.navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-white/65 transition hover:text-white hover:translate-x-0.5 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Our services</h3>
          <ul className="mt-5 space-y-3">
            {vehicleCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/fleet?category=${cat.id}`}
                  className="inline-block text-sm text-white/65 transition hover:text-white"
                >
                  {cat.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h3>
          <ul className="mt-5 space-y-3.5 text-sm text-white/65">
            {business.phones.map((phone) => {
              const isWhatsApp = phone.type === 'whatsapp'
              return (
                <li key={phone.e164}>
                  <a
                    href={phone.href}
                    {...(isWhatsApp
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-start gap-2.5 transition hover:text-white"
                  >
                    {isWhatsApp ? (
                      <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                    ) : (
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                    )}
                    {phone.display}
                  </a>
                </li>
              )
            })}
            <li className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              <span>{business.address}</span>
            </li>
            <li>
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-start gap-2.5 transition hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                <span className="break-all">{business.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {year} MY CAR RENTAL. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/legal" className="transition hover:text-white">
              Legal Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
