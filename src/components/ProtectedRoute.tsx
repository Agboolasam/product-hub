import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import useAuthStore from '@/store/useAuthStore'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  // also check for a persisted token in localStorage to survive page reloads
  let token: string | null = null
  try {
    token = typeof window !== 'undefined' ? localStorage.getItem('auth.token') : null
  } catch (err) {
    token = null
  }

  if (!isLoggedIn && !token) return <Navigate to="/login" replace />

  return children
}