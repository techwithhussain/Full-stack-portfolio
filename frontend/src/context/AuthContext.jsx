import axios from 'axios'

// Axios instance with credentials for public API calls
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export function AuthProvider({ children }) {
  return children
}

