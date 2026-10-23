import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  adminStats,
  initialActivity,
  initialCustomers,
  initialMessages,
  initialReservations,
  revenueByWeek,
  seedFaq,
  seedLocations,
  seedServices,
  seedSettings,
  seedTestimonials,
  seedVehicles,
} from './data/dummyAdmin'

const AdminContext = createContext(null)
const AUTH_KEY = 'mcr-admin-demo'

export function AdminProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [toast, setToast] = useState('')
  const [vehicles, setVehicles] = useState(seedVehicles)
  const [reservations, setReservations] = useState(initialReservations)
  const [customers, setCustomers] = useState(initialCustomers)
  const [messages, setMessages] = useState(initialMessages)
  const [services, setServices] = useState(seedServices)
  const [testimonials, setTestimonials] = useState(seedTestimonials)
  const [faq, setFaq] = useState(seedFaq)
  const [locations, setLocations] = useState(seedLocations)
  const [settings, setSettings] = useState(seedSettings)
  const [activity] = useState(initialActivity)

  const showToast = useCallback((message) => {
    setToast(message)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const login = useCallback(() => {
    sessionStorage.setItem(AUTH_KEY, '1')
    setAuthed(true)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }, [])

  const value = useMemo(
    () => ({
      authed,
      login,
      logout,
      toast,
      showToast,
      clearToast: () => setToast(''),
      stats: adminStats,
      revenueByWeek,
      activity,
      vehicles,
      setVehicles,
      reservations,
      setReservations,
      customers,
      setCustomers,
      messages,
      setMessages,
      services,
      setServices,
      testimonials,
      setTestimonials,
      faq,
      setFaq,
      locations,
      setLocations,
      settings,
      setSettings,
    }),
    [
      authed,
      login,
      logout,
      toast,
      showToast,
      activity,
      vehicles,
      reservations,
      customers,
      messages,
      services,
      testimonials,
      faq,
      locations,
      settings,
    ],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
