import { useParams, useNavigate, Link } from 'react-router-dom'
import { useReservation } from '../hooks/useReservation.js'
import StatusBadge from '../components/StatusBadge.jsx'
import ServicesSelector from '../components/ServicesSelector.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { formatMoney, formatDate } from '../utils/format.js'

export default function ReservationPanel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reservation, loading, error, actionPending, addService, checkIn, checkOut, reload } =
    useReservation(id)

  if (loading) return <Loader text="Loading reservation..." />
  if (error && !reservation) return <ErrorMessage message={error} onRetry={reload} />
  if (!reservation) return null

  const canAddService = reservation.status === 'CONFIRMED' || reservation.status === 'CHECKED_IN'
  const canCheckIn = reservation.status === 'CONFIRMED'
  const canCheckOut = reservation.status === 'CHECKED_IN'
  const rate = reservation.rate

  async function onCheckOut() {
    const confirmed = window.confirm(
      'Confirm check-out? The final invoice will be generated and the reservation closed.',
    )
    if (!confirmed) return
    const invoice = await checkOut()
    if (invoice) {
      sessionStorage.setItem(`invoice:${id}`, JSON.stringify(invoice))
      navigate(`/reservation/${id}/invoice`)
    }
  }

  return (
    <section>
      <Link to="/" className="back">
        ← New search
      </Link>

      <div className="panel-head">
        <div>
          <h1>Reservation {reservation.id.slice(0, 8)}</h1>
          <p className="muted">
            Room {reservation.roomNumber} · {reservation.roomType}
          </p>
        </div>
        <StatusBadge status={reservation.status} />
      </div>

      <ErrorMessage message={error} />

      <div className="two-col">
        <div className="card">
          <h2>Guest and stay</h2>
          <ul className="data-list">
            <li><span>Guest</span><strong>{reservation.guest.name}</strong></li>
            <li><span>Document</span><strong>{reservation.guest.document}</strong></li>
            <li><span>Email</span><strong>{reservation.guest.email}</strong></li>
            <li><span>Check-in</span><strong>{formatDate(reservation.checkInDate)}</strong></li>
            <li><span>Check-out</span><strong>{formatDate(reservation.checkOutDate)}</strong></li>
            <li><span>Nights</span><strong>{reservation.nights}</strong></li>
            <li><span>Season</span><strong>{reservation.season}</strong></li>
          </ul>

          {reservation.digitalKey && (
            <div className="digital-key">
              <span>Digital key</span>
              <code>{reservation.digitalKey}</code>
            </div>
          )}
        </div>

        <aside className="card">
          <h2>Breakdown</h2>
          <ul className="data-list">
            <li>
              <span>
                Lodging ({rate.nights} nights × {formatMoney(rate.pricePerNight)})
              </span>
              <strong>{formatMoney(rate.total)}</strong>
            </li>
            {reservation.services.map((service, index) => (
              <li key={index}>
                <span>{service.description} ({service.days})</span>
                <strong>{formatMoney(service.subtotal)}</strong>
              </li>
            ))}
            <li className="data-list__total">
              <span>Partial total</span>
              <strong>{formatMoney(reservation.partialTotal)}</strong>
            </li>
          </ul>

          {canAddService && (
            <>
              <h3>Add services</h3>
              <ServicesSelector onAdd={addService} disabled={actionPending} />
            </>
          )}

          <div className="actions">
            {canCheckIn && (
              <button type="button" className="btn btn-primary" disabled={actionPending} onClick={checkIn}>
                Check-in
              </button>
            )}
            {canCheckOut && (
              <button type="button" className="btn btn-primary" disabled={actionPending} onClick={onCheckOut}>
                Check-out
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
