import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { ProductCard } from '../components/ProductCard'
import { loadProducts } from '../redux/productsSlice'

export function ProductListPage() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    if (status === 'idle') dispatch(loadProducts())
  }, [dispatch, status])

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(items.map((product) => product.category)))],
    [items],
  )

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return items.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [category, items, query])

  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Product catalog</h1>
          <p className="mt-1 text-sm text-slate-600">
            Public sample data from DummyJSON with cart, coupons, checkout, and protected routes.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_190px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="h-11 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              value={query}
            />
          </label>
          <select
            className="h-11 rounded-md border border-slate-300 px-3 text-sm capitalize outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {categories.map((entry) => (
              <option key={entry} value={entry}>
                {entry.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </section>

      <ErrorState message={error} />
      {status === 'loading' ? (
        <LoadingState label="Loading products" />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  )
}
