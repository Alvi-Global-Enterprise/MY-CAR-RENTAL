import { useState } from 'react'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import Modal from '../components/Modal'

const inputClass = 'admin-input'

export function ServicesAdmin() {
  const { services, setServices, showToast } = useAdmin()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', active: true })

  const save = (e) => {
    e.preventDefault()
    if (editing) {
      setServices((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s)))
      showToast('Service updated')
    } else {
      setServices((prev) => [{ id: `svc-${Date.now()}`, icon: 'Star', ...form }, ...prev])
      showToast('Service added')
    }
    setOpen(false)
  }

  return (
    <ContentShell
      title="Services"
      subtitle="Homepage & services page offerings."
      onAdd={() => {
        setEditing(null)
        setForm({ title: '', description: '', active: true })
        setOpen(true)
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.id} className="admin-card admin-card-hover p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.description}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setServices((prev) =>
                    prev.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x)),
                  )
                  showToast(s.active ? 'Service hidden' : 'Service published')
                }}
                className="text-navy"
                aria-label="Toggle active"
              >
                {s.active ? <ToggleRight className="h-6 w-6 text-navy" /> : <ToggleLeft className="h-6 w-6 text-muted" />}
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(s)
                  setForm({ title: s.title, description: s.description, active: s.active })
                  setOpen(true)
                }}
                className="admin-btn-secondary text-xs"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setServices((prev) => prev.filter((x) => x.id !== s.id))
                  showToast('Service removed')
                }}
                className="admin-btn-danger text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit service' : 'Add service'}>
        <form onSubmit={save} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Title</span>
            <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Description</span>
            <textarea required rows={4} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <FormActions onCancel={() => setOpen(false)} />
        </form>
      </Modal>
    </ContentShell>
  )
}

export function TestimonialsAdmin() {
  const { testimonials, setTestimonials, showToast } = useAdmin()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', role: '', rating: 5, text: '', published: true })

  const save = (e) => {
    e.preventDefault()
    if (editing) {
      setTestimonials((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...form } : t)))
      showToast('Testimonial updated')
    } else {
      setTestimonials((prev) => [
        {
          id: Date.now(),
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          ...form,
        },
        ...prev,
      ])
      showToast('Testimonial added')
    }
    setOpen(false)
  }

  return (
    <ContentShell
      title="Testimonials"
      subtitle="Customer reviews shown on the homepage."
      onAdd={() => {
        setEditing(null)
        setForm({ name: '', role: '', rating: 5, text: '', published: true })
        setOpen(true)
      }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t) => (
          <article key={t.id} className="admin-card admin-card-hover p-5">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-navy/5" />
              <div>
                <p className="font-bold text-navy">{t.name}</p>
                <p className="text-xs text-muted">{t.role} · {'★'.repeat(t.rating)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(t)
                  setForm({
                    name: t.name,
                    role: t.role,
                    rating: t.rating,
                    text: t.text,
                    published: t.published,
                  })
                  setOpen(true)
                }}
                className="admin-btn-secondary text-xs"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setTestimonials((prev) => prev.filter((x) => x.id !== t.id))
                  showToast('Testimonial removed')
                }}
                className="admin-btn-danger text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit testimonial' : 'Add testimonial'} wide>
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Name</span>
              <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Role</span>
              <input required className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Quote</span>
            <textarea required rows={4} className={inputClass} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </label>
          <FormActions onCancel={() => setOpen(false)} />
        </form>
      </Modal>
    </ContentShell>
  )
}

export function FaqAdmin() {
  const { faq, setFaq, showToast } = useAdmin()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '', published: true })

  const save = (e) => {
    e.preventDefault()
    if (editing) {
      setFaq((prev) => prev.map((f) => (f.id === editing.id ? { ...f, ...form } : f)))
      showToast('FAQ updated')
    } else {
      setFaq((prev) => [{ id: Date.now(), ...form }, ...prev])
      showToast('FAQ added')
    }
    setOpen(false)
  }

  return (
    <ContentShell
      title="FAQ"
      subtitle="Questions shown on the website FAQ section."
      onAdd={() => {
        setEditing(null)
        setForm({ question: '', answer: '', published: true })
        setOpen(true)
      }}
    >
      <div className="space-y-3">
        {faq.map((f) => (
          <article key={f.id} className="admin-card admin-card-hover p-5">
            <h3 className="font-bold text-navy">{f.question}</h3>
            <p className="mt-2 text-sm text-muted">{f.answer}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(f)
                  setForm({ question: f.question, answer: f.answer, published: f.published })
                  setOpen(true)
                }}
                className="admin-btn-secondary text-xs"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setFaq((prev) => prev.filter((x) => x.id !== f.id))
                  showToast('FAQ removed')
                }}
                className="admin-btn-danger text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit FAQ' : 'Add FAQ'} wide>
        <form onSubmit={save} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Question</span>
            <input required className={inputClass} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Answer</span>
            <textarea required rows={5} className={inputClass} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
          </label>
          <FormActions onCancel={() => setOpen(false)} />
        </form>
      </Modal>
    </ContentShell>
  )
}

export function LocationsAdmin() {
  const { locations, setLocations, showToast } = useAdmin()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <ContentShell
      title="Pickup locations"
      subtitle="Locations used in booking & reservation forms."
      onAdd={() => {
        setName('')
        setOpen(true)
      }}
    >
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Bookings</th>
                <th>Active</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td className="font-semibold text-navy">{loc.name}</td>
                  <td className="text-muted">{loc.bookings}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setLocations((prev) =>
                          prev.map((x) => (x.id === loc.id ? { ...x, active: !x.active } : x)),
                        )
                        showToast('Location updated')
                      }}
                    >
                      {loc.active ? (
                        <ToggleRight className="h-6 w-6 text-navy" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-muted" />
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setLocations((prev) => prev.filter((x) => x.id !== loc.id))
                        showToast('Location removed')
                      }}
                      className="admin-btn-danger px-2.5 py-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add location">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setLocations((prev) => [
              { id: `LOC-${Date.now()}`, name, active: true, bookings: 0 },
              ...prev,
            ])
            showToast('Location added')
            setOpen(false)
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Location name</span>
            <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <FormActions onCancel={() => setOpen(false)} />
        </form>
      </Modal>
    </ContentShell>
  )
}

function ContentShell({ title, subtitle, onAdd, children }) {
  return (
    <div>
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button type="button" onClick={onAdd} className="admin-btn-primary">
            <Plus className="h-4 w-4" />
            Add new
          </button>
        }
      />
      {children}
    </div>
  )
}

function FormActions({ onCancel }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button type="button" onClick={onCancel} className="admin-btn-secondary">
        Cancel
      </button>
      <button type="submit" className="admin-btn-primary">
        Save
      </button>
    </div>
  )
}
