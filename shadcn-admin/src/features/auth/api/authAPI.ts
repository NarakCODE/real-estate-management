// src/features/auth/api/authApi.ts
import { z } from 'zod'
import apiClient from '@/lib/axios'

// Zod schemas matching your backend validations
const _loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginCredentials = z.infer<typeof _loginSchema>

// The user type matching our authStore
interface User {
  _id: string
  name: string
  email: string
  roleId: string
  roleName: string
  phone?: string
  avatarUrl?: string
  bio?: string
}

interface LoginResponse {
  message: string
  user: User
}

interface ProfileResponse {
  user: User
}

/**
 * Logs in a user. Axios is configured with `withCredentials: true`
 * to automatically handle sending the session cookie.
 */
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await apiClient.post<LoginResponse>(
    '/v1/auth/login',
    credentials,
    {
      withCredentials: true,
    }
  )
  return data.user
}

/**
 * Logs out the current user by calling the backend to destroy the session.
 */
export const logout = async (): Promise<{ message: string }> => {
  const { data } = await apiClient.post(
    '/v1/auth/logout',
    {},
    {
      withCredentials: true,
    }
  )
  return data
}

/**
 * Fetches the current user's profile if a valid session exists.
 * This is our primary method for checking if a user is authenticated.
 */
export const getProfile = async (): Promise<User> => {
  const { data } = await apiClient.get<ProfileResponse>('/v1/auth/profile', {
    withCredentials: true,
  })
  return data.user
}
