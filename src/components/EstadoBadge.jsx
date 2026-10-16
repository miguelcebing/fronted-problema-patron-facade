const ETIQUETAS = {
  CONFIRMADA: { texto: 'Confirmada', clase: 'badge--info' },
  CHECK_IN: { texto: 'En estadía', clase: 'badge--ok' },
  CHECK_OUT: { texto: 'Finalizada', clase: 'badge--muted' },
}

export default function EstadoBadge({ estado }) {
  const etiqueta = ETIQUETAS[estado] || { texto: estado, clase: 'badge--muted' }
  return <span className={`badge ${etiqueta.clase}`}>{etiqueta.texto}</span>
}
