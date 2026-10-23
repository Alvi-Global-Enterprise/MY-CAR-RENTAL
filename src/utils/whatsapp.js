import { business } from '../data/business'

export function buildWhatsAppUrl({
  vehicleName,
  category,
  pickupLocation,
  pickupDate,
  returnDate,
  message,
} = {}) {
  const lines = [
    'Hello MY CAR RENTAL,',
    '',
    'I would like information about a rental:',
  ]

  if (vehicleName) lines.push(`• Vehicle: ${vehicleName}`)
  if (category) lines.push(`• Category: ${category}`)
  if (pickupLocation) lines.push(`• Location: ${pickupLocation}`)
  if (pickupDate) lines.push(`• Pickup: ${pickupDate}`)
  if (returnDate) lines.push(`• Return: ${returnDate}`)
  if (message) {
    lines.push('', message)
  }
  lines.push('', 'Thank you!')

  const text = encodeURIComponent(lines.join('\n'))
  return `${business.whatsappUrl}?text=${text}`
}

export function openWhatsApp(params) {
  window.open(buildWhatsAppUrl(params), '_blank', 'noopener,noreferrer')
}
