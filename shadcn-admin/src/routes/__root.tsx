// src/routes/__root.tsx
import { useEffect } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { IconLoader2 } from '@tabler/icons-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { getProfile } from '@/features/auth/api/authAPI'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

// This component runs once when the app starts
const AppInitializer = () => {
  const { setAuthenticated, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const user = await getProfile()
        setUser(user)
        setAuthenticated(true)
      } catch (_error) {
        // No active session, which is fine. The store is already reset.
      } finally {
        setLoading(false)
      }
    }

    checkUserSession()
  }, [setAuthenticated, setLoading, setUser])

  return null // This component doesn't render anything
}

function RootComponent() {
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) {
    return (
      <div className='flex h-svh w-full items-center justify-center'>
        <IconLoader2 className='text-primary size-10 animate-spin' />
      </div>
    )
  }

  return (
    <>
      <NavigationProgress />
      <Outlet />
      <Toaster duration={5000} />
      {import.meta.env.MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <AppInitializer />
      <RootComponent />
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
