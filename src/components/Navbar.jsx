import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { business } from '../data/business'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'
import AnnouncementBar from './AnnouncementBar'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-navy/10 bg-white/95 shadow-soft backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <AnnouncementBar />
      <div className="container-page flex h-[72px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo />

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Main navigation">
          {business.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `relative py-1 text-[13px] font-semibold uppercase tracking-wide transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-red after:transition-transform after:duration-300 hover:text-red hover:after:scale-x-100 ${
                  isActive ? 'text-red after:scale-x-100' : 'text-navy'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-3 rounded-2xl border border-navy/5 bg-light/80 px-3 py-2 transition hover:border-[#25D366]/30 hover:bg-[#25D366]/5 lg:flex"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm shadow-[#25D366]/40">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-navy">{business.phoneDisplay}</span>
            <span className="text-[11px] text-muted">{business.whatsappLabel}</span>
          </span>
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy/10 text-navy lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[calc(72px+2.25rem)] z-40 border-b border-navy/10 bg-white shadow-lg transition-all duration-300 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {business.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-medium ${
                  isActive ? 'bg-red/10 text-red' : 'text-navy hover:bg-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-4 py-3 text-navy"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-semibold">{business.phoneDisplay}</span>
              <span className="text-xs text-muted">{business.whatsappLabel}</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  )
}
