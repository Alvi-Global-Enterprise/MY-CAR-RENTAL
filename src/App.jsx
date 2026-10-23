import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import LegalNotice from './pages/LegalNotice'
import VehicleDetail from './pages/VehicleDetail'
import Reservation from './pages/Reservation'
import { AdminProvider } from './admin/AdminContext'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import Dashboard from './admin/pages/Dashboard'
import VehiclesAdmin from './admin/pages/VehiclesAdmin'
import ReservationsAdmin from './admin/pages/ReservationsAdmin'
import CustomersAdmin from './admin/pages/CustomersAdmin'
import MessagesAdmin from './admin/pages/MessagesAdmin'
import {
  ServicesAdmin,
  TestimonialsAdmin,
  FaqAdmin,
  LocationsAdmin,
} from './admin/pages/ContentAdmin'
import SettingsAdmin from './admin/pages/SettingsAdmin'

function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<VehiclesAdmin />} />
          <Route path="reservations" element={<ReservationsAdmin />} />
          <Route path="customers" element={<CustomersAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="faq" element={<FaqAdmin />} />
          <Route path="locations" element={<LocationsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Routes>
    </AdminProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="legal" element={<LegalNotice />} />
          <Route path="vehicle/:id" element={<VehicleDetail />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>

        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route element={<Layout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
