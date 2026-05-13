import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { CartTotals } from '../components/CartTotals'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/pricing'

export function CartPage() {
  const { decrement, increment, items, removeItem, totals } = useCart()

  if (items.length === 0) {
    return (
      <section className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-black">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Add a product to see quantity controls and live totals.</p>
        <Button className="mt-5" variant="primary">
          <Link to="/">Browse products</Link>
        </Button>
      </section>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h1 className="text-2xl font-black">Shopping cart</h1>
          <p className="mt-1 text-sm text-slate-600">{totals.count} items selected</p>
        </div>
        <div className="divide-y divide-slate-200">
          {items.map((item) => (
            <article className="grid gap-4 p-5 sm:grid-cols-[88px_1fr_auto] sm:items-center" key={item.id}>
              <img alt={item.title} className="h-22 w-22 rounded-md bg-slate-100 object-contain p-2" src={item.thumbnail} />
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1 text-sm capitalize text-slate-500">{item.category}</p>
                <p className="mt-2 font-black text-[#176b5b]">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 items-center overflow-hidden rounded-md border border-slate-300">
                  <button aria-label="Decrease quantity" className="grid h-10 w-10 place-items-center hover:bg-slate-100" onClick={() => decrement(item.id)} type="button">
                    <Minus size={16} />
                  </button>
                  <span className="grid h-10 w-10 place-items-center text-sm font-bold">{item.quantity}</span>
                  <button aria-label="Increase quantity" className="grid h-10 w-10 place-items-center hover:bg-slate-100" onClick={() => increment(item.id)} type="button">
                    <Plus size={16} />
                  </button>
                </div>
                <button aria-label="Remove item" className="grid h-10 w-10 place-items-center rounded-md text-red-600 hover:bg-red-50" onClick={() => removeItem(item.id)} type="button">
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="space-y-4">
        <CartTotals />
        <Button className="w-full" disabled={items.length === 0}>
          <Link to="/checkout">Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  )
}
