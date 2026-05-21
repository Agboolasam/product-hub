import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import useAuthStore from '@/store/useAuthStore'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  if (!isLoggedIn) return <Navigate to="/login" replace />

  return children
}