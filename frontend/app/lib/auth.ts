import apiClient from './api'

export interface User {
  id: number | string
  username: string
  email: string
}

export interface AuthResponse {
  token: string
  userId?: number | string
  username?: string
  email?: string
  user?: User
}

export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await apiClient.post('/api/auth/register', {
      username,
      email,
      password,
    })
    
    // Transform backend response to expected format
    const data = response.data
    const user: User = {
      id: data.userId || data.user?.id,
      username: data.username || data.user?.username,
      email: data.email || data.user?.email,
    }
    
    return {
      token: data.token,
      user,
    }
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    })
    
    // Transform backend response to expected format
    const data = response.data
    const user: User = {
      id: data.userId || data.user?.id,
      username: data.username || data.user?.username,
      email: data.email || data.user?.email,
    }
    
    return {
      token: data.token,
      user,
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken: (): string | null => {
    try {
      return localStorage.getItem('token')
    } catch {
      return null
    }
  },

  setToken: (token: string, user: User) => {
    try {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
      console.error('Error saving auth data:', err)
    }
  },

  getUser: (): User | null => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (err) {
      console.error('Error parsing user data:', err)
      localStorage.removeItem('user')
      return null
    }
  },

  isAuthenticated: (): boolean => {
    try {
      return !!localStorage.getItem('token')
    } catch {
      return false
    }
  },
}
