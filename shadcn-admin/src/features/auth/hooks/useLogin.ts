import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { login as loginAPI } from '../api/authAPI'
import type { LoginPayload } from '../types'

export function useLogin() {
  const navigate = useNavigate()
  const authLoginAction = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: (credentials: LoginPayload) => loginAPI(credentials),
    onSuccess: (data) => {
      // 1. Persist user and auth state using our Zustand store
      authLoginAction(data.user)

      // 2. Give user feedback
      toast.success(data.message || 'Login successful!')

      // 3. Redirect to the main dashboard
      // Using `Maps` from TanStack Router for type-safe routing
      navigate({ to: '/landing' })
    },
    onError: (error: unknown) => {
      // Show the server error message if available, otherwise fallback
      const err = error as {
        response?: { data?: { message?: string } }
        message?: string
      }
      const message =
        err?.response?.data?.message || err?.message || 'Login failed'
      toast.error(message)
      // handleServerError(err?.message)
    },
  })
}
