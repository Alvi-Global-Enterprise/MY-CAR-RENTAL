import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAdmin } from '../AdminContext'

const ADMIN_EMAIL = 'mycarrentalhaiti@gmail.com'
const ADMIN_PASSWORD = 'mycar@123'

const fieldClass =
  'w-full rounded-xl border border-navy/10 bg-light py-3.5 pl-11 pr-4 text-sm text-navy outline-none transition duration-200 placeholder:text-muted/55 focus:border-red/40 focus:bg-white focus:ring-2 focus:ring-red/10'

export default function AdminLogin() {
  const { authed, login } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (authed) return <Navigate to="/admin" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const emailOk = email.trim().toLowerCase() === ADMIN_EMAIL
      const passOk = password === ADMIN_PASSWORD

      if (!emailOk || !passOk) {
        setError('Invalid email or password.')
        setLoading(false)
        return
      }

      login()
      navigate('/admin')
    }, 400)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(237,28,46,0.28), transparent 34%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.08), transparent 28%), radial-gradient(circle at 70% 85%, rgba(16,45,105,0.7), transparent 42%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-lift lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-secondary p-8 text-white lg:flex lg:flex-col lg:justify-between lg:p-10">
          <div>
            <img
              src="/mainlogo.png"
              alt="MY CAR RENTAL"
              className="h-12 w-auto rounded-lg bg-white p-1"
            />
            <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-red">
              Admin access
            </p>
            <h1 className="mt-3 max-w-xs text-3xl font-extrabold leading-tight tracking-tight">
              Manage your rental business with clarity
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              Fleet, reservations, customers, and website content — one clean control center.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-white/80">Cap-Haitian · Haiti</p>
            <p className="mt-1 text-[11px] text-white/50">Drive in complete safety</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-7 lg:hidden">
            <img
              src="/mainlogo.png"
              alt="MY CAR RENTAL"
              className="h-12 w-auto rounded-lg border border-navy/5 p-1"
            />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-red">Sign in</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">Welcome back</h2>
          <p className="mt-1.5 text-sm text-muted">Enter your admin credentials to continue.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Email</span>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-muted">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="mycarrentalhaiti@gmail.com"
                  autoComplete="username"
                  required
                  className={fieldClass}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Password</span>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-muted">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className={fieldClass}
                />
              </div>
            </label>

            {error && (
              <p
                className="rounded-xl border border-red/15 bg-red/5 px-3.5 py-2.5 text-sm text-red"
                role="alert"
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="admin-btn-primary w-full py-3.5">
              {loading ? 'Signing in…' : 'Sign in to dashboard'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="flex items-start gap-2.5 rounded-xl bg-light px-3.5 py-3 text-xs leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              <p>Authorized staff only. Use your MY CAR RENTAL admin email and password.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
