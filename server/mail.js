import nodemailer from 'nodemailer'

/** Gmail SMTP — use env vars on Vercel; local fallbacks for `npm run dev`. */
export const SMTP = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  user: process.env.SMTP_USER || 'areebahmed581@gmail.com',
  pass: process.env.SMTP_PASS || 'uurp vkjw wweg nprx',
  to: process.env.SMTP_TO || 'mycarrentalhaiti@gmail.com',
}

export const transporter = nodemailer.createTransport({
  host: SMTP.host,
  port: SMTP.port,
  secure: SMTP.secure,
  auth: {
    user: SMTP.user,
    pass: String(SMTP.pass).replace(/\s+/g, ''),
  },
})

export async function sendSiteMail({ to = SMTP.to, replyTo, subject, text }) {
  return transporter.sendMail({
    from: `"MY CAR RENTAL Website" <${SMTP.user}>`,
    to,
    replyTo,
    subject,
    text,
  })
}
