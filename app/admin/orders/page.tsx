"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getOrders, cancelOrder, getStatusLabel, type Order } from "@/lib/orders-store"

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  const handleCancel = (id: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟")) {
      if (cancelOrder(id)) {
        setOrders(getOrders())
        alert("سفارش با موفقیت لغو شد")
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

  const exportToExcel = () => {
    if (orders.length === 0) {
      alert("هیچ سفارشی برای خروجی وجود ندارد")
      return
    }

    // هدرهای CSV
    const headers = [
      "شناسه سفارش",
      "نام مشتری",
      "ایمیل",
      "شماره تماس",
      "آدرس ارسال",
      "عنوان آیتم",
      "نویسنده",
      "تعداد",
      "قیمت واحد",
      "قیمت کل",
      "مبلغ کل سفارش",
      "وضعیت",
      "تاریخ ثبت",
      "یادداشت",
    ]

    // تبدیل داده‌ها به ردیف‌های CSV
    const rows = orders.flatMap((order) => {
      // اگر سفارش چند آیتم داشته باشه، برای هر آیتم یک ردیف می‌سازیم
      return order.items.map((item, index) => {
        const isFirstItem = index === 0
        return [
          isFirstItem ? order.id : "", // شناسه فقط در اولین آیتم
          isFirstItem ? order.customerName : "", // نام فقط در اولین آیتم
          isFirstItem ? (order.customerEmail || "") : "",
          isFirstItem ? (order.customerPhone || "") : "",
          isFirstItem ? (order.shippingAddress || "") : "",
          item.title,
          item.author,
          item.quantity,
          item.discountedPrice,
          item.discountedPrice * item.quantity,
          isFirstItem ? order.total : "", // مبلغ کل فقط در اولین آیتم
          isFirstItem ? getStatusLabel(order.status) : "", // وضعیت فقط در اولین آیتم
          isFirstItem ? formatDate(order.createdAt) : "", // تاریخ فقط در اولین آیتم
          isFirstItem ? (order.notes || "") : "",
        ]
      })
    })

    // تبدیل به CSV
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    // اضافه کردن BOM برای پشتیبانی از UTF-8 در Excel
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `سفارشات_${formatDate(new Date().toISOString()).replace(/\//g, "_")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    alert("فایل اکسل با موفقیت دانلود شد")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl md:text-2xl font-bold">سفارش‌ها</h1>
        <Button variant="outline" size="sm" onClick={exportToExcel} className="text-xs md:text-sm">
          خروجی اکسل
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">هنوز سفارشی ثبت نشده است</p>
        </div>
      ) : (
        <>
          {/* نمایش موبایل - کارت‌بندی */}
          <div className="md:hidden space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm flex-1">#{o.id}</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getStatusBadgeClass(o.status)}`}>
                      {getStatusLabel(o.status)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">مشتری:</span>
                      <span className="font-medium">{o.customerName}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">مبلغ:</span>
                      <span className="font-semibold">{o.total.toLocaleString("fa-IR")} ت</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">تاریخ:</span>
                      <span className="text-muted-foreground">{formatDate(o.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="text-xs flex-1 min-w-0" asChild>
                    <Link href={`/admin/orders/${o.id}`}>جزئیات</Link>
                  </Button>
                  {o.status !== "cancelled" && o.status !== "delivered" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs flex-1 min-w-0"
                      onClick={() => handleCancel(o.id)}
                    >
                      لغو
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* نمایش دسکتاپ - جدول */}
          <div className="hidden md:block bg-card border border-border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-right px-4 py-3 font-semibold">شناسه</th>
                    <th className="text-right px-4 py-3 font-semibold">مشتری</th>
                    <th className="text-right px-4 py-3 font-semibold">مبلغ</th>
                    <th className="text-right px-4 py-3 font-semibold">وضعیت</th>
                    <th className="text-right px-4 py-3 font-semibold">تاریخ</th>
                    <th className="text-right px-4 py-3 font-semibold">اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">#{o.id}</td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3">{o.total.toLocaleString("fa-IR")} ت</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeClass(o.status)}`}>
                          {getStatusLabel(o.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(o.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/orders/${o.id}`}>جزئیات</Link>
                          </Button>
                          {o.status !== "cancelled" && o.status !== "delivered" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancel(o.id)}
                            >
                              لغو
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
