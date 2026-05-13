import { Tag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'
import { coupons, formatCurrency } from '../utils/pricing'
import { Button } from './Button'

export function CartTotals({ showCoupon = true }) {
  const [code, setCode] = useState('')
  const { applyCode, clearCode, coupon, couponError, couponMessage, totals } = useCart()

  useEffect(() => {
    if (couponMessage) toast.success(couponMessage)
  }, [couponMessage])

  useEffect(() => {
    if (couponError) toast.error(couponError)
  }, [couponError])

  const handleSubmit = (event) => {
    event.preventDefault()
    applyCode(code)
  }

  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black">Order summary</h2>

      {showCoupon && (
        <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
          <input
            className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
            onChange={(event) => setCode(event.target.value)}
            placeholder="Coupon code"
            value={code}
          />
          <Button className="px-3" type="submit">
            <Tag size={16} />
          </Button>
        </form>
      )}

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
        {coupons.map((entry) => (
          <span className="rounded-md bg-slate-100 px-2 py-1" key={entry.code}>
            {entry.code}
          </span>
        ))}
      </div>

      {couponMessage && (
        <div className="mt-3 flex items-center justify-between rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          {couponMessage}
          <button aria-label="Remove coupon" onClick={clearCode} type="button">
            <X size={16} />
          </button>
        </div>
      )}
      {couponError && <p className="mt-3 text-sm font-semibold text-red-600">{couponError}</p>}

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Subtotal</dt>
          <dd className="font-bold">{formatCurrency(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Discount {coupon ? `(${coupon.code})` : ''}</dt>
          <dd className="font-bold text-emerald-700">-{formatCurrency(totals.discount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">GST / VAT 18%</dt>
          <dd className="font-bold">{formatCurrency(totals.tax)}</dd>
        </div>
        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between text-lg font-black">
            <dt>Total</dt>
            <dd>{formatCurrency(totals.total)}</dd>
          </div>
        </div>
      </dl>
    </aside>
  )
}
