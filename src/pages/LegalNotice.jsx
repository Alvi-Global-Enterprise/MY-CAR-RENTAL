import { usePageTitle } from '../hooks/usePageTitle'
import { business } from '../data/business'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

const sections = [
  {
    title: 'Publisher',
    body: [
      `This website is published by ${business.name}, operating in ${business.serviceArea}. Contact: ${business.email}. Phone / WhatsApp: ${business.phoneDisplay}. Address: ${business.address}.`,
    ],
  },
  {
    title: 'Purpose of the Website',
    body: [
      'This website presents our vehicle rental offer, fleet information, and contact channels. Vehicle availability, rates, and conditions are confirmed at the time of booking and may change without prior notice on this website.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      `All content on this website (text, logos, images, layout, and design elements) is protected. You may not copy, reproduce, or redistribute any part of the site without prior written permission from ${business.name}, except for personal, non-commercial viewing.`,
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'We strive to keep information accurate and up to date, but we do not guarantee that all content is complete, current, or error-free. Use of this website is at your own risk. We are not liable for indirect damages arising from access to or use of this site.',
      'External links (including social media or messaging apps) are provided for convenience. We are not responsible for the content or practices of third-party sites.',
    ],
  },
  {
    title: 'Governing Information',
    body: [
      'This Legal Notice is a sample informational page for the website. For rental-specific rules, please also review our Rental Terms and Conditions and Privacy Policy.',
    ],
  },
]

export default function LegalNotice() {
  usePageTitle('Legal Notice', `Legal information about the ${business.name} website.`)

  return (
    <>
      <PageHero
        label="LEGAL"
        title="Legal Notice"
        subtitle="Publisher details and legal information for this website."
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
