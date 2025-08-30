"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, authService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, email?: string) => Promise<void>
  connectWallet: (walletAddress: string) => Promise<void>
  logout: () => void
  updateTokens: (tokens: number) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password)
    setUser(user)
  }

  const register = async (username: string, password: string, email?: string) => {
    const user = await authService.register(username, password, email)
    setUser(user)
  }

  const connectWallet = async (walletAddress: string) => {
    const user = await authService.connectWallet(walletAddress)
    setUser(user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateTokens = (tokens: number) => {
    authService.updateTokens(tokens)
    if (user) {
      setUser({ ...user, tokens })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        connectWallet,
        logout,
        updateTokens,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
