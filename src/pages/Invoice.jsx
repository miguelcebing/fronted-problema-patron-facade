import { useParams, useLocation, Link } from 'react-router-dom'
import { formatMoney, formatDate } from '../utils/format.js'

function readInvoice(id) {
  try {
    const stored = sessionStorage.getItem(`invoice:${id}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export default function Invoice() {
  const { id } = useParams()
  const { state } = useLocation()
  const invoice = state?.invoice || readInvoice(id)

  if (!invoice) {
    return (
      <section>
        <h1>Invoice not available</h1>
        <p className="alert alert-info">
          The invoice is generated at check-out and is not kept after a page reload.
        </p>
        <Link to={`/reservation/${id}`} className="btn btn-primary">
          Back to reservation
        </Link>
      </section>
    )
  }

  return (
    <section className="invoice">
      <div className="invoice__head">
        <div>
          <h1>Invoice {invoice.number}</h1>
          <p className="muted">Issued on {new Date(invoice.issuedAt).toLocaleString('en-US')}</p>
        </div>
        <button type="button" className="btn btn-ghost no-print" onClick={() => window.print()}>
          Print
        </button>
      </div>

      <div className="card">
        <ul className="data-list">
          <li><span>Guest</span><strong>{invoice.guest.name}</strong></li>
          <li><span>Document</span><strong>{invoice.guest.document}</strong></li>
          <li><span>Room</span><strong>{invoice.room.number} · {invoice.room.type}</strong></li>
          <li><span>Check-in</span><strong>{formatDate(invoice.checkInDate)}</strong></li>
          <li><span>Check-out</span><strong>{formatDate(invoice.checkOutDate)}</strong></li>
          <li><span>Season</span><strong>{invoice.season}</strong></li>
        </ul>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Qty</th>
            <th>Unit price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lines.map((line, index) => (
            <tr key={index}>
              <td>{line.concept}</td>
              <td>{line.quantity}</td>
              <td>{formatMoney(line.unitPrice)}</td>
              <td>{formatMoney(line.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice__totals">
        <p><span>Lodging subtotal</span><strong>{formatMoney(invoice.lodgingSubtotal)}</strong></p>
        <p><span>Services subtotal</span><strong>{formatMoney(invoice.servicesSubtotal)}</strong></p>
        <p className="invoice__total"><span>Total</span><strong>{formatMoney(invoice.total)}</strong></p>
      </div>

      <Link to="/" className="back no-print">
        ← Back to home
      </Link>
    </section>
  )
}
