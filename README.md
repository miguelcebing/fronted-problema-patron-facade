# Hotel Reservas - Frontend (React + Vite) - Patron Facade

Cliente web del Sistema de Reservas de Hotel. **No calcula precios ni totales**: solo muestra lo que
devuelve el backend, cuya unica puerta de entrada es `HotelFacade`.

## Stack

- React 18 + Vite 5 + `react-router-dom`.
- Sin librerias de estado global: hooks + estado del router.
- Estilos en `src/index.css` (paleta sobria, responsive y con estilos `@media print`).

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/ (lo que Vercel despliega)
npm run preview
```

## Variables de entorno

- `VITE_API_URL` - URL base del backend, **sin** barra final.
  - Local: `http://localhost:8080`
  - Produccion: `https://<tu-backend>.up.railway.app`

Las variables `VITE_*` se incrustan en el build; tras cambiarlas en Vercel hay que **redesplegar**.
Copiar `.env.example` a `.env.local` para desarrollo.

## Estructura

```
src/
├── api/hotelApi.js          UNICO lugar que hace fetch (una funcion por endpoint)
├── pages/
│   ├── BuscarHabitaciones.jsx
│   ├── ReservaForm.jsx
│   ├── PanelReserva.jsx
│   └── Factura.jsx
├── components/              HabitacionCard, PrecioPreview, ServiciosSelector, EstadoBadge, Loader, ErrorMessage
├── hooks/                   useDisponibilidad, useReserva
└── utils/                   formatMoney, formatDate
```

## Flujo de pantallas

| Ruta | Pantalla | Endpoint |
|------|----------|----------|
| `/` | Buscador por fechas + cuadricula de habitaciones con preview de precio | `GET /disponibilidad` |
| `/reservar` | Formulario del huesped + resumen | `POST /reservar` |
| `/reserva/:id` | Panel: servicios, resumen, check-in / check-out, llave digital | `POST /servicios`, `PUT /checkin`, `PUT /checkout`, `GET /reserva` |
| `/reserva/:id/factura` | Factura final generada por el servidor (con boton Imprimir) | resultado de `PUT /checkout` |

## Despliegue (Vercel)

1. Vercel -> Add New -> Project -> importar este repo.
2. Framework: **Vite**. Build `npm run build`, salida `dist`.
3. Environment Variable: `VITE_API_URL=https://<tu-backend>.up.railway.app`.
4. Deploy. El `vercel.json` incluido evita 404 al recargar rutas como `/reserva/:id`.

## Equipo

- Miguel Ceballos (miguelcebing)
- Andres (Andres523-star)
- Santiago Rosero (ssantivr)
