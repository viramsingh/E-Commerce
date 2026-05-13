import { CheckCircle2, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../components/Button'
import { CartTotals } from '../components/CartTotals'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/pricing'

export function CheckoutPage() {
  const [placed, setPlaced] = useState(false)
  const { decrement, emptyCart, increment, items, totals } = useCart()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm()

  const onSubmit = () => {
    setPlaced(true)
    toast.success('Order placed successfully')
    emptyCart()
  }

  if (placed) {
    return (
      <section className="mx-auto max-w-xl rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-[#176b5b]" size={48} />
        <h1 className="mt-4 text-2xl font-black">Order placed</h1>
        <p className="mt-2 text-slate-600">Your demo checkout is complete.</p>
        <Button className="mt-5">
          <Link to="/">Continue shopping</Link>
        </Button>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-black">Nothing to checkout</h1>
        <Button className="mt-5">
          <Link to="/">Browse products</Link>
        </Button>
      </section>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-black">Checkout</h1>
          <div className="mt-4 divide-y divide-slate-200">
            {items.map((item) => (
              <article className="grid gap-4 py-4 sm:grid-cols-[72px_1fr_auto] sm:items-center" key={item.id}>
                <img alt={item.title} className="h-18 w-18 rounded-md bg-slate-100 object-contain p-2" src={item.thumbnail} />
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-sm text-slate-600">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center rounded-md border border-slate-300" onClick={() => decrement(item.id)} type="button">
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                  <button aria-label="Increase quantity" className="grid h-9 w-9 place-items-center rounded-md border border-slate-300" onClick={() => increment(item.id)} type="button">
                    <Plus size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <form className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-black">Delivery details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold">Full name</span>
              <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" {...register('name', { required: 'Name is required' })} />
              {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
            </label>
            <label className="block">
              <span className="text-sm font-bold">Email</span>
              <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" type="email" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-bold">Address</span>
              <textarea className="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" {...register('address', { required: 'Address is required' })} />
              {errors.address && <span className="text-sm text-red-600">{errors.address.message}</span>}
            </label>
          </div>
          <Button className="mt-5 w-full sm:w-fit" disabled={totals.total <= 0} type="submit">
            Place order
          </Button>
        </form>
      </section>
      <CartTotals />
    </div>
  )
}
