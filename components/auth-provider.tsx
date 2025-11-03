"use client"

import React from "react"
import { verifyUser, getUserById, type User } from "@/lib/users-store"

type AuthContextValue = {
  isAdmin: boolean
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem("is-admin") === "1"
    } catch {
      return false
    }
  })

  const [user, setUser] = React.useState<User | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const userId = window.localStorage.getItem("current-user-id")
      if (userId) {
        const foundUser = getUserById(userId)
        return foundUser
      }
      return null
    } catch {
      return null
    }
  })

  React.useEffect(() => {
    try {
      if (isAdmin) window.localStorage.setItem("is-admin", "1")
      else window.localStorage.removeItem("is-admin")
    } catch {}
  }, [isAdmin])

  React.useEffect(() => {
    try {
      if (user) window.localStorage.setItem("current-user-id", user.id)
      else window.localStorage.removeItem("current-user-id")
    } catch {}
  }, [user])

  const login = React.useCallback((username: string, password: string) => {
    // چک کردن admin
    if (username === "admin" && password === "admin1234") {
      setIsAdmin(true)
      setUser(null)
      return true
    }
    
    // چک کردن کاربر عادی
    const foundUser = verifyUser(username, password)
    if (foundUser) {
      setUser(foundUser)
      setIsAdmin(false)
      return true
    }
    
    return false
  }, [])

  const logout = React.useCallback(() => {
    setIsAdmin(false)
    setUser(null)
  }, [])

  const value = React.useMemo(() => ({ isAdmin, user, login, logout }), [isAdmin, user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
