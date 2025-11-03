"use client"

import React from "react"

type AuthContextValue = {
  isAdmin: boolean
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

  React.useEffect(() => {
    try {
      if (isAdmin) window.localStorage.setItem("is-admin", "1")
      else window.localStorage.removeItem("is-admin")
    } catch {}
  }, [isAdmin])

  const login = React.useCallback((username: string, password: string) => {
    if (username === "admin" && password === "admin1234") {
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = React.useCallback(() => setIsAdmin(false), [])

  const value = React.useMemo(() => ({ isAdmin, login, logout }), [isAdmin, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
