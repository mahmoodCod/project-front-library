"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

const orders = [
  {
    id: "001",
    customer: "علی محمدی",
    email: "ali@example.com",
    total: "۲۴۵۰۰۰",
    status: "تکمیل شده",
    date: "۱۴۰۳/۰۹/۱۵",
    items: 3,
  },
  {
    id: "002",
    customer: "فاطمه کریمی",
    email: "fatema@example.com",
    total: "۳۲۰۰۰",
    status: "در حال ارسال",
    date: "۱۴۰۳/۰۹/۱۴",
    items: 1,
  },
  {
    id: "003",
    customer: "محمود احمدی",
    email: "mahmoud@example.com",
    total: "۱۸۵۰۰۰",
    status: "در انتظار پرداخت",
    date: "۱۴۰۳/۰۹/۱۳",
    items: 2,
  },
]

export default function AdminOrders() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="orders" />

      <div className="flex-1">
        {/* هدر */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold">مدیریت سفارشات</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت تمام سفارشات</p>
        </div>

        {/* محتوا */}
        <div className="p-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-right py-4 px-6 font-semibold">شناسه</th>
                    <th className="text-right py-4 px-6 font-semibold">مشتری</th>
                    <th className="text-right py-4 px-6 font-semibold">مبلغ</th>
                    <th className="text-right py-4 px-6 font-semibold">آیتم‌ها</th>
                    <th className="text-right py-4 px-6 font-semibold">وضعیت</th>
                    <th className="text-right py-4 px-6 font-semibold">تاریخ</th>
                    <th className="text-right py-4 px-6 font-semibold">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-6 font-bold">#{order.id}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-primary">{order.total}</td>
                      <td className="py-4 px-6">{order.items}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "تکمیل شده"
                              ? "bg-green-100 text-green-700"
                              : order.status === "در حال ارسال"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                      <td className="py-4 px-6 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
