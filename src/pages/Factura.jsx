import { useParams, useLocation, Link } from 'react-router-dom'
import { formatMoney, formatDate } from '../utils/format.js'

function leerFactura(id) {
  try {
    const guardada = sessionStorage.getItem(`factura:${id}`)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

export default function Factura() {
  const { id } = useParams()
  const { state } = useLocation()
  const factura = state?.factura || leerFactura(id)

  if (!factura) {
    return (
      <section>
        <h1>Factura no disponible</h1>
        <p className="alert alert-info">
          La factura se genera en el check-out y no se conserva al recargar la página.
        </p>
        <Link to={`/reserva/${id}`} className="btn btn-primary">
          Volver a la reserva
        </Link>
      </section>
    )
  }

  return (
    <section className="factura">
      <div className="factura__head">
        <div>
          <h1>Factura {factura.numeroFactura}</h1>
          <p className="muted">Emitida el {new Date(factura.fechaEmision).toLocaleString('es-CO')}</p>
        </div>
        <button type="button" className="btn btn-ghost no-print" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>

      <div className="card">
        <ul className="data-list">
          <li><span>Huésped</span><strong>{factura.huesped.nombre}</strong></li>
          <li><span>Documento</span><strong>{factura.huesped.documento}</strong></li>
          <li><span>Habitación</span><strong>{factura.habitacion.numero} · {factura.habitacion.tipo}</strong></li>
          <li><span>Entrada</span><strong>{formatDate(factura.fechaEntrada)}</strong></li>
          <li><span>Salida</span><strong>{formatDate(factura.fechaSalida)}</strong></li>
          <li><span>Temporada</span><strong>{factura.temporada}</strong></li>
        </ul>
      </div>

      <table className="tabla-factura">
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {factura.lineas.map((linea, indice) => (
            <tr key={indice}>
              <td>{linea.concepto}</td>
              <td>{linea.cantidad}</td>
              <td>{formatMoney(linea.precioUnitario)}</td>
              <td>{formatMoney(linea.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="factura__totales">
        <p><span>Subtotal alojamiento</span><strong>{formatMoney(factura.subtotalAlojamiento)}</strong></p>
        <p><span>Subtotal servicios</span><strong>{formatMoney(factura.subtotalServicios)}</strong></p>
        <p className="factura__total"><span>Total</span><strong>{formatMoney(factura.total)}</strong></p>
      </div>

      <Link to="/" className="back no-print">
        ← Volver al inicio
      </Link>
    </section>
  )
}
