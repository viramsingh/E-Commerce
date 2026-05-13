import { createSlice } from '@reduxjs/toolkit'
import { createToken, isTokenExpired } from '../utils/authToken'
import { clearAuth, readAuth, readUsers, saveAuth, saveUsers } from '../utils/storage'

const existingAuth = readAuth()
const initialAuth = existingAuth?.token && !isTokenExpired(existingAuth.token) ? existingAuth : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialAuth?.user || null,
    token: initialAuth?.token || '',
    error: '',
  },
  reducers: {
    signup(state, action) {
      const { name, email, password } = action.payload
      const users = readUsers()

      if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        state.error = 'An account with this email already exists.'
        return
      }

      const user = { id: crypto.randomUUID(), name, email, password }
      const safeUser = { id: user.id, name, email }
      const token = createToken(safeUser)
      saveUsers([...users, user])
      saveAuth({ user: safeUser, token })

      state.user = safeUser
      state.token = token
      state.error = ''
    },
    login(state, action) {
      const { email, password } = action.payload
      const user = readUsers().find(
        (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
      )

      if (!user) {
        state.error = 'Invalid email or password.'
        return
      }

      const safeUser = { id: user.id, name: user.name, email: user.email }
      const token = createToken(safeUser)
      saveAuth({ user: safeUser, token })

      state.user = safeUser
      state.token = token
      state.error = ''
    },
    logout(state) {
      clearAuth()
      state.user = null
      state.token = ''
      state.error = ''
    },
    clearAuthError(state) {
      state.error = ''
    },
  },
})

export const { signup, login, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
