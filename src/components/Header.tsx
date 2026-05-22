import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const [open, setOpen] = useState<boolean>(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/products" className="text-lg font-bold text-slate-900">
            ProductHub
          </Link>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Button onClick={handleLogout} className="inline-flex items-center gap-2" variant="outline">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
              className="inline-flex items-center justify-center rounded-md p-2"
              variant="ghost"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden py-2">
            <nav className="flex flex-col gap-2">
              <Link onClick={() => setOpen(false)} to="/products" className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md">Products</Link>
              <button onClick={() => { setOpen(false); handleLogout() }} className="px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-md">Logout</button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
