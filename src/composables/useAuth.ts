import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSession, setSession, clearSession, isAuthenticated } from '../utils/storage'

export interface User {
  email: string
  name: string
}

export function useAuth() {
  const router = useRouter()
  const user = ref<User | null>(null)

  const checkAuth = () => {
    const session = getSession()
    if (session) {
      user.value = session
    } else {
      user.value = null
    }
  }

  const login = (email: string, password: string): User => {
    // In real apps, you'd validate via API here.
    const userData: User = {
      email,
      name: email.split('@')[0] || 'User'
    }
    setSession(userData)
    user.value = userData
    return userData
  }

  const signup = (email: string, password: string): User => {
    // Could call backend registration here
    return login(email, password)
  }

  const logout = () => {
    clearSession()
    user.value = null
    router.push('/')
  }

  // Automatically check auth on mount
  onMounted(() => {
    checkAuth()
  })

  return {
    user,
    checkAuth,
    login,
    signup,
    logout,
    isAuthenticated
  }
}
