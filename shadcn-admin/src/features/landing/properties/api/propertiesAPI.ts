import apiClient from '@/lib/axios'
import type { PropertySearchParams } from '../schemas'
import type { PropertiesResponse } from '../types'

export async function fetchProperties(
  params: PropertySearchParams
): Promise<PropertiesResponse> {
  // Convert params to a query string
  const query = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      },
      {} as Record<string, string>
    )
  ).toString()
  const response = await apiClient.get(`/v1/properties?${query}`)

  if (!response) {
    throw new Error('Failed to fetch properties')
  }

  return response.data
}
