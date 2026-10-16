import { formatMoney } from '../utils/format'

export default function PrecioPreview({ item }) {
  return (
    <dl className="precio-preview">
      <div className="precio-preview__row">
        <dt>Precio / noche</dt>
        <dd>{formatMoney(item.precioPorNoche)}</dd>
      </div>
      <div className="precio-preview__row">
        <dt>Noches</dt>
        <dd>{item.noches}</dd>
      </div>
      <div className="precio-preview__row">
        <dt>Temporada</dt>
        <dd>
          <span className={`badge ${item.temporada === 'ALTA' ? 'badge--alta' : 'badge--baja'}`}>
            {item.temporada}
          </span>
        </dd>
      </div>
      <div className="precio-preview__row precio-preview__total">
        <dt>Total estancia</dt>
        <dd>{formatMoney(item.precioTotal)}</dd>
      </div>
    </dl>
  )
}
