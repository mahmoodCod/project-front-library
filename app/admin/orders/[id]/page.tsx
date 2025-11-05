"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getOrder, cancelOrder, getStatusLabel, type Order } from "@/lib/orders-store"

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = getOrder(id)
    setOrder(found)
    setLoading(false)
  }, [id])

  const handleCancel = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟")) {
      if (cancelOrder(id)) {
        alert("سفارش با موفقیت لغو شد")
        router.push("/admin/orders")
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-700"
      case "pending":
      case "confirmed":
        return "bg-yellow-100 text-yellow-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">سفارش پیدا نشد</h1>
          <Button variant="outline" asChild>
            <Link href="/admin/orders">← بازگشت به لیست سفارشات</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">جزئیات سفارش #{order.id}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">تاریخ: {formatDate(order.createdAt)}</p>
        </div>
        <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
          <Link href="/admin/orders">← بازگشت</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* اطلاعات مشتری */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
          <h2 className="text-base md:text-lg font-semibold">اطلاعات مشتری</h2>
          <div className="space-y-2 md:space-y-3">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">نام:</p>
              <p className="font-medium text-sm md:text-base">{order.customerName}</p>
            </div>
            {order.customerEmail && (
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">ایمیل:</p>
                <p className="font-medium text-xs md:text-base break-all">{order.customerEmail}</p>
              </div>
            )}
            {order.customerPhone && (
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">شماره تماس:</p>
                <p className="font-medium text-sm md:text-base">{order.customerPhone}</p>
              </div>
            )}
            {order.shippingAddress && (
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">آدرس ارسال:</p>
                <p className="font-medium text-xs md:text-base break-words">{order.shippingAddress}</p>
              </div>
            )}
          </div>
        </div>

        {/* وضعیت سفارش */}
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
          <h2 className="text-base md:text-lg font-semibold">وضعیت سفارش</h2>
          <div className="space-y-2 md:space-y-3">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">وضعیت:</p>
              <span className={`inline-block px-3 py-1 rounded-md text-xs md:text-sm font-medium ${getStatusBadgeClass(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">تاریخ ثبت:</p>
              <p className="font-medium text-sm md:text-base">{formatDate(order.createdAt)}</p>
            </div>
            {order.status !== "cancelled" && order.status !== "delivered" && (
              <div className="pt-3 md:pt-4">
                <Button variant="destructive" size="sm" className="w-full md:w-auto" onClick={handleCancel}>
                  لغو سفارش
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* آیتم‌های سفارش */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-4">آیتم‌های سفارش</h2>
        <div className="space-y-3 md:space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="relative w-full md:w-20 h-48 md:h-28 bg-muted rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-2 md:space-y-2">
                <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">نویسنده: {item.author}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pt-2 border-t border-border md:border-0">
                  <div className="flex items-center justify-between md:justify-start gap-2">
                    <span className="text-xs md:text-sm text-muted-foreground">تعداد:</span>
                    <span className="font-medium text-sm md:text-base">{item.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start gap-2">
                    <span className="text-xs md:text-sm text-muted-foreground">قیمت واحد:</span>
                    <span className="font-medium text-sm md:text-base">{item.discountedPrice.toLocaleString("fa-IR")} ت</span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start gap-2 pt-2 border-t border-border md:border-0 md:pt-0">
                    <span className="text-xs md:text-sm text-muted-foreground">جمع:</span>
                    <span className="font-bold text-primary text-sm md:text-base">
                      {(item.discountedPrice * item.quantity).toLocaleString("fa-IR")} ت
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* خلاصه سفارش */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-4">خلاصه سفارش</h2>
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">تعداد آیتم‌ها:</span>
            <span className="font-medium text-sm md:text-base">{order.items.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-base md:text-lg font-semibold">مبلغ کل:</span>
            <span className="text-xl md:text-2xl font-bold text-primary">{order.total.toLocaleString("fa-IR")} ت</span>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-2">یادداشت‌ها</h2>
          <p className="text-xs md:text-sm text-muted-foreground break-words">{order.notes}</p>
        </div>
      )}
    </div>
  )
}

