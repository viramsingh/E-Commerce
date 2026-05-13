import { LogOut, PackagePlus, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { Button } from './Button'

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
    isActive ? 'bg-[#176b5b] text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

export function Layout() {
  const { totals } = useCart()
  const { isAuthenticated, user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    toast.info('Logged out')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <Link className="inline-flex items-center gap-3 text-lg font-black" to="/">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#176b5b] text-white">
              <ShoppingBag size={22} />
            </span>
            MarketStack
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navLinkClass} to="/">
              <ShoppingBag size={16} /> Products
            </NavLink>
            <NavLink className={navLinkClass} to="/admin/products">
              <PackagePlus size={16} /> Manage
            </NavLink>
            <NavLink className={navLinkClass} to="/cart">
              <ShoppingCart size={16} /> Cart ({totals.count})
            </NavLink>
            {isAuthenticated ? (
              <Button className="px-3" onClick={handleLogout} variant="ghost">
                <LogOut size={16} /> {user.name}
              </Button>
            ) : (
              <NavLink className={navLinkClass} to="/login">
                <UserRound size={16} /> Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}
