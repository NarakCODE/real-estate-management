import { create } from 'zustand'
import type { User } from '@/features/auth/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))
