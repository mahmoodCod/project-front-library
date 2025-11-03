"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCustomer } from "@/lib/customers-store"
import { getOrders } from "@/lib/orders-store"
import type { Customer } from "@/lib/customers-store"
import type { Order } from "@/lib/orders-store"

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = getCustomer(id)
    if (!found) {
      alert("مشتری پیدا نشد")
      router.push("/admin/customers")
      return
    }
    setCustomer(found)

    // پیدا کردن سفارشات این مشتری
    const allOrders = getOrders()
    const customerOrders = allOrders.filter(
      (order) =>
        order.customerName === found.name ||
        order.customerEmail === found.email ||
        order.customerPhone === found.phone
    )
    setOrders(customerOrders)
    setLoading(false)
  }, [id, router])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "نامشخص"
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (!customer) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">جزئیات مشتری: {customer.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">عضو شده در: {formatDate(customer.registeredAt)}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/customers">← بازگشت</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* اطلاعات مشتری */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">اطلاعات مشتری</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">نام:</p>
              <p className="font-medium">{customer.name}</p>
            </div>
            {customer.email && (
              <div>
                <p className="text-sm text-muted-foreground">ایمیل:</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            )}
            {customer.phone && (
              <div>
                <p className="text-sm text-muted-foreground">شماره تماس:</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* آمار مشتری */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">آمار خرید</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">تعداد سفارشات:</span>
              <span className="font-bold text-lg">{customer.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">مجموع خرید:</span>
              <span className="font-bold text-lg text-primary">{customer.totalSpent.toLocaleString("fa-IR")} ت</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">میانگین خرید:</span>
              <span className="font-medium">
                {customer.totalOrders > 0
                  ? Math.round(customer.totalSpent / customer.totalOrders).toLocaleString("fa-IR")
                  : 0}{" "}
                ت
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">آخرین سفارش:</span>
              <span className="font-medium">{formatDate(customer.lastOrderDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* لیست سفارشات */}
      {orders.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">تاریخچه سفارشات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-right px-4 py-3 font-semibold">شناسه سفارش</th>
                  <th className="text-right px-4 py-3 font-semibold">مبلغ</th>
                  <th className="text-right px-4 py-3 font-semibold">وضعیت</th>
                  <th className="text-right px-4 py-3 font-semibold">تاریخ</th>
                  <th className="text-right px-4 py-3 font-semibold">اقدامات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">#{order.id}</td>
                    <td className="px-4 py-3">{order.total.toLocaleString("fa-IR")} ت</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                        {order.status === "delivered"
                          ? "تحویل داده شده"
                          : order.status === "processing"
                            ? "در حال پردازش"
                            : order.status === "shipped"
                              ? "ارسال شده"
                              : order.status === "pending"
                                ? "در انتظار پرداخت"
                                : order.status === "cancelled"
                                  ? "لغو شده"
                                  : order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/orders/${order.id}`}>مشاهده سفارش</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

