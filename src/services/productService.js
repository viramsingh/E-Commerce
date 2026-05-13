import { api } from './api'

export async function fetchProducts() {
  const { data } = await api.get('/products?limit=60')
  return data.products
}

export async function fetchProductById(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function createProduct(payload) {
  const { data } = await api.post('/products/add', payload)
  return data
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`)
  return data
}
