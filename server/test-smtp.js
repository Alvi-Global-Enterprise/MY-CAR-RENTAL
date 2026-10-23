import nodemailer from 'nodemailer'

const attempts = [
  {
    label: '465 secure mycarrentalhaiti',
    config: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: 'mycarrentalhaiti@gmail.com', pass: 'uurpvkjwwwegnprx' },
    },
  },
  {
    label: '587 starttls mycarrentalhaiti',
    config: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: 'mycarrentalhaiti@gmail.com', pass: 'uurpvkjwwwegnprx' },
    },
  },
  {
    label: 'service gmail mycarrentalhaiti',
    config: {
      service: 'gmail',
      auth: { user: 'mycarrentalhaiti@gmail.com', pass: 'uurpvkjwwwegnprx' },
    },
  },
]

for (const attempt of attempts) {
  try {
    const transporter = nodemailer.createTransport(attempt.config)
    await transporter.verify()
    console.log(`OK: ${attempt.label}`)
  } catch (e) {
    console.log(`FAIL: ${attempt.label}`)
    console.log(`  ${e.message}`)
  }
}
