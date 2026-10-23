import { usePageTitle } from '../hooks/usePageTitle'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'

const sections = [
  {
    title: 'Agreement',
    body: [
      'These Rental Terms and Conditions, any documents signed by you or to which you have electronically consented, any documents or agreements (or links to online documents or agreements) sent to you electronically in connection with your rental, the Privacy Notice, and a return record with the computed rental charges together constitute the rental agreement (collectively, “Agreement”) between you and MyCar Rental, and any affiliate conducting business (“MyCar Rental”).',
      '“We”, “our”, and “us” means MyCar, and “you” and “your” means the person who signs the Agreement. You agree that you are not our agent for any purpose and that you cannot assign or transfer your obligations under this Agreement. You rent from us the Vehicle described in the Agreement, which rental is solely a bailment for mutual benefit.',
      'By renting a Vehicle from MyCar Rental, you agree to these Rental Terms and Conditions, if such term is not prohibited by Applicable Law of a jurisdiction covering this rental, in which case such law controls. You agree that failure to comply with these Rental Terms and Conditions will constitute a breach of the Agreement.',
      'If you breach the Agreement, we may exercise all remedies permitted to us under this Agreement or by law, which include but are not limited to terminating the current rental, refusing to enter future rental agreements with you, and/or asserting claims against you for any damages we incur because of your breach.',
    ],
  },
  {
    title: 'No Smoking or Vaping',
    body: [
      'We maintain a 100% smoke-free fleet. No one may smoke or vape any substance inside or immediately surrounding the Vehicle. If, in our sole discretion, we determine the Vehicle smells of smoke, vape or any other substance, we may charge you a fee.',
    ],
  },
  {
    title: 'When to Return the Vehicle',
    body: [
      'You must return the Vehicle in the same condition you received it, ordinary wear and tear excepted, at the Designated Return Time identified in the Agreement. You must return it sooner on our demand. If you return it late, a higher rental rate may apply and, if returned later, you may also be charged a late return fee. You may return the Vehicle to the same location where you picked it up.',
    ],
  },
]

export default function Terms() {
  usePageTitle(
    'Rental Terms and Conditions',
    'Read the rental terms and conditions for MY CAR RENTAL.',
  )

  return (
    <>
      <PageHero
        label="LEGAL"
        title="Rental Terms and Conditions"
        subtitle="Please read these terms carefully before renting a vehicle with MY CAR RENTAL."
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
