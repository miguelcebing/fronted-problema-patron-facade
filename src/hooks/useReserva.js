import { useCallback, useEffect, useState } from 'react'
import { obtenerReserva, agregarServicio, hacerCheckIn, hacerCheckOut } from '../api/hotelApi'

export function useReserva(reservaId) {
  const [reserva, setReserva] = useState(null)
  const [factura, setFactura] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [accionEnCurso, setAccionEnCurso] = useState(false)

  const cargar = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      setReserva(await obtenerReserva(reservaId))
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }, [reservaId])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function ejecutar(accion) {
    setAccionEnCurso(true)
    setError(null)
    try {
      const resultado = await accion()
      setReserva(resultado)
      return resultado
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setAccionEnCurso(false)
    }
  }

  const agregar = (tipo) => ejecutar(() => agregarServicio(reservaId, tipo))
  const checkIn = () => ejecutar(() => hacerCheckIn(reservaId))

  async function checkOut() {
    setAccionEnCurso(true)
    setError(null)
    try {
      const resultado = await hacerCheckOut(reservaId)
      setFactura(resultado)
      return resultado
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setAccionEnCurso(false)
    }
  }

  return { reserva, factura, cargando, error, accionEnCurso, agregar, checkIn, checkOut, recargar: cargar }
}
