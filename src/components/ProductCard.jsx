import { Eye, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/pricing'
import { Button } from './Button'

export function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <Link className="aspect-square bg-slate-100" to={`/product/${product.id}`}>
        <img
          alt={product.title}
          className="h-full w-full object-contain p-5"
          loading="lazy"
          src={product.thumbnail}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-normal text-[#9a3412]">{product.category}</p>
          <h2 className="mt-1 line-clamp-2 text-base font-bold text-slate-950">{product.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-black text-[#176b5b]">{formatCurrency(product.price)}</span>
          <div className="flex gap-2">
            <Button aria-label={`View ${product.title}`} as={Link} className="px-3" variant="secondary">
              <Link className="inline-flex items-center" to={`/product/${product.id}`}>
                <Eye size={16} />
              </Link>
            </Button>
            <Button aria-label={`Add ${product.title}`} className="px-3" onClick={() => addItem(product)}>
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
