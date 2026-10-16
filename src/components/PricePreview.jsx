import { formatMoney } from '../utils/format'

export default function PricePreview({ item }) {
  return (
    <dl className="price-preview">
      <div className="price-preview__row">
        <dt>Price / night</dt>
        <dd>{formatMoney(item.pricePerNight)}</dd>
      </div>
      <div className="price-preview__row">
        <dt>Nights</dt>
        <dd>{item.nights}</dd>
      </div>
      <div className="price-preview__row">
        <dt>Season</dt>
        <dd>
          <span className={`badge ${item.season === 'HIGH' ? 'badge--alta' : 'badge--baja'}`}>
            {item.season}
          </span>
        </dd>
      </div>
      <div className="price-preview__row price-preview__total">
        <dt>Stay total</dt>
        <dd>{formatMoney(item.totalPrice)}</dd>
      </div>
    </dl>
  )
}
