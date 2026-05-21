import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const isFormValid = loginSchema.isValidSync({ email, password })

  const validateFields = async (nextValues: { email: string; password: string }) => {
    try {
      await loginSchema.validate(nextValues, { abortEarly: false })
      setErrors({})
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: { email?: string; password?: string } = {}

        error.inner.forEach((item) => {
          if (item.path === 'email' || item.path === 'password') {
            nextErrors[item.path] = item.message
          }
        })

        setErrors(nextErrors)
      }
    }
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false })
      setErrors({})

      const ok = login(email, password)
      if (ok) {
        toast.success('Signed in')
        navigate('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: { email?: string; password?: string } = {}

        error.inner.forEach((item) => {
          if (item.path === 'email' || item.path === 'password') {
            nextErrors[item.path] = item.message
          }
        })

        setErrors(nextErrors)
        return
      }

      toast.error('Unable to sign in')
    }
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-50 px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-md items-center">
        <form onSubmit={handleLogin} className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                value={email}
                onChange={(e) => {
                  const nextEmail = e.target.value
                  setEmail(nextEmail)
                  void validateFields({ email: nextEmail, password })
                }}
                placeholder="demo@example.com"
                className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-400/30"
              />
              {errors.email ? <p className="text-sm text-rose-500">{errors.email}</p> : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                value={password}
                onChange={(e) => {
                  const nextPassword = e.target.value
                  setPassword(nextPassword)
                  void validateFields({ email, password: nextPassword })
                }}
                type="password"
                placeholder="Enter your password"
                className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-400/30"
              />
              {errors.password ? <p className="text-sm text-rose-500">{errors.password}</p> : null}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="h-11 w-full rounded-xl bg-slate-900 px-4 font-semibold text-white transition hover:bg-slate-800 focus-visible:ring-slate-400/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
