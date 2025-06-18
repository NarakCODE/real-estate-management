import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// We point to the backend's BASE_URL from your Express app
const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    // Get the access token from the store on each request
    const accessToken = useAuthStore.getState().isAuthenticated

    if (accessToken) {
      // If the token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error)
  }
)

export default apiClient
