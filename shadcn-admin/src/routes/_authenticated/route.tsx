import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated, user, isInitialized } = useAuthStore.getState()

    // If not initialized yet, we're still checking session
    if (!isInitialized) {
      // Let AuthProvider handle the session check
      return
    }

    // Check authentication
    if (!isAuthenticated || !user) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      })
    }

    // Check role authorization
    const allowedRoles = ['Admin', 'Agent']
    if (!allowedRoles.includes(user.roleName)) {
      throw redirect({ to: '/landing' })
    }
  },
  component: AuthenticatedLayout,
})
