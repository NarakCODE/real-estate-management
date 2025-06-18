// src/routes/_authenticated/route.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { getProfile } from '@/features/auth/api/authAPI'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated, setAuthenticated, setUser } =
      useAuthStore.getState()

    // If state is already authenticated, no need to fetch again.
    if (isAuthenticated) {
      return
    }

    try {
      // Try to fetch the user profile. This will succeed if the session cookie is valid.
      const user = await getProfile()
      setUser(user)
      setAuthenticated(true)
    } catch (_error) {
      // If it fails, the user is not authenticated.
      // We'll redirect them to the sign-in page.
      toast.error('Session expired. Please log in.')
      throw redirect({
        to: '/sign-in',
        search: {
          // Pass the original destination so we can redirect back after login.
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})
