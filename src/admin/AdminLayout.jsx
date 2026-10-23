import { useState } from 'react'
import { NavLink, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Car,
  CalendarCheck2,
  Users,
  MessageSquare,
  Briefcase,
  Star,
  HelpCircle,
  MapPin,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Bell,
  Search,
} from 'lucide-react'
import { useAdmin } from './AdminContext'
import Toast from './components/Toast'

const mainNav = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/vehicles', label: 'Fleet', icon: Car },
  { to: '/admin/reservations', label: 'Reservations', icon: CalendarCheck2 },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

const contentNav = [
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/locations', label: 'Locations', icon: MapPin },
]

const systemNav = [{ to: '/admin/settings', label: 'Settings', icon: Settings }]

const titles = {
  '/admin': 'Dashboard',
  '/admin/vehicles': 'Fleet',
  '/admin/reservations': 'Reservations',
  '/admin/customers': 'Customers',
  '/admin/messages': 'Messages',
  '/admin/services': 'Services',
  '/admin/testimonials': 'Testimonials',
  '/admin/faq': 'FAQ',
  '/admin/locations': 'Locations',
  '/admin/settings': 'Settings',
}

export default function AdminLayout() {
  const { authed, logout, toast, clearToast, messages } = useAdmin()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const unread = messages.filter((m) => m.status === 'unread').length
  const pageTitle = titles[location.pathname] || 'Admin'

  if (!authed) return <Navigate to="/admin/login" replace />

  const onLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition duration-200 ${
      isActive
        ? 'bg-white text-navy shadow-sm'
        : 'text-white/65 hover:bg-white/10 hover:text-white'
    }`

  const NavGroup = ({ label, items }) => (
    <div className="mb-5">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                    isActive ? 'bg-red text-white' : 'bg-white/5 text-white/70 group-hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="flex-1">{item.label}</span>
                {item.to === '/admin/messages' && unread > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-red/10 text-red' : 'bg-red text-white'
                    }`}
                  >
                    {unread}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )

  return (
    <div className="admin-shell min-h-screen">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[268px] flex-col bg-navy-deep transition-transform duration-300 lg:static lg:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-5">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="/mainlogo.png"
                alt=""
                className="h-10 w-auto shrink-0 rounded-lg bg-white object-contain p-1 shadow-sm"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">MY CAR RENTAL</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red">
                  Admin Panel
                </p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <NavGroup label="Overview" items={mainNav} />
            <NavGroup label="Website" items={contentNav} />
            <NavGroup label="System" items={systemNav} />
          </nav>

          <div className="border-t border-white/10 p-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              View website
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/60 transition hover:bg-red/15 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-navy/50 backdrop-blur-[2px] lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-navy/[0.06] bg-white/85 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="admin-icon-btn lg:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy sm:text-base">{pageTitle}</p>
                  <p className="hidden text-xs text-muted sm:block">Cap-Haitian operations</p>
                </div>
              </div>

              <div className="hidden max-w-xs flex-1 items-center gap-2 rounded-xl border border-navy/10 bg-light px-3 py-2 md:flex lg:max-w-sm">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <input
                  readOnly
                  placeholder="Quick search…"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted/60"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button type="button" className="admin-icon-btn relative" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red ring-2 ring-white" />
                  )}
                </button>
                <div className="flex items-center gap-2.5 rounded-xl border border-navy/[0.06] bg-light/80 py-1.5 pl-1.5 pr-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-[11px] font-bold text-white">
                    MC
                  </span>
                  <div className="hidden leading-tight sm:block">
                    <p className="text-xs font-semibold text-navy">Admin</p>
                    <p className="max-w-[140px] truncate text-[10px] text-muted">
                      mycarrentalhaiti@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1280px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <Toast message={toast} onClose={clearToast} />
    </div>
  )
}
