import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/features/auth/types'

interface AuthState {
  user: (User & { accessToken?: string; refreshToken?: string }) | null
  isAuthenticated: boolean
  login: (userData: User, accessToken?: string, refreshToken?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData, accessToken, refreshToken) =>
        set({
          user: { ...userData, accessToken, refreshToken },
          isAuthenticated: true,
        }),
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
