const LABELS = {
  CONFIRMED: { text: 'Confirmed', className: 'badge--info' },
  CHECKED_IN: { text: 'Checked-in', className: 'badge--ok' },
  CHECKED_OUT: { text: 'Checked-out', className: 'badge--muted' },
}

export default function StatusBadge({ status }) {
  const label = LABELS[status] || { text: status, className: 'badge--muted' }
  return <span className={`badge ${label.className}`}>{label.text}</span>
}
