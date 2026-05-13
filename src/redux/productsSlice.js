import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from '../services/productService'

export const loadProducts = createAsyncThunk('products/loadProducts', fetchProducts)
export const loadProduct = createAsyncThunk('products/loadProduct', fetchProductById)
export const addProduct = createAsyncThunk('products/addProduct', createProduct)
export const editProduct = createAsyncThunk('products/editProduct', async ({ id, values }) =>
  updateProduct(id, values),
)
export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
  await deleteProduct(id)
  return id
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selected: null,
    status: 'idle',
    detailStatus: 'idle',
    mutationStatus: 'idle',
    error: '',
  },
  reducers: {
    clearProductError(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadProduct.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = ''
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selected = action.payload
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded'
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addMatcher(
        (action) =>
          [addProduct.pending.type, editProduct.pending.type, removeProduct.pending.type].includes(
            action.type,
          ),
        (state) => {
          state.mutationStatus = 'loading'
          state.error = ''
        },
      )
      .addMatcher(
        (action) => [addProduct.fulfilled.type, editProduct.fulfilled.type].includes(action.type),
        (state, action) => {
          state.mutationStatus = 'succeeded'
          const product = action.payload
          const index = state.items.findIndex((item) => item.id === product.id)

          if (index >= 0) state.items[index] = { ...state.items[index], ...product }
          else state.items.unshift(product)
        },
      )
      .addMatcher(
        (action) =>
          [addProduct.rejected.type, editProduct.rejected.type, removeProduct.rejected.type].includes(
            action.type,
          ),
        (state, action) => {
          state.mutationStatus = 'failed'
          state.error = action.error.message
        },
      )
  },
})

export const { clearProductError } = productsSlice.actions
export default productsSlice.reducer
