import { create } from 'zustand'
import type { User, AuthState } from '@/types/auth'

const PASSWORD_MATCH = 'AgboolaDev2026@'

function readLocalStorage() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth.token') : null
    const userJson = typeof window !== 'undefined' ? localStorage.getItem('auth.user') : null
    const user = userJson ? (JSON.parse(userJson) as User) : null
    return { token, user }
  } catch (err) {
    return { token: null, user: null }
  }
}

const { token: initialToken, user: initialUser } = readLocalStorage()

const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: initialToken,
  isLoggedIn: Boolean(initialToken),
  login: (email, password) => {
    const ok = password === PASSWORD_MATCH
    if (!ok) return false

    const dummyUser: NonNullable<User> = {
      id: 'demo-1',
      name: 'Demo User',
      email,
      role: 'admin',
      profileImageUrl: 'https://api.dicebear.com/6.x/identicon/svg?seed=DemoUser',
    }

    // create a simple demo token and persist
    const token = `demo-token-${Date.now()}`
    try {
      localStorage.setItem('auth.token', token)
      localStorage.setItem('auth.user', JSON.stringify(dummyUser))
    } catch (err) {
      // ignore localStorage errors
    }

    set({ user: dummyUser, isLoggedIn: true, token })
    return true
  },
  logout: () => {
    try {
      localStorage.removeItem('auth.token')
      localStorage.removeItem('auth.user')
    } catch (err) {
      // ignore
    }
    set({ user: null, isLoggedIn: false, token: null })
  },
}))

export default useAuthStore
