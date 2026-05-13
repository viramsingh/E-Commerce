import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from '../components/Button'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { addProduct, editProduct, loadProducts, removeProduct } from '../redux/productsSlice'
import { formatCurrency } from '../utils/pricing'

const emptyProduct = {
  title: '',
  price: '',
  category: '',
  description: '',
  thumbnail: '',
}

export function AdminProductsPage() {
  const dispatch = useDispatch()
  const { error, items, mutationStatus, status } = useSelector((state) => state.products)
  const [editingProduct, setEditingProduct] = useState(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues: emptyProduct })

  useEffect(() => {
    if (status === 'idle') dispatch(loadProducts())
  }, [dispatch, status])

  const categories = useMemo(
    () => Array.from(new Set(items.map((product) => product.category))).filter(Boolean),
    [items],
  )

  const startCreate = () => {
    setEditingProduct(null)
    reset(emptyProduct)
  }

  const startEdit = (product) => {
    setEditingProduct(product)
    reset({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      thumbnail: product.thumbnail,
    })
  }

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      images: values.thumbnail ? [values.thumbnail] : [],
    }

    if (editingProduct) {
      await dispatch(editProduct({ id: editingProduct.id, values: payload })).unwrap()
      toast.success('Product updated')
    } else {
      await dispatch(addProduct(payload)).unwrap()
      toast.success('Product created')
    }

    startCreate()
  }

  const handleDelete = async (id) => {
    await dispatch(removeProduct(id)).unwrap()
    toast.info('Product deleted')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black">{editingProduct ? 'Update product' : 'Create product'}</h1>
            <p className="mt-1 text-sm text-slate-600">CRUD writes are sent to DummyJSON demo endpoints.</p>
          </div>
          {editingProduct && (
            <button aria-label="Cancel edit" className="grid h-9 w-9 place-items-center rounded-md hover:bg-slate-100" onClick={startCreate} type="button">
              <X size={18} />
            </button>
          )}
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-sm font-bold">Name</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" {...register('title', { required: 'Product name is required' })} />
            {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-bold">Price</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" min="1" step="0.01" type="number" {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be above zero' } })} />
            {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-bold">Category</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" list="categories" {...register('category', { required: 'Category is required' })} />
            <datalist id="categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-bold">Image URL</span>
            <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3" {...register('thumbnail', { required: 'Image is required' })} />
            {errors.thumbnail && <span className="text-sm text-red-600">{errors.thumbnail.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm font-bold">Description</span>
            <textarea className="mt-1 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2" {...register('description', { required: 'Description is required', minLength: { value: 12, message: 'Add a clearer description' } })} />
            {errors.description && <span className="text-sm text-red-600">{errors.description.message}</span>}
          </label>
          <ErrorState message={error} />
          <Button className="w-full" disabled={mutationStatus === 'loading'} type="submit">
            <Plus size={16} /> {editingProduct ? 'Save product' : 'Create product'}
          </Button>
        </form>
      </section>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">Catalog products</h2>
        </div>
        {status === 'loading' ? (
          <LoadingState label="Loading catalog" />
        ) : (
          <div className="divide-y divide-slate-200">
            {items.map((product) => (
              <article className="grid gap-4 p-4 sm:grid-cols-[76px_1fr_auto] sm:items-center" key={product.id}>
                <img alt={product.title} className="h-19 w-19 rounded-md bg-slate-100 object-contain p-2" src={product.thumbnail} />
                <div>
                  <h3 className="font-bold">{product.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                  <p className="mt-1 text-sm font-black text-[#176b5b]">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex gap-2">
                  <Button aria-label="Edit product" className="px-3" onClick={() => startEdit(product)} variant="secondary">
                    <Pencil size={16} />
                  </Button>
                  <Button aria-label="Delete product" className="px-3" onClick={() => handleDelete(product.id)} variant="danger">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
