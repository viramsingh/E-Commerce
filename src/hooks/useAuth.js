import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, login, logout, signup } from '../redux/authSlice'
import { isTokenExpired } from '../utils/authToken'

export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth.token && isTokenExpired(auth.token)) {
      dispatch(logout())
    }
  }, [auth.token, dispatch])

  return {
    ...auth,
    isAuthenticated: Boolean(auth.token && auth.user),
    signIn: useCallback((values) => dispatch(login(values)), [dispatch]),
    register: useCallback((values) => dispatch(signup(values)), [dispatch]),
    signOut: useCallback(() => dispatch(logout()), [dispatch]),
    clearError: useCallback(() => dispatch(clearAuthError()), [dispatch]),
  }
}
