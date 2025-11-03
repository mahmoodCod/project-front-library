"use client"

import React from "react"

export type CartItem = {
  id: string
  title: string
  author: string
  price: number
  discountedPrice: number
  image: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, qty: number) => void
  clear: () => void
  count: number
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined)

function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = React.useState<T>(() => {
    if (typeof window === "undefined") return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {}
  }, [key, state])

  return [state, setState] as const
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorageState<CartItem[]>("cart-items", [])

  const addItem = React.useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === item.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
        return copy
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }, [setItems])

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [setItems])

  const setQuantity = React.useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id)
      return prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    })
  }, [setItems])

  const clear = React.useCallback(() => setItems([]), [setItems])

  const count = React.useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = React.useMemo<CartContextValue>(() => ({ items, addItem, removeItem, setQuantity, clear, count }), [items, addItem, removeItem, setQuantity, clear, count])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}


