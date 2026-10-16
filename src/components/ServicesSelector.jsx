const SERVICES = [
  { type: 'SPA', label: 'Spa ($50)' },
  { type: 'BREAKFAST', label: 'Breakfast ($15/day)' },
  { type: 'TRANSFER', label: 'Transfer ($30)' },
]

export default function ServicesSelector({ onAdd, disabled }) {
  return (
    <div className="services">
      {SERVICES.map((service) => (
        <button
          key={service.type}
          type="button"
          className="btn btn-ghost"
          disabled={disabled}
          onClick={() => onAdd(service.type)}
        >
          + {service.label}
        </button>
      ))}
    </div>
  )
}
