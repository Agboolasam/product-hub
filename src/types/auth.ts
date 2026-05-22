export type User = {
  id: string
  name: string
  email: string
  role: string
  profileImageUrl?: string
} | null

export type AuthState = {
  user: User
  token: string | null
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}
