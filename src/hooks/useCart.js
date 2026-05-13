import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addToCart,
  applyCoupon,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeCoupon,
  removeFromCart,
  updateQuantity,
} from '../redux/cartSlice'
import { calculateDiscount, TAX_RATE } from '../utils/pricing'

export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const totals = useMemo(() => {
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = calculateDiscount(subtotal, cart.coupon, cart.items)
    const taxable = Math.max(0, subtotal - discount)
    const tax = taxable * TAX_RATE

    return {
      subtotal,
      discount,
      tax,
      total: taxable + tax,
      count: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    }
  }, [cart.coupon, cart.items])

  const addItem = useCallback(
    (product) => {
      dispatch(addToCart(product))
      toast.success(`${product.title} added to cart`)
    },
    [dispatch],
  )

  const removeItem = useCallback(
    (id) => {
      dispatch(removeFromCart(id))
      toast.info('Item removed from cart')
    },
    [dispatch],
  )

  const applyCode = useCallback(
    (code) => {
      const normalizedCode = code.trim()
      if (!normalizedCode) {
        toast.error('Enter a coupon code')
        return
      }

      dispatch(applyCoupon(normalizedCode))
    },
    [dispatch],
  )

  const emptyCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  return {
    ...cart,
    totals,
    addItem,
    removeItem,
    setQuantity: useCallback((id, quantity) => dispatch(updateQuantity({ id, quantity })), [dispatch]),
    increment: useCallback((id) => dispatch(incrementQuantity(id)), [dispatch]),
    decrement: useCallback((id) => dispatch(decrementQuantity(id)), [dispatch]),
    applyCode,
    clearCode: useCallback(() => dispatch(removeCoupon()), [dispatch]),
    emptyCart,
  }
}
