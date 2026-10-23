import { sendSiteMail } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

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
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
}
