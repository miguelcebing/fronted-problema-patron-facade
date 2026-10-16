import { useCallback, useEffect, useState } from 'react'
import { getReservation, addService, checkIn, checkOut } from '../api/hotelApi'

export function useReservation(reservationId) {
  const [reservation, setReservation] = useState(null)
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionPending, setActionPending] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setReservation(await getReservation(reservationId))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [reservationId])

  useEffect(() => {
    load()
  }, [load])

  async function run(action) {
    setActionPending(true)
    setError(null)
    try {
      const result = await action()
      setReservation(result)
      return result
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setActionPending(false)
    }
  }

  const addReservationService = (serviceType) => run(() => addService(reservationId, serviceType))
  const performCheckIn = () => run(() => checkIn(reservationId))

  async function performCheckOut() {
    setActionPending(true)
    setError(null)
    try {
      const result = await checkOut(reservationId)
      setInvoice(result)
      return result
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setActionPending(false)
    }
  }

  return {
    reservation,
    invoice,
    loading,
    error,
    actionPending,
    addService: addReservationService,
    checkIn: performCheckIn,
    checkOut: performCheckOut,
    reload: load,
  }
}
