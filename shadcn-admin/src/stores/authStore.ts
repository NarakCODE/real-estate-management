// src/stores/authStore.ts
import { create } from 'zustand'

// Define the shape of the user object based on your backend IUser model
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
  isLoading: boolean // To handle the initial session check
  setUser: (user: User | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start loading to check for an existing session on app load
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}))
