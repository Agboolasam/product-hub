import useAuthStore from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      {user ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src={user.profileImageUrl} alt="avatar" width={48} height={48} style={{ borderRadius: 8 }} />
          <div>
            <div><strong>{user.name}</strong></div>
            <div>{user.email}</div>
            <div>Role: {user.role}</div>
          </div>
        </div>
      ) : (
        <div>Not signed in.</div>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    </div>
  )
}
