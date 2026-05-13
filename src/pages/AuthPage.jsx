import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ErrorState } from '../components/ErrorState'
import { useAuth } from '../hooks/useAuth'

export function AuthPage({ mode }) {
  const isSignup = mode === 'signup'
  const { clearError, error, isAuthenticated, register: registerUser, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm()

  useEffect(() => {
    clearError()
  }, [clearError, mode])

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(isSignup ? 'Account created' : 'Logged in successfully')
      navigate(from, { replace: true })
    }
  }, [from, isAuthenticated, isSignup, navigate])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const onSubmit = (values) => {
    if (isSignup) registerUser(values)
    else signIn(values)
  }

  return (
    <section className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-black">{isSignup ? 'Create account' : 'Login'}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {isSignup ? 'Create a local demo account with an expiring JWT token.' : 'Use an account created on the signup page.'}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {isSignup && (
          <label className="block">
            <span className="text-sm font-bold">Name</span>
            <input
              className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
          </label>
        )}
        <label className="block">
          <span className="text-sm font-bold">Email</span>
          <input
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
        </label>
        <label className="block">
          <span className="text-sm font-bold">Password</span>
          <input
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/20"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
        </label>

        <ErrorState message={error} />
        <Button className="w-full" type="submit">
          {isSignup ? 'Sign up' : 'Login'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
        <Link className="font-bold text-[#176b5b]" to={isSignup ? '/login' : '/signup'}>
          {isSignup ? 'Login' : 'Sign up'}
        </Link>
      </p>
    </section>
  )
}
