'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api, setToken, removeToken, getToken } from './api'

interface User {
  id: number
  username: string
  email: string
  role: string
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (getToken()) {
      api.getMe()
        .then((data) => setUser(data))
        .catch(() => removeToken())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const data = await api.login(username, password)
    setToken(data.access_token)
    setUser(data.user)
    setShowAuthModal(false)
  }

  const register = async (username: string, email: string, password: string) => {
    const data = await api.register(username, email, password)
    setToken(data.access_token)
    setUser(data.user)
    setShowAuthModal(false)
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
