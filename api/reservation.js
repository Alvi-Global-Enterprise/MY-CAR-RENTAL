import { sendSiteMail } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

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
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Reservation email failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
}
