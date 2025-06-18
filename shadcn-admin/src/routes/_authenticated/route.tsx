import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  // This function runs before the route loads
  beforeLoad: async ({ location }) => {
    // It checks our Zustand store
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      // If not authenticated, it redirects to the sign-in page
      throw redirect({
        to: '/landing/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})
