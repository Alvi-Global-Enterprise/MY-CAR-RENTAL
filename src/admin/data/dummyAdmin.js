import { vehicles } from '../../data/vehicles'
import { services } from '../../data/services'
import { testimonials } from '../../data/testimonials'
import { faqItems } from '../../data/faq'
import { business } from '../../data/business'

export const adminStats = {
  totalVehicles: vehicles.length,
  availableVehicles: 4,
  activeRentals: 3,
  pendingReservations: 5,
  monthlyRevenue: 4850,
  newMessages: 4,
  customers: 28,
  occupancyRate: 68,
}

export const revenueByWeek = [
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 680 },
  { label: 'Wed', value: 510 },
  { label: 'Thu', value: 890 },
  { label: 'Fri', value: 740 },
  { label: 'Sat', value: 980 },
  { label: 'Sun', value: 630 },
]

export const initialReservations = [
  {
    id: 'RSV-1042',
    customer: 'Jean Baptiste',
    email: 'jean.b@email.com',
    phone: '+509 3710-1122',
    vehicleId: 'jeep-wrangler',
    vehicleName: 'Jeep Wrangler',
    location: 'Cap-Haitian Airport',
    pickupDate: '2026-11-14',
    returnDate: '2026-11-18',
    days: 4,
    total: 800,
    status: 'pending',
    createdAt: '2026-11-11',
  },
  {
    id: 'RSV-1041',
    customer: 'Marie Claire',
    email: 'marie.c@email.com',
    phone: '+509 3456-7788',
    vehicleId: 'nissan-rogue',
    vehicleName: 'Nissan Rogue',
    location: 'Boulevard area',
    pickupDate: '2026-11-13',
    returnDate: '2026-11-16',
    days: 3,
    total: 450,
    status: 'confirmed',
    createdAt: '2026-11-10',
  },
  {
    id: 'RSV-1040',
    customer: 'Pierre Louis',
    email: 'pierre.l@email.com',
    phone: '+1 786 555-0199',
    vehicleId: 'jeep-grand-cherokee',
    vehicleName: 'Jeep Grand Cherokee',
    location: 'Monbin Lataille',
    pickupDate: '2026-11-12',
    returnDate: '2026-11-20',
    days: 8,
    total: 1600,
    status: 'active',
    createdAt: '2026-11-08',
  },
  {
    id: 'RSV-1039',
    customer: 'Sophie Laurent',
    email: 'sophie.l@email.com',
    phone: '+509 4123-9988',
    vehicleId: 'suzuki-grand-vitara-white',
    vehicleName: 'Suzuki Grand Vitara White',
    location: 'Haut du Cap',
    pickupDate: '2026-11-05',
    returnDate: '2026-11-09',
    days: 4,
    total: 400,
    status: 'completed',
    createdAt: '2026-11-03',
  },
  {
    id: 'RSV-1038',
    customer: 'Marc Dupont',
    email: 'marc.d@email.com',
    phone: '+509 3186-4455',
    vehicleId: 'jeep-cherokee',
    vehicleName: 'Jeep Cherokee',
    location: 'Vaudreuil',
    pickupDate: '2026-11-15',
    returnDate: '2026-11-17',
    days: 2,
    total: 300,
    status: 'pending',
    createdAt: '2026-11-11',
  },
  {
    id: 'RSV-1037',
    customer: 'Emily Rose',
    email: 'emily.r@email.com',
    phone: '+1 305 555-0142',
    vehicleId: 'suzuki-grand-vitara-silver',
    vehicleName: 'Suzuki Grand Vitara Silver',
    location: 'Cap-Haitian Airport',
    pickupDate: '2026-10-28',
    returnDate: '2026-11-02',
    days: 5,
    total: 500,
    status: 'cancelled',
    createdAt: '2026-10-25',
  },
]

