import { useParams, useNavigate, Link } from 'react-router-dom'
import { useReserva } from '../hooks/useReserva.js'
import EstadoBadge from '../components/EstadoBadge.jsx'
import ServiciosSelector from '../components/ServiciosSelector.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { formatMoney, formatDate } from '../utils/format.js'

export default function PanelReserva() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reserva, cargando, error, accionEnCurso, agregar, checkIn, checkOut, recargar } = useReserva(id)

  if (cargando) return <Loader texto="Cargando reserva..." />
  if (error && !reserva) return <ErrorMessage mensaje={error} onRetry={recargar} />
  if (!reserva) return null

  const puedeAgregar = reserva.estado === 'CONFIRMADA' || reserva.estado === 'CHECK_IN'
  const puedeCheckIn = reserva.estado === 'CONFIRMADA'
  const puedeCheckOut = reserva.estado === 'CHECK_IN'
  const desglose = reserva.desgloseTarifa

  async function onCheckOut() {
    const confirmado = window.confirm(
      '¿Confirmas el check-out? Se generará la factura final y se cerrará la reserva.',
    )
    if (!confirmado) return
    const factura = await checkOut()
    if (factura) {
      sessionStorage.setItem(`factura:${id}`, JSON.stringify(factura))
      navigate(`/reserva/${id}/factura`)
    }
  }

  return (
    <section>
      <Link to="/" className="back">
        ← Nueva búsqueda
      </Link>

      <div className="panel-head">
        <div>
          <h1>Reserva {reserva.id.slice(0, 8)}</h1>
          <p className="muted">Habitación {reserva.numeroHabitacion} · {reserva.tipoHabitacion}</p>
        </div>
        <EstadoBadge estado={reserva.estado} />
      </div>

      <ErrorMessage mensaje={error} />

      <div className="two-col">
        <div className="card">
          <h2>Huésped y estancia</h2>
          <ul className="data-list">
            <li><span>Huésped</span><strong>{reserva.huesped.nombre}</strong></li>
            <li><span>Documento</span><strong>{reserva.huesped.documento}</strong></li>
            <li><span>Email</span><strong>{reserva.huesped.email}</strong></li>
            <li><span>Entrada</span><strong>{formatDate(reserva.fechaEntrada)}</strong></li>
            <li><span>Salida</span><strong>{formatDate(reserva.fechaSalida)}</strong></li>
            <li><span>Noches</span><strong>{reserva.noches}</strong></li>
            <li><span>Temporada</span><strong>{reserva.temporada}</strong></li>
          </ul>

          {reserva.llaveDigital && (
            <div className="llave">
              <span>Llave digital</span>
              <code>{reserva.llaveDigital}</code>
            </div>
          )}
        </div>

        <aside className="card">
          <h2>Desglose</h2>
          <ul className="data-list">
            <li>
              <span>Alojamiento ({desglose.noches} noches × {formatMoney(desglose.precioNoche)})</span>
              <strong>{formatMoney(desglose.total)}</strong>
            </li>
            {reserva.servicios.map((servicio, indice) => (
              <li key={indice}>
                <span>{servicio.descripcion} ({servicio.cantidadDias})</span>
                <strong>{formatMoney(servicio.subtotal)}</strong>
              </li>
            ))}
            <li className="data-list__total">
              <span>Total parcial</span>
              <strong>{formatMoney(reserva.totalParcial)}</strong>
            </li>
          </ul>

          {puedeAgregar && (
            <>
              <h3>Agregar servicios</h3>
              <ServiciosSelector onAgregar={agregar} disabled={accionEnCurso} />
            </>
          )}

          <div className="actions">
            {puedeCheckIn && (
              <button type="button" className="btn btn-primary" disabled={accionEnCurso} onClick={checkIn}>
                Hacer check-in
              </button>
            )}
            {puedeCheckOut && (
              <button type="button" className="btn btn-primary" disabled={accionEnCurso} onClick={onCheckOut}>
                Hacer check-out
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
