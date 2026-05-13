import { ArrowLeft, Plus, Star } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { useCart } from '../hooks/useCart'
import { useDispatch, useSelector } from 'react-redux'
import { loadProduct } from '../redux/productsSlice'
import { formatCurrency } from '../utils/pricing'

export function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { addItem } = useCart()
  const { selected: product, detailStatus, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(loadProduct(id))
  }, [dispatch, id])

  if (detailStatus === 'loading' || !product) return <LoadingState label="Loading product" />

  return (
    <div className="space-y-5">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950" to="/">
        <ArrowLeft size={16} /> Back to products
      </Link>
      <ErrorState message={error} />
      <section className="grid overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="bg-slate-100 p-6">
          <img alt={product.title} className="mx-auto aspect-square max-h-[520px] w-full object-contain" src={product.thumbnail} />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((image) => (
              <img alt="" className="aspect-square rounded-md bg-white object-contain p-2" key={image} src={image} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-[#9a3412]">{product.category}</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">{product.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Star className="fill-[#f59e0b] text-[#f59e0b]" size={18} />
              {product.rating} rating
              <span className="text-slate-300">|</span>
              {product.stock} in stock
            </div>
          </div>
          <p className="text-slate-600">{product.description}</p>
          <div className="text-3xl font-black text-[#176b5b]">{formatCurrency(product.price)}</div>
          <Button className="w-full sm:w-fit" onClick={() => addItem(product)}>
            <Plus size={18} /> Add to cart
          </Button>
        </div>
      </section>
    </div>
  )
}
