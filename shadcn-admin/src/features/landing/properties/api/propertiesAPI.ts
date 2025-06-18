import apiClient from '@/lib/axios'
import type { PropertySearchParams } from '../schemas'
import type { PropertiesResponse, Property } from '../types'

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

export async function fetchPropertyById(id: string): Promise<Property> {
  const response = await apiClient.get<{ data: Property }>(
    `/v1/properties/${id}`
  )

  if (response.status !== 200 || !response.data) {
    throw new Error('Failed to fetch property')
  }
  return response.data.data
}
