import { useState } from 'react'
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom'
import { createReservation } from '../api/hotelApi.js'
import PricePreview from '../components/PricePreview.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { formatDate } from '../utils/format.js'

export default function ReservationForm() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ guestName: '', document: '', email: '' })

  if (!state?.roomNumber) {
    return <Navigate to="/" replace />
  }

  const { roomNumber, checkIn, checkOut, item } = state

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setSending(true)
    setError(null)
    try {
      const reservation = await createReservation({
        ...form,
        roomNumber,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      })
      navigate(`/reservation/${reservation.id}`)
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section>
      <Link to="/" className="back">
        ← Back to search
      </Link>
      <h1>Guest details</h1>

      <div className="two-col">
        <form className="form" onSubmit={onSubmit}>
          <label>
            Full name
            <input
              value={form.guestName}
              onChange={(e) => update('guestName', e.target.value)}
              required
            />
          </label>
          <label>
            Document
            <input
              value={form.document}
              onChange={(e) => update('document', e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
            />
          </label>

          <ErrorMessage message={error} />

          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Booking...' : 'Confirm reservation'}
            </button>
          </div>
        </form>

        <aside className="card summary">
          <h2>Summary</h2>
          <p className="muted">
            Room <strong>{roomNumber}</strong>
          </p>
          <p className="muted">
            {formatDate(checkIn)} → {formatDate(checkOut)}
          </p>
          {item && <PricePreview item={item} />}
        </aside>
      </div>
    </section>
  )
}
