import { createSlice } from '@reduxjs/toolkit'
import { readCart, saveCart } from '../utils/storage'
import { validateCoupon } from '../utils/pricing'

const initialState = {
  items: readCart(),
  coupon: null,
  couponMessage: '',
  couponError: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          category: product.category,
          quantity: 1,
        })
      }

      saveCart(state.items)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      if (state.items.length === 0) state.coupon = null
      saveCart(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((entry) => entry.id === id)
      const nextQuantity = Number(quantity)

      if (!item || !Number.isInteger(nextQuantity) || nextQuantity < 1) return
      item.quantity = nextQuantity
      saveCart(state.items)
    },
    incrementQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item) item.quantity += 1
      saveCart(state.items)
    },
    decrementQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return
      item.quantity = Math.max(1, item.quantity - 1)
      saveCart(state.items)
    },
    clearCart(state) {
      state.items = []
      state.coupon = null
      state.couponMessage = ''
      state.couponError = ''
      saveCart([])
    },
    applyCoupon(state, action) {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const result = validateCoupon(action.payload, subtotal, state.items)

      if (!result.valid) {
        state.coupon = null
        state.couponMessage = ''
        state.couponError = result.message
        return
      }

      state.coupon = result.coupon
      state.couponMessage = result.message
      state.couponError = ''
    },
    removeCoupon(state) {
      state.coupon = null
      state.couponMessage = ''
      state.couponError = ''
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions
export default cartSlice.reducer
