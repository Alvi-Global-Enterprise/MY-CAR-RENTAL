import { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

const empty = { name: '', email: '', phone: '', status: 'active', rentals: 0, totalSpent: 0 }

export default function CustomersAdmin() {
  const { customers, setCustomers, showToast } = useAdmin()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return customers
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.toLowerCase().includes(term),
    )
  }, [customers, q])

  const openCreate = () => {
    setEditing(null)
    setForm(empty)
    setOpen(true)
  }

  const openEdit = (c) => {
    setEditing(c)
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      status: c.status,
      rentals: c.rentals,
      totalSpent: c.totalSpent,
    })
    setOpen(true)
  }

  const onSave = (e) => {
    e.preventDefault()
    if (editing) {
      setCustomers((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...form } : c)))
      showToast('Customer updated')
    } else {
      setCustomers((prev) => [
        {
          id: `CUS-${String(prev.length + 1).padStart(2, '0')}`,
          joined: new Date().toISOString().slice(0, 10),
          ...form,
        },
        ...prev,
      ])
      showToast('Customer added')
    }
    setOpen(false)
  }

  return (
    <div>
      <AdminPageHeader
        title="Customers"
        subtitle="Renter profiles linked to reservations."
        actions={
          <button type="button" onClick={openCreate} className="admin-btn-primary">
            <Plus className="h-4 w-4" />
            Add customer
          </button>
        }
      />

      <div className="admin-search mb-5">
        <Search className="h-4 w-4 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search customers…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Rentals</th>
                <th>Spent</th>
                <th>Status</th>
                <th>Joined</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <p className="font-semibold text-navy">{c.name}</p>
                    <p className="text-[11px] text-muted">{c.email}</p>
                  </td>
                  <td className="text-muted">{c.phone}</td>
                  <td className="font-medium">{c.rentals}</td>
                  <td className="font-bold text-navy">${c.totalSpent}</td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="text-muted">{c.joined}</td>
                  <td>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => openEdit(c)} className="admin-icon-btn">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomers((prev) => prev.filter((x) => x.id !== c.id))
                          showToast('Customer removed')
                        }}
                        className="admin-btn-danger px-2.5 py-2"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit customer' : 'Add customer'}>
        <form onSubmit={onSave} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Name</span>
            <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Phone</span>
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Status</span>
            <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

const inputClass = 'admin-input'
