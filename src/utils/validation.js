export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
}

export function validateBookingForm({ location, pickupDate, returnDate, vehicleType }) {
  const errors = {}

  if (!location) errors.location = 'Please select a location.'
  if (!pickupDate) errors.pickupDate = 'Please enter a pickup date.'
  if (!returnDate) errors.returnDate = 'Please enter a return date.'
  if (!vehicleType) errors.vehicleType = 'Please choose a vehicle type.'

  if (pickupDate && returnDate) {
    const pickup = new Date(pickupDate)
    const ret = new Date(returnDate)
    if (ret < pickup) {
      errors.returnDate = 'Return date must be after the pickup date.'
    }
  }

  return errors
}

export function validateContactForm({ name, email, phone, message }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Name is required.'
  if (!email?.trim()) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Invalid email.'
  if (!phone?.trim()) errors.phone = 'Phone number is required.'
  if (!message?.trim()) errors.message = 'Message is required.'
  else if (message.trim().length < 10) errors.message = 'Message is too short (min. 10 characters).'
  return errors
}

export function validateReservationForm({
  firstName,
  lastName,
  phone,
  email,
  location,
  pickupDate,
  returnDate,
}) {
  const errors = {}
  if (!location) errors.location = 'Please select a location.'
  if (!pickupDate) errors.pickupDate = 'Please enter a pickup date.'
  if (!returnDate) errors.returnDate = 'Please enter a return date.'
  if (pickupDate && returnDate) {
    const pickup = new Date(pickupDate)
    const ret = new Date(returnDate)
    if (ret < pickup) {
      errors.returnDate = 'Return date must be after the pickup date.'
    }
  }
  if (!firstName?.trim()) errors.firstName = 'First name is required.'
  if (!lastName?.trim()) errors.lastName = 'Last name is required.'
  if (!phone?.trim()) errors.phone = 'Phone number is required.'
  if (!email?.trim()) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Invalid email.'
  return errors
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
