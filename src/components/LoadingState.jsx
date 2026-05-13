export function LoadingState({ label = 'Loading' }) {
  return (
    <div className="grid min-h-56 place-items-center text-sm font-semibold text-slate-500">
      {label}...
    </div>
  )
}
