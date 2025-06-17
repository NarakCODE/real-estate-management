import { useQuery } from '@tanstack/react-query'
import { fetchProperties } from '../api/propertiesAPI'
import type { PropertySearchParams } from '../schemas'

export function useProperties(searchParams: PropertySearchParams) {
  return useQuery({
    // The query key uniquely identifies this data
    queryKey: ['properties', searchParams],
    queryFn: () => fetchProperties(searchParams),
  })
}
