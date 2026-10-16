import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../components/RoomCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useAvailability } from '../hooks/useAvailability.js'
import { todayISO, addDays } from '../utils/format.js'

export default function AvailabilitySearch() {
  const navigate = useNavigate()
  const { rooms, loading, error, search } = useAvailability()

  const [checkIn, setCheckIn] = useState(todayISO())
  const [checkOut, setCheckOut] = useState(addDays(todayISO(), 2))
  const [roomType, setRoomType] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    if (!checkIn || !checkOut || checkOut <= checkIn) return
    search({ checkIn, checkOut, roomType: roomType || undefined })
  }

  function onSelect(room) {
    navigate('/reserve', {
      state: { roomNumber: room.roomNumber, checkIn, checkOut, item: room },
    })
  }

  return (
    <section>
      <h1>Search availability</h1>
      <p className="muted">Find free rooms by date and compare the dynamic price per season.</p>

      <form className="search" onSubmit={onSubmit}>
        <label>
          Check-in
          <input
            type="date"
            value={checkIn}
            min={todayISO()}
            onChange={(e) => {
              setCheckIn(e.target.value)
              if (e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1))
            }}
            required
          />
        </label>
        <label>
          Check-out
          <input
            type="date"
            value={checkOut}
            min={addDays(checkIn, 1)}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </label>
        <label>
          Room type
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">All</option>
            <option value="SINGLE">Single</option>
            <option value="DOUBLE">Double</option>
            <option value="SUITE">Suite</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <Loader text="Checking availability..." />}
      <ErrorMessage message={error} onRetry={onSubmit} />

      {rooms && rooms.length === 0 && (
        <p className="alert alert-info">No rooms available for those dates.</p>
      )}

      {rooms && rooms.length > 0 && (
        <div className="grid">
          {rooms.map((room) => (
            <RoomCard key={room.roomNumber} room={room} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
