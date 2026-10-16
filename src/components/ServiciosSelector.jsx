const SERVICIOS = [
  { tipo: 'SPA', etiqueta: 'Spa ($50)' },
  { tipo: 'DESAYUNO', etiqueta: 'Desayuno ($15/día)' },
  { tipo: 'TRASLADO', etiqueta: 'Traslado ($30)' },
]

export default function ServiciosSelector({ onAgregar, disabled }) {
  return (
    <div className="servicios">
      {SERVICIOS.map((servicio) => (
        <button
          key={servicio.tipo}
          type="button"
          className="btn btn-ghost"
          disabled={disabled}
          onClick={() => onAgregar(servicio.tipo)}
        >
          + {servicio.etiqueta}
        </button>
      ))}
    </div>
  )
}
