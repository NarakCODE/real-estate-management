import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { getProfile } from '@/features/auth/api/authAPI'

export const Route = createFileRoute('/_authenticated')({
  // This function runs before the route loads
  beforeLoad: async ({ location }) => {
    try {
      const user = await getProfile()
      useAuthStore.getState().login(user)
    } catch (_err) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})
