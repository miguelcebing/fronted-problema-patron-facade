export const formatMoney = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD' }).format(Number(valor ?? 0))

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('es-CO') : ''

export const hoyISO = () => new Date().toISOString().slice(0, 10)

export const sumarDias = (iso, dias) => {
  const fecha = new Date(`${iso}T00:00:00`)
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().slice(0, 10)
}
