import { sendSiteMail } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const { location, pickupDate, returnDate, vehicleType } = req.body || {}

  if (!location || !pickupDate || !returnDate || !vehicleType) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' })
  }

  try {
    await sendSiteMail({
      subject: `Booking search — ${vehicleType}`,
      text: [
        'New booking / search form submission',
        '',
        `Pickup location: ${location}`,
        `Pickup date: ${pickupDate}`,
        `Return date: ${returnDate}`,
        `Vehicle type: ${vehicleType}`,
      ].join('\n'),
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Booking email failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
}
