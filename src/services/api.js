import axios from 'axios'
import { clearAuth, readAuth } from '../utils/storage'
import { isTokenExpired } from '../utils/authToken'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 12000,
})

api.interceptors.request.use((config) => {
  const auth = readAuth()

  if (auth?.token) {
    if (isTokenExpired(auth.token)) {
      clearAuth()
      return config
    }

    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data?.message || error.message),
)
