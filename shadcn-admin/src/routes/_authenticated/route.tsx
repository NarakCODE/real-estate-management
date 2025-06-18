import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { getProfile } from '@/features/auth/api/authAPI'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated, setAuthenticated, setUser, user } =
      useAuthStore.getState()
    const allowedRoles = ['Admin', 'Agent']
    const userRole: string = user?.roleName ?? ''

    if (!allowedRoles.includes(userRole)) {
      throw redirect({ to: '/landing' })
    }

    if (isAuthenticated) return

    try {
      const profile = await getProfile()
      setUser(profile)
      setAuthenticated(true)
    } catch {
      toast.error('Session expired. Please log in.')
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      })
    }
  },
  component: AuthenticatedLayout,
})
