import { useState } from 'react'
import { Save } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'

const inputClass = 'admin-input'

export default function SettingsAdmin() {
  const { settings, setSettings, showToast } = useAdmin()
  const [form, setForm] = useState(settings)

  const onSave = (e) => {
    e.preventDefault()
    setSettings(form)
    showToast('Settings saved')
  }

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        subtitle="Business details shown across the website."
      />

      <form onSubmit={onSave} className="mx-auto max-w-3xl space-y-6">
        <Section title="Business profile">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Business name">
              <input className={inputClass} value={form.businessName} onChange={set('businessName')} />
            </Field>
            <Field label="Tagline">
              <input className={inputClass} value={form.tagline} onChange={set('tagline')} />
            </Field>
            <Field label="Service area">
              <input className={inputClass} value={form.serviceArea} onChange={set('serviceArea')} />
            </Field>
            <Field label="Email">
              <input type="email" className={inputClass} value={form.email} onChange={set('email')} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address">
                <input className={inputClass} value={form.address} onChange={set('address')} />
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Contact numbers">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="WhatsApp">
              <input className={inputClass} value={form.phoneWhatsApp} onChange={set('phoneWhatsApp')} />
            </Field>
            <Field label="Call line 1">
              <input className={inputClass} value={form.phoneCall1} onChange={set('phoneCall1')} />
            </Field>
            <Field label="Call line 2">
              <input className={inputClass} value={form.phoneCall2} onChange={set('phoneCall2')} />
            </Field>
          </div>
        </Section>

        <Section title="Social & announcement">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Facebook">
              <input className={inputClass} value={form.facebook} onChange={set('facebook')} />
            </Field>
            <Field label="Instagram">
              <input className={inputClass} value={form.instagram} onChange={set('instagram')} />
            </Field>
            <Field label="TikTok">
              <input className={inputClass} value={form.tiktok} onChange={set('tiktok')} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Announcement bar text">
                <input className={inputClass} value={form.announcement} onChange={set('announcement')} />
              </Field>
            </div>
          </div>
        </Section>

        <div className="flex justify-end">
          <button type="submit" className="admin-btn-primary px-5 py-3">
            <Save className="h-4 w-4" />
            Save settings
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="admin-card p-5 sm:p-6">
      <h2 className="admin-section-title mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  )
}
