import { useState } from 'react'
import { consultarDisponibilidad } from '../api/hotelApi'

export function useDisponibilidad() {
  const [habitaciones, setHabitaciones] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState(null)

  async function buscar({ fechaEntrada, fechaSalida, tipo }) {
    setCargando(true)
    setError(null)
    setHabitaciones(null)
    try {
      const data = await consultarDisponibilidad(fechaEntrada, fechaSalida, tipo)
      setHabitaciones(data)
      setBusqueda({ fechaEntrada, fechaSalida, tipo })
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return { habitaciones, cargando, error, busqueda, buscar }
}
