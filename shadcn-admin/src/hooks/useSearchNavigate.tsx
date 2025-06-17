import { useNavigate } from '@tanstack/react-router'
import { PropertySearchParams } from '@/features/landing/properties/schemas'

export function useSearchNavigate() {
  const navigate = useNavigate()

  const navigateWithSearch = (
    newSearch: Partial<Omit<PropertySearchParams, 'page'>>
  ) => {
    navigate({
      to: '/landing/properties',
      search: (prev: Partial<PropertySearchParams>) => ({
        ...prev,
        ...newSearch,
        page: 1,
      }),
      replace: true,
    })
  }

  return navigateWithSearch
}
