import { useQuery } from '@tanstack/react-query'
import { fetchAmenities } from '../api/propertiesAPI'
import type { AmenitiesResponse } from '../types'

export function useAmenities() {
  return useQuery<AmenitiesResponse>({
    queryKey: ['amenities'],
    queryFn: fetchAmenities,
  })
}
