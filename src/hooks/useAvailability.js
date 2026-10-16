import { useState } from 'react'
import { getAvailability } from '../api/hotelApi'

export function useAvailability() {
  const [rooms, setRooms] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search({ checkIn, checkOut, roomType }) {
    setLoading(true)
    setError(null)
    setRooms(null)
    try {
      setRooms(await getAvailability(checkIn, checkOut, roomType))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { rooms, loading, error, search }
}
