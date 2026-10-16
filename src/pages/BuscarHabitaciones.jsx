import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HabitacionCard from '../components/HabitacionCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useDisponibilidad } from '../hooks/useDisponibilidad.js'
import { hoyISO, sumarDias } from '../utils/format.js'

export default function BuscarHabitaciones() {
  const navigate = useNavigate()
  const { habitaciones, cargando, error, buscar } = useDisponibilidad()

  const [fechaEntrada, setFechaEntrada] = useState(hoyISO())
  const [fechaSalida, setFechaSalida] = useState(sumarDias(hoyISO(), 2))
  const [tipo, setTipo] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    if (!fechaEntrada || !fechaSalida || fechaSalida <= fechaEntrada) return
    buscar({ fechaEntrada, fechaSalida, tipo: tipo || undefined })
  }

  function seleccionar(item) {
    navigate('/reservar', {
      state: { numeroHabitacion: item.numero, fechaEntrada, fechaSalida, item },
    })
  }

  return (
    <section>
      <h1>Buscar disponibilidad</h1>
      <p className="muted">Consulta habitaciones libres por fechas y compara el precio dinámico según temporada.</p>

      <form className="search" onSubmit={onSubmit}>
        <label>
          Entrada
          <input
            type="date"
            value={fechaEntrada}
            min={hoyISO()}
            onChange={(e) => {
              setFechaEntrada(e.target.value)
              if (e.target.value >= fechaSalida) setFechaSalida(sumarDias(e.target.value, 1))
            }}
            required
          />
        </label>
        <label>
          Salida
          <input
            type="date"
            value={fechaSalida}
            min={sumarDias(fechaEntrada, 1)}
            onChange={(e) => setFechaSalida(e.target.value)}
            required
          />
        </label>
        <label>
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="SENCILLA">Sencilla</option>
            <option value="DOBLE">Doble</option>
            <option value="SUITE">Suite</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {cargando && <Loader texto="Consultando disponibilidad..." />}
      <ErrorMessage mensaje={error} onRetry={onSubmit} />

      {habitaciones && habitaciones.length === 0 && (
        <p className="alert alert-info">No hay habitaciones para esas fechas.</p>
      )}

      {habitaciones && habitaciones.length > 0 && (
        <div className="grid">
          {habitaciones.map((item) => (
            <HabitacionCard key={item.numero} habitacion={item} onSeleccionar={seleccionar} />
          ))}
        </div>
      )}
    </section>
  )
}
