import { Routes, Route, Link, Navigate } from 'react-router-dom'
import AvailabilitySearch from './pages/AvailabilitySearch.jsx'
import ReservationForm from './pages/ReservationForm.jsx'
import ReservationPanel from './pages/ReservationPanel.jsx'
import Invoice from './pages/Invoice.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">H</span>
          <span>
            <strong>Hotel Aurora</strong>
            <small>Reservation System · Facade Pattern</small>
          </span>
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<AvailabilitySearch />} />
          <Route path="/reserve" element={<ReservationForm />} />
          <Route path="/reservation/:id" element={<ReservationPanel />} />
          <Route path="/reservation/:id/invoice" element={<Invoice />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        State persisted in PostgreSQL · survives restarts
      </footer>
    </div>
  )
}
