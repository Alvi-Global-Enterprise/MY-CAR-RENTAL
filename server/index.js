import express from 'express'
import cors from 'cors'
import { sendSiteMail } from './mail.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {}

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' })
  }

  try {
    await sendSiteMail({
      replyTo: email,
      subject: `Contact form — ${name}`,
      text: [
        'New contact form submission',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err.message)
    res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
})

app.post('/api/booking', async (req, res) => {
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
    res.json({ ok: true })
  } catch (err) {
    console.error('Booking email failed:', err.message)
    res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
})

app.post('/api/reservation', async (req, res) => {
  const {
    firstName,
    lastName,
    driverLicense,
    companyName,
    country,
    streetAddress,
    townCity,
    stateCounty,
    phone,
    email,
    vehicleName,
    vehicleId,
    pricePerDay,
  } = req.body || {}

  if (!firstName || !lastName || !phone || !email) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' })
  }

  const fullName = `${firstName} ${lastName}`.trim()

  try {
    await sendSiteMail({
      replyTo: email,
      subject: `Reservation — ${vehicleName || 'Vehicle'} — ${fullName}`,
      text: [
        'New reservation request',
        '',
        'Vehicle',
        `Name: ${vehicleName || '—'}`,
        `ID: ${vehicleId || '—'}`,
        `Rate: ${pricePerDay != null ? `$${pricePerDay}/day` : '—'}`,
        '',
        'Billing details',
        `First name: ${firstName}`,
        `Last name: ${lastName}`,
        `Driver license: ${driverLicense || '—'}`,
        `Company name: ${companyName || '—'}`,
        `Country / Region: ${country || '—'}`,
        `Street address: ${streetAddress || '—'}`,
        `Town / City: ${townCity || '—'}`,
        `State / County: ${stateCounty || '—'}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
      ].join('\n'),
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Reservation email failed:', err.message)
    res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
})

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Mail server running on http://127.0.0.1:${PORT}`)
})

server.on('error', (err) => {
  console.error('Mail server error:', err.message)
  process.exit(1)
})
