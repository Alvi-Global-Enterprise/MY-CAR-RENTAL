import { useMemo, useState } from 'react'
import { Search, Eye } from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

const statuses = ['all', 'pending', 'confirmed', 'active', 'completed', 'cancelled']

export default function ReservationsAdmin() {
  const { reservations, setReservations, showToast } = useAdmin()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchStatus = status === 'all' || r.status === status
      const term = q.trim().toLowerCase()
      const matchQ =
        !term ||
        r.id.toLowerCase().includes(term) ||
        r.customer.toLowerCase().includes(term) ||
        r.vehicleName.toLowerCase().includes(term)
      return matchStatus && matchQ
    })
  }, [reservations, q, status])

  const updateStatus = (id, next) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)))
    showToast(`Reservation ${id} marked ${next}`)
    setSelected((cur) => (cur?.id === id ? { ...cur, status: next } : cur))
  }

  return (
    <div>
      <AdminPageHeader
        title="Reservations"
        subtitle="Review and manage booking requests from the website."
      />

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="admin-search flex-1">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ID, customer, vehicle…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`admin-chip ${status === s ? 'admin-chip-active' : 'admin-chip-idle'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Location</th>
                <th>Pickup</th>
                <th>Total</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="font-semibold text-navy">{r.id}</td>
                  <td>
                    <p className="font-medium text-navy">{r.customer}</p>
                    <p className="text-[11px] text-muted">{r.email}</p>
                  </td>
                  <td>{r.vehicleName}</td>
                  <td className="text-muted">{r.location}</td>
                  <td className="whitespace-nowrap text-muted">{r.pickupDate}</td>
                  <td className="font-bold text-navy">${r.total}</td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="admin-icon-btn"
                      aria-label="View reservation"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && (
          <p className="p-10 text-center text-sm text-muted">No reservations match your filters.</p>
        )}
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Reservation details" wide>
        {selected && (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Reservation ID" value={selected.id} />
              <Info label="Status" value={<StatusBadge status={selected.status} />} />
              <Info label="Customer" value={selected.customer} />
              <Info label="Phone" value={selected.phone} />
              <Info label="Email" value={selected.email} />
              <Info label="Vehicle" value={selected.vehicleName} />
              <Info label="Pickup location" value={selected.location} />
              <Info label="Duration" value={`${selected.days} days`} />
              <Info label="Pickup date" value={selected.pickupDate} />
              <Info label="Return date" value={selected.returnDate} />
              <Info label="Total" value={`$${selected.total}`} />
              <Info label="Created" value={selected.createdAt} />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-navy/[0.06] pt-4">
              {['confirmed', 'active', 'completed', 'cancelled'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateStatus(selected.id, s)}
                  className="admin-btn-secondary capitalize text-xs"
                >
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-navy/[0.05] bg-light/80 px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <div className="mt-1 text-sm font-medium text-navy">{value}</div>
    </div>
  )
}