export const initialCustomers = [
  {
    id: 'CUS-01',
    name: 'Jean Baptiste',
    email: 'jean.b@email.com',
    phone: '+509 3710-1122',
    rentals: 3,
    totalSpent: 1850,
    status: 'active',
    joined: '2026-08-12',
  },
  {
    id: 'CUS-02',
    name: 'Marie Claire',
    email: 'marie.c@email.com',
    phone: '+509 3456-7788',
    rentals: 5,
    totalSpent: 2400,
    status: 'active',
    joined: '2026-06-03',
  },
  {
    id: 'CUS-03',
    name: 'Pierre Louis',
    email: 'pierre.l@email.com',
    phone: '+1 786 555-0199',
    rentals: 2,
    totalSpent: 2100,
    status: 'active',
    joined: '2026-09-18',
  },
  {
    id: 'CUS-04',
    name: 'Sophie Laurent',
    email: 'sophie.l@email.com',
    phone: '+509 4123-9988',
    rentals: 1,
    totalSpent: 400,
    status: 'active',
    joined: '2026-11-03',
  },
  {
    id: 'CUS-05',
    name: 'Marc Dupont',
    email: 'marc.d@email.com',
    phone: '+509 3186-4455',
    rentals: 4,
    totalSpent: 1600,
    status: 'inactive',
    joined: '2026-04-22',
  },
]

export const initialMessages = [
  {
    id: 'MSG-01',
    name: 'Andre Joseph',
    email: 'andre.j@email.com',
    phone: '+509 4001-2233',
    subject: 'Airport pickup availability',
    message: 'Do you have a Grand Cherokee available for pickup at Cap-Haitian Airport on Nov 20?',
    status: 'unread',
    createdAt: '2026-11-12T07:15:00',
  },
  {
    id: 'MSG-02',
    name: 'Carla Mendez',
    email: 'carla.m@email.com',
    phone: '+1 786 390-1001',
    subject: 'Long-term rental quote',
    message: 'Looking for a monthly rate for a Nissan Rogue — 30 days starting December.',
    status: 'unread',
    createdAt: '2026-11-11T18:40:00',
  },
  {
    id: 'MSG-03',
    name: 'Kevin Pierre',
    email: 'kevin.p@email.com',
    phone: '+509 4297-5566',
    subject: 'Wedding weekend cars',
    message: 'Need 2 luxury SUVs for a wedding in Cap-Haitian next month. Please advise.',
    status: 'read',
    createdAt: '2026-11-10T11:05:00',
  },
  {
    id: 'MSG-04',
    name: 'Nadia Blanc',
    email: 'nadia.b@email.com',
    phone: '+509 3186-7788',
    subject: 'Insurance question',
    message: 'Is full coverage included with the Jeep Wrangler daily rate?',
    status: 'replied',
    createdAt: '2026-11-09T09:22:00',
  },
]

export const initialActivity = [
  { id: 1, text: 'New reservation RSV-1042 — Jeep Wrangler', time: '12 min ago', type: 'reservation' },
  { id: 2, text: 'Contact message from Andre Joseph', time: '45 min ago', type: 'message' },
  { id: 3, text: 'Reservation RSV-1041 confirmed', time: '2 hrs ago', type: 'success' },
  { id: 4, text: 'Fleet price updated — Nissan Rogue', time: 'Yesterday', type: 'fleet' },
  { id: 5, text: 'Customer Marie Claire completed rental', time: 'Yesterday', type: 'customer' },
]

export function seedVehicles() {
  return vehicles.map((v, i) => ({
    ...v,
    status: i % 3 === 0 ? 'rented' : i % 4 === 0 ? 'maintenance' : 'available',
    plate: `HT-${1000 + i * 17}`,
  }))
}

export function seedServices() {
  return services.map((s) => ({ ...s, active: true }))
}

export function seedTestimonials() {
  return testimonials.map((t) => ({ ...t, published: true }))
}

export function seedFaq() {
  return faqItems.map((f) => ({ ...f, published: true }))
}

export function seedLocations() {
  return business.pickupLocations.map((name, i) => ({
    id: `LOC-${i + 1}`,
    name,
    active: true,
    bookings: [18, 14, 22, 9, 11][i] || 5,
  }))
}

export function seedSettings() {
  return {
    businessName: business.name,
    tagline: business.tagline,
    serviceArea: business.serviceArea,
    email: business.email,
    address: business.address,
    phoneWhatsApp: business.phones[0]?.display || '',
    phoneCall1: business.phones[1]?.display || '',
    phoneCall2: business.phones[2]?.display || '',
    facebook: business.social.facebook,
    instagram: business.social.instagram,
    tiktok: business.social.tiktok,
    announcement: business.announcementMessages[0],
  }
}
