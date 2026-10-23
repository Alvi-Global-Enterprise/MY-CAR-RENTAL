import { business } from '../data/business'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton({
  className = '',
  label = 'WhatsApp',
  params,
  floating = false,
}) {
  const href = params ? buildWhatsAppUrl(params) : business.whatsappUrl

  if (floating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-medium text-[#25D366] transition hover:opacity-80 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  )
}
