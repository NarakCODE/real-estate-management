// src/stores/authStore.ts - Updated with persistence
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  _id: string
  name: string
  email: string
  roleId: string
  roleName: string
  phone?: string
  avatarUrl?: string
  bio?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  setInitialized: (isInitialized: boolean) => void
  login: (user: User) => void
  logout: () => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      isInitialized: false,
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        }),
      reset: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // After rehydration, mark as not initialized to trigger session check
          state.isInitialized = false
          state.isLoading = true
        }
      },
    }
  )
)
