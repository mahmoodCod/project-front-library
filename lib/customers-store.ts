// مدیریت مشتریان با localStorage

export type Customer = {
  id: string
  name: string
  email?: string
  phone?: string
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string // ISO date string
  registeredAt: string // ISO date string
}

const STORAGE_KEY = "admin-customers"

// مشتریان پیش‌فرض نمونه (از سفارشات استخراج می‌شوند)
const defaultCustomers: Customer[] = [
  {
    id: "c1",
    name: "علی محمدی",
    email: "ali@example.com",
    phone: "09123456789",
    totalOrders: 3,
    totalSpent: 450000,
    lastOrderDate: new Date("2024-01-15").toISOString(),
    registeredAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "c2",
    name: "فاطمه کریمی",
    email: "fateme@example.com",
    phone: "09129876543",
    totalOrders: 2,
    totalSpent: 120000,
    lastOrderDate: new Date("2024-01-14").toISOString(),
    registeredAt: new Date("2024-01-05").toISOString(),
  },
  {
    id: "c3",
    name: "محمود احمدی",
    email: "mahmood@example.com",
    totalOrders: 1,
    totalSpent: 130400,
    lastOrderDate: new Date("2024-01-13").toISOString(),
    registeredAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "c4",
    name: "زهرا علوی",
    email: "zahra@example.com",
    phone: "09131111111",
    totalOrders: 5,
    totalSpent: 680000,
    lastOrderDate: new Date("2024-01-12").toISOString(),
    registeredAt: new Date("2023-12-20").toISOString(),
  },
]

export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return defaultCustomers
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Customer[]
    // اگر چیزی ذخیره نشده، پیش‌فرض رو ذخیره کن
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCustomers))
    return defaultCustomers
  } catch {
    return defaultCustomers
  }
}

export function saveCustomers(customers: Customer[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
  } catch {}
}

export function getCustomer(id: string): Customer | null {
  const customers = getCustomers()
  return customers.find((c) => c.id === id) || null
}

export function updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
  const customers = getCustomers()
  const idx = customers.findIndex((c) => c.id === id)
  if (idx === -1) return null
  customers[idx] = { ...customers[idx], ...updates }
  saveCustomers(customers)
  return customers[idx]
}

export function deleteCustomer(id: string): boolean {
  const customers = getCustomers()
  const filtered = customers.filter((c) => c.id !== id)
  if (filtered.length === customers.length) return false
  saveCustomers(filtered)
  return true
}

// همگام‌سازی مشتریان با سفارشات
export function syncCustomersFromOrders(): void {
  if (typeof window === "undefined") return
  try {
    // خواندن سفارشات
    const ordersRaw = window.localStorage.getItem("admin-orders")
    if (!ordersRaw) return

    const orders = JSON.parse(ordersRaw) as Array<{
      id: string
      customerName: string
      customerEmail?: string
      customerPhone?: string
      total: number
      createdAt: string
    }>

    const customers = getCustomers()
    const customerMap = new Map<string, Customer>()

    // ایجاد map از مشتریان موجود
    for (const customer of customers) {
      const key = customer.email || customer.phone || customer.name.toLowerCase()
      customerMap.set(key, customer)
    }

    // پردازش سفارشات
    for (const order of orders) {
      const key = order.customerEmail || order.customerPhone || order.customerName.toLowerCase()
      const existing = customerMap.get(key)

      if (existing) {
        // به‌روزرسانی مشتری موجود
        existing.totalOrders += 1
        existing.totalSpent += order.total
        if (!existing.lastOrderDate || order.createdAt > existing.lastOrderDate) {
          existing.lastOrderDate = order.createdAt
        }
      } else {
        // ایجاد مشتری جدید
        const newCustomer: Customer = {
          id: `c${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.createdAt,
          registeredAt: order.createdAt,
        }
        customerMap.set(key, newCustomer)
      }
    }

    // ذخیره مشتریان به‌روزرسانی شده
    saveCustomers(Array.from(customerMap.values()))
  } catch {}
}

