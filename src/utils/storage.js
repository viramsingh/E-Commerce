const AUTH_KEY = 'commerce_auth'
const CART_KEY = 'commerce_cart'
const USERS_KEY = 'commerce_users'

export const readAuth = () => JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')
export const saveAuth = (auth) => localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
export const clearAuth = () => localStorage.removeItem(AUTH_KEY)

export const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]')
export const saveCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items))

export const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
export const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))
