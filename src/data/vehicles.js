/**
 * Daily rates — editable here.
 */
export const vehicleCategories = [
  {
    id: 'suzuki-grand-vitara-white',
    slug: 'suzuki-grand-vitara-white',
    name: 'SUZUKI GRAND VITARA WHITE',
    shortName: 'Suzuki Grand Vitara White',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    priceFrom: 100,
    description: '2010 White Grand Vitara — practical SUV at an affordable daily rate.',
    image: '/cars/suzuki-grand-vitara.jpeg',
  },
  {
    id: 'suzuki-grand-vitara-silver',
    slug: 'suzuki-grand-vitara-silver',
    name: 'SUZUKI GRAND VITARA SILVER',
    shortName: 'Suzuki Grand Vitara Silver',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    priceFrom: 100,
    description: '2012 Silver Grand Vitara — solid choice for city and mountain roads.',
    image: '/cars/suzuki-grand-vitara-silver-gallery/1.jpeg',
  },
  {
    id: 'nissan-rogue',
    slug: 'nissan-rogue',
    name: 'NISSAN ROGUE',
    shortName: 'Nissan Rogue',
    passengers: 5,
    luggage: 4,
    fuel: 'Gasoline',
    priceFrom: 150,
    description: 'Modern crossover — smooth, efficient, and easy to drive.',
    image: '/cars/nissan-rogue.jpeg',
  },
  {
    id: 'jeep-cherokee',
    slug: 'jeep-cherokee',
    name: 'JEEP CHEROKEE',
    shortName: 'Jeep Cherokee',
    passengers: 5,
    luggage: 4,
    fuel: 'Gasoline',
    priceFrom: 150,
    description: 'Capable SUV for city drives and coastal roads in Cap-Haitian.',
    image: '/cars/jeep-cherokee.jpeg',
  },
  {
    id: 'jeep-grand-cherokee',
    slug: 'jeep-grand-cherokee',
    name: 'JEEP GRAND CHEROKEE',
    shortName: 'Grand Cherokee',
    passengers: 5,
    luggage: 5,
    fuel: 'Gasoline',
    priceFrom: 200,
    description: 'Spacious premium SUV with comfort for family and travel.',
    image: '/cars/jeep-grand-cherokee-gallery/1.jpeg',
  },
  {
    id: 'jeep-wrangler',
    slug: 'jeep-wrangler',
    name: 'JEEP WRANGLER',
    shortName: 'Jeep Wrangler',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    priceFrom: 200,
    description: 'Iconic off-road Jeep for adventure and open-air driving.',
    image: '/herobgsection.jpeg',
  },
]

/** First 4 categories shown on the homepage fleet section */
export const featuredCategories = vehicleCategories.slice(0, 4)

export const vehicles = [
  {
    id: 'suzuki-grand-vitara-white',
    name: 'Suzuki Grand Vitara White',
    categoryId: 'suzuki-grand-vitara-white',
    year: 2010,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    pricePerDay: 100,
    features: ['Air conditioning', 'Fog lights', 'Bluetooth', 'USB'],
    image: '/cars/suzuki-grand-vitara.jpeg',
    images: [
      '/cars/suzuki-grand-vitara.jpeg',
      '/cars/suzuki-2013-gallery/1.jpeg',
      '/cars/suzuki-2013-gallery/2.jpeg',
    ],
    description: '2010 White Grand Vitara — practical SUV at an affordable daily rate.',
  },
  {
    id: 'suzuki-grand-vitara-silver',
    name: 'Suzuki Grand Vitara Silver',
    categoryId: 'suzuki-grand-vitara-silver',
    year: 2012,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    pricePerDay: 100,
    features: ['Air conditioning', 'Roof rails', 'Bluetooth'],
    image: '/cars/suzuki-grand-vitara-silver-gallery/1.jpeg',
    images: [
      '/cars/suzuki-grand-vitara-silver-gallery/1.jpeg',
      '/cars/suzuki-grand-vitara-silver-gallery/2.jpeg',
      '/cars/suzuki-grand-vitara-silver-gallery/3.jpeg',
    ],
    description: '2012 Silver Grand Vitara — solid choice for city and mountain roads.',
  },
  {
    id: 'nissan-rogue',
    name: 'Nissan Rogue',
    categoryId: 'nissan-rogue',
    year: 2017,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 4,
    fuel: 'Gasoline',
    pricePerDay: 150,
    features: ['Air conditioning', 'Touchscreen', 'Roof rails', 'Backup camera'],
    image: '/cars/nissan-rogue.jpeg',
    images: [
      '/cars/nissan-rogue.jpeg',
      '/cars/nissan-rogue-gallery/1.jpeg',
      '/cars/nissan-rogue-gallery/2.jpeg',
    ],
    description: '2017 White Nissan Rogue crossover — comfortable and efficient for daily use.',
  },
  {
    id: 'jeep-cherokee',
    name: 'Jeep Cherokee',
    categoryId: 'jeep-cherokee',
    year: 2015,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 4,
    fuel: 'Gasoline',
    pricePerDay: 150,
    features: ['Air conditioning', 'Bluetooth', 'Roof rails', 'USB'],
    image: '/cars/jeep-cherokee.jpeg',
    images: [
      '/cars/jeep-cherokee.jpeg',
      '/cars/jeep-cherokee-gallery/1.jpeg',
      '/cars/jeep-cherokee-gallery/4.jpeg',
    ],
    description: '2015 Jeep Cherokee — ready for Cap-Haitian roads and beach trips.',
  },
  {
    id: 'jeep-grand-cherokee',
    name: 'Jeep Grand Cherokee',
    categoryId: 'jeep-grand-cherokee',
    year: 2014,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 5,
    fuel: 'Gasoline',
    pricePerDay: 200,
    features: ['Air conditioning', 'Leather seats', 'Sunroof', 'Bluetooth'],
    image: '/cars/jeep-grand-cherokee-gallery/1.jpeg',
    images: [
      '/cars/jeep-grand-cherokee-gallery/1.jpeg',
      '/cars/jeep-grand-cherokee-gallery/2.jpeg',
      '/cars/jeep-grand-cherokee-gallery/3.jpeg',
    ],
    description: '2014 Grand Cherokee with space and comfort for longer trips.',
  },
  {
    id: 'jeep-wrangler',
    name: 'Jeep Wrangler',
    categoryId: 'jeep-wrangler',
    year: 2015,
    transmission: 'Automatic',
    passengers: 5,
    luggage: 3,
    fuel: 'Gasoline',
    pricePerDay: 200,
    features: ['Air conditioning', '4x4', 'Bluetooth', 'Off-road ready'],
    image: '/herobgsection.jpeg',
    description: '2015 Jeep Wrangler — adventure-ready for Cap-Haitian roads.',
  },
]

export function getCategoryById(id) {
  return vehicleCategories.find((c) => c.id === id || c.slug === id)
}

export function getVehicleById(id) {
  return vehicles.find((v) => v.id === id)
}

export function getVehiclesByCategory(categoryId) {
  return vehicles.filter((v) => v.categoryId === categoryId)
}

export function filterVehicles({ category, location, pickupDate, returnDate } = {}) {
  let list = [...vehicles]

  if (category && category !== 'all') {
    const cat = getCategoryById(category)
    const catId = cat?.id || category
    list = list.filter((v) => v.categoryId === catId)
  }

  void location
  void pickupDate
  void returnDate

  return list
}
