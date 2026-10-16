import PricePreview from './PricePreview.jsx'

const NAMES = { SINGLE: 'Single', DOUBLE: 'Double', SUITE: 'Suite' }

export default function RoomCard({ room, onSelect }) {
  const { roomNumber, roomType, available } = room
  return (
    <article className={`card-room ${available ? '' : 'card-room--occupied'}`}>
      <header className="card-room__head">
        <h3>Room {roomNumber}</h3>
        <span className="chip">{NAMES[roomType] || roomType}</span>
      </header>
      <PricePreview item={room} />
      <button
        type="button"
        className="btn btn-primary"
        disabled={!available}
        onClick={() => onSelect(room)}
      >
        {available ? 'Select' : 'Not available'}
      </button>
    </article>
  )
}
