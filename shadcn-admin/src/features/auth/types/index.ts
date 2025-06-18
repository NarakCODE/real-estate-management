import { z } from 'zod'
import { loginSchema } from '../schemas'

// This type is inferred from our Zod schema
export type LoginPayload = z.infer<typeof loginSchema>

export interface User {
  _id: string
  name: string
  email: string
  roleId: {
    _id: string
    name: string
  }
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
  roleName: string
  token?: string
}

// This defines the shape of the successful login response
export interface LoginResponse {
  message: string
  user: User
  // A real-world app would include a JWT token in the response
}
