import { Routes, Route, Link, Navigate } from 'react-router-dom'
import BuscarHabitaciones from './pages/BuscarHabitaciones.jsx'
import ReservaForm from './pages/ReservaForm.jsx'
import PanelReserva from './pages/PanelReserva.jsx'
import Factura from './pages/Factura.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">H</span>
          <span>
            <strong>Hotel Aurora</strong>
            <small>Sistema de Reservas · Patrón Facade</small>
          </span>
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<BuscarHabitaciones />} />
          <Route path="/reservar" element={<ReservaForm />} />
          <Route path="/reserva/:id" element={<PanelReserva />} />
          <Route path="/reserva/:id/factura" element={<Factura />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        Estado en memoria · Los datos se reinician al reiniciar el backend
      </footer>
    </div>
  )
}
