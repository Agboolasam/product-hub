import { create } from 'zustand'
import type { User, AuthState } from '@/types/auth'

const PASSWORD_MATCH = 'AgboolaDev2026@'

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
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

    set({ user: dummyUser, isLoggedIn: true })
    return true
  },
  logout: () => {
    set({ user: null, isLoggedIn: false })
  },
}))

export default useAuthStore
