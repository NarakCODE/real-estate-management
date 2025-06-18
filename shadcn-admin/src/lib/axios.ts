import axios from 'axios'

// We point to the backend's BASE_URL from your Express app
const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
