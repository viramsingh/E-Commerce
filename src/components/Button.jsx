export function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-[#176b5b] text-white hover:bg-[#12564a]',
    secondary: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50',
    danger: 'bg-[#b42318] text-white hover:bg-[#912018]',
    ghost: 'text-slate-700 hover:bg-slate-100',
  }

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
