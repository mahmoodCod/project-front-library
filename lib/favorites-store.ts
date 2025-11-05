// مدیریت علاقه‌مندی‌های کاربران با localStorage

export type Favorite = {
  id: string
  userId: string
  bookId: string
  addedAt: string // ISO date string
}

const STORAGE_KEY = "app-favorites"

export function getFavorites(): Favorite[] {
  if (typeof window === "undefined") return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Favorite[]
    return []
  } catch {
    return []
  }
}

export function saveFavorites(favorites: Favorite[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {}
}

export function getUserFavorites(userId: string): Favorite[] {
  const favorites = getFavorites()
  return favorites.filter((f) => f.userId === userId)
}

export function isFavorite(userId: string, bookId: string): boolean {
  const favorites = getFavorites()
  return favorites.some((f) => f.userId === userId && f.bookId === bookId)
}

export function addFavorite(userId: string, bookId: string): Favorite {
  const favorites = getFavorites()
  
  // چک کردن که قبلاً اضافه نشده باشد
  if (isFavorite(userId, bookId)) {
    throw new Error("این کتاب قبلاً به علاقه‌مندی‌ها اضافه شده است")
  }
  
  const newFavorite: Favorite = {
    id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    bookId,
    addedAt: new Date().toISOString(),
  }
  
  favorites.push(newFavorite)
  saveFavorites(favorites)
  return newFavorite
}

export function removeFavorite(userId: string, bookId: string): boolean {
  const favorites = getFavorites()
  const filtered = favorites.filter(
    (f) => !(f.userId === userId && f.bookId === bookId)
  )
  
  if (filtered.length === favorites.length) return false
  
  saveFavorites(filtered)
  return true
}

export function toggleFavorite(userId: string, bookId: string): boolean {
  // true = اضافه شد، false = حذف شد
  if (isFavorite(userId, bookId)) {
    removeFavorite(userId, bookId)
    return false
  } else {
    addFavorite(userId, bookId)
    return true
  }
}

