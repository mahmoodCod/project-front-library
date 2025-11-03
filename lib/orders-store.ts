// مدیریت سفارشات با localStorage

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"

export type OrderItem = {
  id: string
  title: string
  author: string
  price: number
  discountedPrice: number
  image: string
  quantity: number
}

export type Order = {
  id: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string // ISO date string
  shippingAddress?: string
  notes?: string
}

const STORAGE_KEY = "admin-orders"

// سفارشات پیش‌فرض نمونه
const defaultOrders: Order[] = [
  {
    id: "1001",
    customerName: "علی محمدی",
    customerEmail: "ali@example.com",
    customerPhone: "09123456789",
    items: [
      {
        id: "1",
        title: "پدر",
        author: "میخائیل بولگاکوف",
        price: 89000,
        discountedPrice: 71200,
        image: "/book-cover-1.png",
        quantity: 2,
      },
      {
        id: "4",
        title: "عادت‌های موفق",
        author: "جیمز کلیئر",
        price: 82000,
        discountedPrice: 65600,
        image: "/book-cover-4.png",
        quantity: 1,
      },
    ],
    total: 208000,
    status: "delivered",
    createdAt: new Date("2024-01-15").toISOString(),
    shippingAddress: "تهران، خیابان ولیعصر، پلاک 123",
  },
  {
    id: "1002",
    customerName: "فاطمه کریمی",
    customerEmail: "fateme@example.com",
    customerPhone: "09129876543",
    items: [
      {
        id: "2",
        title: "ما کیستیم",
        author: "علی شریعتی",
        price: 75000,
        discountedPrice: 60000,
        image: "/book-cover-2.jpg",
        quantity: 1,
      },
    ],
    total: 60000,
    status: "processing",
    createdAt: new Date("2024-01-14").toISOString(),
    shippingAddress: "اصفهان، خیابان چهارباغ، پلاک 45",
  },
  {
    id: "1003",
    customerName: "محمود احمدی",
    customerEmail: "mahmood@example.com",
    items: [
      {
        id: "3",
        title: "یک یادداشت معمولی",
        author: "دوستایفسکی",
        price: 95000,
        discountedPrice: 76000,
        image: "/book-cover-3.png",
        quantity: 1,
      },
      {
        id: "5",
        title: "علم دین",
        author: "امام غزالی",
        price: 68000,
        discountedPrice: 54400,
        image: "/book-cover-5.png",
        quantity: 1,
      },
    ],
    total: 130400,
    status: "pending",
    createdAt: new Date("2024-01-13").toISOString(),
  },
]

const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار پرداخت",
  confirmed: "تایید شده",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
}

export function getStatusLabel(status: OrderStatus): string {
  return statusLabels[status]
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return defaultOrders
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Order[]
    // اگر چیزی ذخیره نشده، پیش‌فرض رو ذخیره کن
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOrders))
    return defaultOrders
  } catch {
    return defaultOrders
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {}
}

export function getOrder(id: string): Order | null {
  const orders = getOrders()
  return orders.find((o) => o.id === id) || null
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | null {
  const orders = getOrders()
  const idx = orders.findIndex((o) => o.id === id)
  if (idx === -1) return null
  orders[idx] = { ...orders[idx], status }
  saveOrders(orders)
  return orders[idx]
}

export function cancelOrder(id: string): Order | null {
  return updateOrderStatus(id, "cancelled")
}

export function addOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const orders = getOrders()
  const newId = String(Date.now())
  const newOrder: Order = {
    ...order,
    id: newId,
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  saveOrders(orders)
  return newOrder
}

