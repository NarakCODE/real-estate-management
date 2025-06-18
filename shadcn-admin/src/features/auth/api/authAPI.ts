import apiClient from '@/lib/axios'
import type { LoginPayload, LoginResponse, User } from '../types'

/**
 * Sends a POST request to the login endpoint.
 * @param credentials - The user's email and password.
 * @returns A promise that resolves to the login response.
 */
export const login = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await apiClient.post('/v1/auth/login', credentials)
  return response.data
}

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get('/v1/auth/profile')
  return response.data
}
