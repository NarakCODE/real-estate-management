import { useQuery } from '@tanstack/react-query'
import { fetchProperties, fetchPropertyById } from '../api/propertiesAPI'
import type { PropertySearchParams } from '../schemas'

export function useProperties(searchParams: PropertySearchParams) {
  return useQuery({
    // The query key uniquely identifies this data
    queryKey: ['properties', searchParams],
    queryFn: () => fetchProperties(searchParams),
  })
}

export function useProperty(propertyId: string) {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    enabled: !!propertyId, // Only run this query if propertyId is provided
  })
}
