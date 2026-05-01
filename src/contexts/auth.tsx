import * as React from 'react'
import type { User } from '#/types/user'
import { useGetUser } from '#/features/auth/profile/hooks/use-get-user'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isPending: boolean
  login: (token: string, userData: User) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const { data: fetchedUser, isPending, isError } = useGetUser()

  React.useEffect(() => {
    // Check for window to avoid SSR errors with localStorage
    if (typeof window !== 'undefined') {
      if (fetchedUser) setUser(fetchedUser)
      if (isError) localStorage.removeItem('token')
    }
  }, [fetchedUser, isError])

  const value = React.useMemo(
    () => ({
      // If we are still fetching and don't have a user yet, we are pending
      isAuthenticated: !!user,
      user,
      isPending: isPending && !user, 
      login: (token: string, userData: User) => {
        localStorage.setItem('token', token)
        setUser(userData)
      },
      logout: () => {
        localStorage.removeItem('token')
        setUser(null)
      },
    }),
    [user, isPending]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}