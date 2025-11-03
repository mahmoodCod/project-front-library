// مدیریت کاربران با localStorage

export type User = {
  id: string
  firstName: string
  lastName: string
  username: string
  password: string // در حالت واقعی باید hash شود
  phone: string
  createdAt: string // ISO date string
}

const STORAGE_KEY = "app-users"

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as User[]
    return []
  } catch {
    return []
  }
}

export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch {}
}

export function getUserByUsername(username: string): User | null {
  const users = getUsers()
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null
}

export function getUserById(id: string): User | null {
  const users = getUsers()
  return users.find((u) => u.id === id) || null
}

export function addUser(user: Omit<User, "id" | "createdAt">): User {
  const users = getUsers()
  
  // چک کردن که نام کاربری تکراری نباشد
  if (getUserByUsername(user.username)) {
    throw new Error("نام کاربری قبلاً استفاده شده است")
  }
  
  const newUser: User = {
    ...user,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function verifyUser(username: string, password: string): User | null {
  const user = getUserByUsername(username)
  if (!user) return null
  if (user.password !== password) return null
  return user
}

