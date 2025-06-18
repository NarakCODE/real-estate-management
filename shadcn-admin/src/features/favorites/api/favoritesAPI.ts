import apiClient from '@/lib/axios'
import { Property } from '@/features/landing/properties/types'

export interface FavoritesResponse {
  message: string
  data: Favorite[]
}

export interface Favorite {
  _id: string
  userId: string
  property: Property
  savedAt: string
}

// The actual API fetching function
export const fetchFavorites = async (): Promise<FavoritesResponse> => {
  const response = await apiClient.get('/v1/favorites')
  return response.data
}

export const addToFavorite = async (propertyId: string) => {
  // Based on your backend setup, a POST request to /v1/favorites
  // with the propertyId in the body is the most likely implementation.
  const response = await apiClient.post(`/v1/favorites/${propertyId}`)
  return response.data
}

export const removeFromFavorite = async (propertyId: string) => {
  const response = await apiClient.delete(`/v1/favorites/${propertyId}`)
  return response.data
}
