import { useState } from 'react'
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom'
import { crearReserva } from '../api/hotelApi.js'
import PrecioPreview from '../components/PrecioPreview.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { formatDate } from '../utils/format.js'

export default function ReservaForm() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ nombreHuesped: '', documento: '', email: '' })

  if (!state?.numeroHabitacion) {
    return <Navigate to="/" replace />
  }

  const { numeroHabitacion, fechaEntrada, fechaSalida, item } = state

  function actualizar(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      const reserva = await crearReserva({
        ...form,
        numeroHabitacion,
        fechaEntrada,
        fechaSalida,
      })
      navigate(`/reserva/${reserva.id}`)
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section>
      <Link to="/" className="back">
        ← Volver a la búsqueda
      </Link>
      <h1>Datos del huésped</h1>

      <div className="two-col">
        <form className="form" onSubmit={onSubmit}>
          <label>
            Nombre completo
            <input
              value={form.nombreHuesped}
              onChange={(e) => actualizar('nombreHuesped', e.target.value)}
              required
            />
          </label>
          <label>
            Documento
            <input
              value={form.documento}
              onChange={(e) => actualizar('documento', e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => actualizar('email', e.target.value)}
              required
            />
          </label>

          <ErrorMessage mensaje={error} />

          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={enviando}>
              {enviando ? 'Reservando...' : 'Confirmar reserva'}
            </button>
          </div>
        </form>

        <aside className="card summary">
          <h2>Resumen</h2>
          <p className="muted">
            Habitación <strong>{numeroHabitacion}</strong>
          </p>
          <p className="muted">
            {formatDate(fechaEntrada)} → {formatDate(fechaSalida)}
          </p>
          {item && <PrecioPreview item={item} />}
        </aside>
      </div>
    </section>
  )
}
