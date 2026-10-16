export default function ErrorMessage({ mensaje, onRetry }) {
  if (!mensaje) return null
  return (
    <div className="alert alert-error" role="alert">
      <p>{mensaje}</p>
      {onRetry && (
        <button type="button" className="btn btn-ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}
