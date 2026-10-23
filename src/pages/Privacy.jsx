import { usePageTitle } from '../hooks/usePageTitle'
import { business } from '../data/business'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

const sections = [
  {
    title: 'Overview',
    body: [
      `This Privacy Policy explains how ${business.name} (“we”, “our”, or “us”) collects, uses, and protects information when you visit our website, contact us, or rent a vehicle. This page is provided as a sample notice and may be updated as our practices evolve.`,
    ],
  },
  {
    title: 'Information We Collect',
    body: [
      'We may collect information you provide directly, such as your name, phone number, email address, rental dates, preferred vehicle, and messages sent through our contact form or WhatsApp.',
      'We may also collect basic technical information such as browser type, device information, and pages visited, to help us operate and improve the website.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use your information to respond to inquiries, prepare rental quotes, confirm bookings, communicate about pick-up and return, and provide customer support.',
      'We do not sell your personal information. We may share limited details with service providers who help us operate the business (for example, messaging or hosting tools), only as needed to provide our services.',
    ],
  },
  {
    title: 'Data Retention & Security',
    body: [
      'We keep rental and contact information only as long as reasonably needed for business, legal, or customer-service purposes. We take reasonable measures to protect information against unauthorized access, loss, or misuse.',
    ],
  },
  {
    title: 'Your Choices & Contact',
    body: [
      `If you have questions about this Privacy Policy or want to update or request deletion of information you shared with us, contact us at ${business.email} or via WhatsApp at ${business.phoneDisplay}.`,
    ],
  },
]

export default function Privacy() {
  usePageTitle('Privacy Policy', `How ${business.name} handles your personal information.`)

  return (
    <>
      <PageHero
        label="LEGAL"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
      />

      <section className="bg-light section-pad">
        <div className="container-page max-w-3xl">
          <ScrollReveal>
            <div className="space-y-8 rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              {sections.map((section) => (
                <article key={section.title}>
                  <h2 className="text-xl font-extrabold text-navy sm:text-2xl">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-sm leading-relaxed text-muted sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
