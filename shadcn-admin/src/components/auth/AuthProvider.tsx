import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { getProfile } from '@/features/auth/api/authAPI'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuthenticated,
    isInitialized,
    isLoading,
    setUser,
    setAuthenticated,
    setLoading,
    setInitialized,
    logout,
  } = useAuthStore()

  // Only validate session if we think we're authenticated but haven't initialized
  const shouldValidateSession = isAuthenticated && !isInitialized

  const {
    data: profile,
    isLoading: isValidating,
    error,
  } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: getProfile,
    enabled: shouldValidateSession,
    retry: false,
    staleTime: 0,
  })

  useEffect(() => {
    if (!isInitialized) {
      if (shouldValidateSession) {
        // We're waiting for validation
        if (!isValidating) {
          if (profile) {
            // Valid session
            setUser(profile)
            setAuthenticated(true)
            setInitialized(true)
            setLoading(false)
          } else if (error) {
            // Invalid session
            logout()
          }
        }
      } else if (!isAuthenticated) {
        // Not authenticated, just mark as initialized
        setInitialized(true)
        setLoading(false)
      }
    }
  }, [
    profile,
    isValidating,
    error,
    shouldValidateSession,
    isAuthenticated,
    isInitialized,
    setUser,
    setAuthenticated,
    setInitialized,
    setLoading,
    logout,
  ])

  // Show loading while validating session
  if (!isInitialized && isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='border-primary h-8 w-8 animate-spin rounded-full border-b-2'></div>
      </div>
    )
  }

  return <>{children}</>
}
