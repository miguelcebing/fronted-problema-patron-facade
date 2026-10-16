import PrecioPreview from './PrecioPreview.jsx'

const NOMBRES = { SENCILLA: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite' }

export default function HabitacionCard({ habitacion, onSeleccionar }) {
  const { numero, tipo, disponible } = habitacion
  return (
    <article className={`card-room ${disponible ? '' : 'card-room--ocupada'}`}>
      <header className="card-room__head">
        <h3>Habitación {numero}</h3>
        <span className="chip">{NOMBRES[tipo] || tipo}</span>
      </header>
      <PrecioPreview item={habitacion} />
      <button
        type="button"
        className="btn btn-primary"
        disabled={!disponible}
        onClick={() => onSeleccionar(habitacion)}
      >
        {disponible ? 'Seleccionar' : 'No disponible'}
      </button>
    </article>
  )
}
