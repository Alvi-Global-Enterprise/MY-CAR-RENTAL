import { useMemo, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Search, ImagePlus, Upload, Link2 } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

const fleetImageOptions = [
  '/cars/suzuki-grand-vitara.jpeg',
  '/cars/suzuki-grand-vitara-silver-gallery/1.jpeg',
  '/cars/nissan-rogue.jpeg',
  '/cars/jeep-cherokee.jpeg',
  '/cars/jeep-grand-cherokee-gallery/1.jpeg',
  '/herobgsection.jpeg',
]

const emptyVehicle = {
  name: '',
  year: new Date().getFullYear(),
  transmission: 'Automatic',
  passengers: 5,
  luggage: 3,
  fuel: 'Gasoline',
  pricePerDay: 100,
  status: 'available',
  plate: '',
  description: '',
  image: '',
}

export default function VehiclesAdmin() {
  const { vehicles, setVehicles, showToast } = useAdmin()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyVehicle)
  const [imageUrl, setImageUrl] = useState('')
  const fileRef = useRef(null)

  const onPickFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please choose an image file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result || '') }))
      setImageUrl('')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const applyImageUrl = () => {
    const url = imageUrl.trim()
    if (!url) return
    setForm((prev) => ({ ...prev, image: url }))
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return vehicles
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(term) ||
        v.plate?.toLowerCase().includes(term) ||
        v.status.toLowerCase().includes(term),
    )
  }, [vehicles, q])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyVehicle)
    setImageUrl('')
    setOpen(true)
  }

  const openEdit = (v) => {
    setEditing(v)
    setForm({
      name: v.name,
      year: v.year,
      transmission: v.transmission,
      passengers: v.passengers,
      luggage: v.luggage,
      fuel: v.fuel,
      pricePerDay: v.pricePerDay,
      status: v.status,
      plate: v.plate || '',
      description: v.description || '',
      image: v.image,
    })
    setImageUrl(v.image?.startsWith('data:') ? '' : v.image || '')
    setOpen(true)
  }

  const onSave = (e) => {
    e.preventDefault()
    if (!form.image) {
      showToast('Please add a car image')
      return
    }
    if (editing) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editing.id
            ? { ...v, ...form, images: [form.image, ...(v.images || []).filter((img) => img !== form.image)] }
            : v,
        ),
      )
      showToast('Vehicle updated')
    } else {
      const id = form.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
      setVehicles((prev) => [
        {
          id,
          categoryId: id,
          features: ['Air conditioning', 'Bluetooth'],
          images: [form.image],
          ...form,
        },
        ...prev,
      ])
      showToast('Vehicle added to fleet')
    }
    setOpen(false)
  }

  const onDelete = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
    showToast('Vehicle removed')
  }

  return (
    <div>
      <AdminPageHeader
        title="Fleet"
        subtitle="Manage website vehicles, rates, and availability."
        actions={
          <button type="button" onClick={openCreate} className="admin-btn-primary">
            <Plus className="h-4 w-4" />
            Add vehicle
          </button>
        }
      />

      <div className="admin-search mb-5">
        <Search className="h-4 w-4 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, plate, or status…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted/60"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((v) => (
          <article key={v.id} className="admin-card admin-card-hover overflow-hidden">
            <div className="relative aspect-[16/10] bg-navy/5">
              <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3">
                <StatusBadge status={v.status} />
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-navy">{v.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {v.year} · {v.transmission} · {v.plate}
                  </p>
                </div>
                <p className="shrink-0 text-lg font-extrabold text-red">${v.pricePerDay}</p>
              </div>
              <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">{v.description}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => openEdit(v)} className="admin-btn-secondary flex-1 text-xs">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(v.id)}
                  className="admin-btn-danger px-3"
                  aria-label={`Delete ${v.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit vehicle' : 'Add vehicle'} wide>
        <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 rounded-2xl border border-navy/10 bg-light/70 p-4">
            <div className="mb-3 flex items-center gap-2">
              <ImagePlus className="h-4 w-4 text-red" />
              <p className="text-sm font-bold text-navy">Car image</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-navy/10 bg-white">
                {form.image ? (
                  <img src={form.image} alt="Vehicle preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 px-3 text-center text-xs text-muted">
                    <ImagePlus className="h-6 w-6 text-navy/30" />
                    No image selected
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickFile}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-navy/20 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-red hover:bg-red/5"
                >
                  <Upload className="h-4 w-4 text-red" />
                  Upload from device
                </button>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste image URL / path"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyImageUrl}
                    className="rounded-xl border border-navy/10 bg-white px-3 py-2 text-xs font-semibold text-navy hover:bg-light"
                  >
                    Use
                  </button>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Quick pick from fleet
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fleetImageOptions.map((src) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, image: src }))
                          setImageUrl(src)
                        }}
                        className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition ${
                          form.image === src ? 'border-red' : 'border-transparent ring-1 ring-navy/10'
                        }`}
                        aria-label="Select fleet image"
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Field label="Name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Plate">
            <input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Year">
            <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className={inputClass} />
          </Field>
          <Field label="Price / day">
            <input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })} className={inputClass} />
          </Field>
          <Field label="Transmission">
            <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className={inputClass}>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
              <option value="available">available</option>
              <option value="rented">rented</option>
              <option value="maintenance">maintenance</option>
            </select>
          </Field>
          <Field label="Passengers">
            <input type="number" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })} className={inputClass} />
          </Field>
          <Field label="Fuel">
            <input value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary">
              Save vehicle
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

const inputClass = 'admin-input'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  )
}
