import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

function AppShell() {
  const location = useLocation()
  const showHeader = location.pathname !== '/login' && location.pathname !== '/'
  return (
    <>
      {showHeader ? <Header /> : null}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}



export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
