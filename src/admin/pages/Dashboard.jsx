import { Link } from 'react-router-dom'
import {
  Car,
  CalendarCheck2,
  DollarSign,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Activity,
} from 'lucide-react'
import { useAdmin } from '../AdminContext'
import AdminPageHeader from '../components/AdminPageHeader'
import StatusBadge from '../components/StatusBadge'

export default function Dashboard() {
  const { stats, revenueByWeek, reservations, messages, activity, vehicles } = useAdmin()
  const maxRev = Math.max(...revenueByWeek.map((d) => d.value))
  const recent = reservations.slice(0, 5)
  const unread = messages.filter((m) => m.status === 'unread').length
  const available = vehicles.filter((v) => v.status === 'available').length

  const cards = [
    {
      label: 'Fleet vehicles',
      value: stats.totalVehicles,
      hint: `${available} available now`,
      icon: Car,
      to: '/admin/vehicles',
      accent: 'bg-navy',
    },
    {
      label: 'Active rentals',
      value: stats.activeRentals,
      hint: `${stats.pendingReservations} awaiting review`,
      icon: CalendarCheck2,
      to: '/admin/reservations',
      accent: 'bg-red',
    },
    {
      label: 'Month revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      hint: `${stats.occupancyRate}% fleet occupancy`,
      icon: DollarSign,
      to: '/admin/reservations',
      accent: 'bg-navy-secondary',
    },
    {
      label: 'Unread messages',
      value: unread,
      hint: `${stats.customers} total customers`,
      icon: MessageSquare,
      to: '/admin/messages',
      accent: 'bg-red-dark',
    },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Live overview of fleet, bookings, and customer activity."
        actions={
          <Link to="/admin/vehicles" className="admin-btn-primary">
            Manage fleet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="admin-card admin-card-hover group relative overflow-hidden p-5"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-navy/[0.03] transition group-hover:scale-110" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {card.label}
                </p>
                <p className="mt-2.5 text-3xl font-extrabold tracking-tight text-navy">
                  {card.value}
                </p>
                <p className="mt-1.5 text-xs text-muted">{card.hint}</p>
              </div>
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${card.accent}`}
              >
                <card.icon className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
        <section className="admin-card p-5 sm:p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="admin-section-title">Weekly revenue</h2>
              <p className="admin-section-sub">Performance across the last 7 days</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.05] px-2.5 py-1 text-[11px] font-semibold text-navy">
              <TrendingUp className="h-3.5 w-3.5 text-red" />
              +12% vs last week
            </span>
          </div>

          <div className="flex h-48 items-end gap-2.5 sm:gap-3.5">
            {revenueByWeek.map((day) => {
              const pct = (day.value / maxRev) * 100
              return (
                <div key={day.label} className="group flex flex-1 flex-col items-center gap-2.5">
                  <div className="relative flex h-40 w-full items-end justify-center">
                    <div
                      className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-navy via-navy to-red/70 shadow-sm transition duration-300 group-hover:from-navy-secondary group-hover:to-red"
                      style={{ height: `${pct}%`, minHeight: 14 }}
                      title={`$${day.value}`}
                    />
                    <span className="pointer-events-none absolute -top-7 rounded-md bg-navy px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                      ${day.value}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-muted">{day.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="admin-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red/10 text-red">
                <Activity className="h-4 w-4" />
              </span>
              <div>
                <h2 className="admin-section-title">Recent activity</h2>
                <p className="admin-section-sub">Latest system events</p>
              </div>
            </div>
          </div>
          <ul className="space-y-1">
            {activity.map((item, i) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-xl px-2 py-2.5 transition hover:bg-light/80"
              >
                <div className="relative mt-1.5 flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full bg-red" />
                  {i < activity.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-navy/10" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="text-sm font-medium leading-snug text-navy">{item.text}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="admin-panel mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/[0.06] px-5 py-4 sm:px-6">
          <div>
            <h2 className="admin-section-title">Latest reservations</h2>
            <p className="admin-section-sub">Recent booking requests from the website</p>
          </div>
          <Link to="/admin/reservations" className="admin-btn-secondary text-xs">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Dates</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id}>
                  <td className="font-semibold text-navy">{r.id}</td>
                  <td>
                    <p className="font-medium text-navy">{r.customer}</p>
                    <p className="text-[11px] text-muted">{r.email}</p>
                  </td>
                  <td className="text-navy/80">{r.vehicleName}</td>
                  <td className="whitespace-nowrap text-muted">
                    {r.pickupDate} → {r.returnDate}
                  </td>
                  <td className="font-bold text-navy">${r.total}</td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
