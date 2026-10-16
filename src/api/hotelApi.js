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

export const consultarDisponibilidad = (fechaEntrada, fechaSalida, tipo) => {
  const q = new URLSearchParams({ fechaEntrada, fechaSalida })
  if (tipo) q.set('tipo', tipo)
  return request(`/disponibilidad?${q.toString()}`)
}

export const crearReserva = (dto) =>
  request('/reservar', { method: 'POST', body: JSON.stringify(dto) })

export const agregarServicio = (reservaId, tipoServicio) =>
  request(`/servicios/${reservaId}`, { method: 'POST', body: JSON.stringify({ tipoServicio }) })

export const hacerCheckIn = (reservaId) =>
  request(`/checkin/${reservaId}`, { method: 'PUT' })

export const hacerCheckOut = (reservaId) =>
  request(`/checkout/${reservaId}`, { method: 'PUT' })

export const obtenerReserva = (reservaId) => request(`/reserva/${reservaId}`)
