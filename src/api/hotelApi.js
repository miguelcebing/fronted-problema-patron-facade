const BASE = `${import.meta.env.VITE_API_URL}/api/hotel`

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(body?.message || `Error ${res.status}`)
  }
  return body
}

export const getAvailability = (checkIn, checkOut, roomType) => {
  const query = new URLSearchParams({ checkIn, checkOut })
  if (roomType) query.set('roomType', roomType)
  return request(`/availability?${query.toString()}`)
}

export const createReservation = (dto) =>
  request('/reservations', { method: 'POST', body: JSON.stringify(dto) })

export const addService = (reservationId, serviceType) =>
  request(`/reservations/${reservationId}/services`, {
    method: 'POST',
    body: JSON.stringify({ serviceType }),
  })

export const checkIn = (reservationId) =>
  request(`/reservations/${reservationId}/check-in`, { method: 'PUT' })

export const checkOut = (reservationId) =>
  request(`/reservations/${reservationId}/check-out`, { method: 'PUT' })

export const getReservation = (reservationId) => request(`/reservations/${reservationId}`)
