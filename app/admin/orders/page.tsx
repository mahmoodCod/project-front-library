"use client"

import { Button } from "@/components/ui/button"

const orders = [
  { id: "1001", customer: "علی محمدی", total: 245000, status: "تکمیل شده", date: "۱۴۰۳/۰۹/۱۵" },
  { id: "1002", customer: "فاطمه کریمی", total: 32000, status: "در حال ارسال", date: "۱۴۰۳/۰۹/۱۴" },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">سفارش‌ها</h1>
        <Button variant="outline" size="sm">خروجی اکسل</Button>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right px-4 py-3">شناسه</th>
                <th className="text-right px-4 py-3">مشتری</th>
                <th className="text-right px-4 py-3">مبلغ</th>
                <th className="text-right px-4 py-3">وضعیت</th>
                <th className="text-right px-4 py-3">تاریخ</th>
                <th className="text-right px-4 py-3">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3">#{o.id}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3">{o.total.toLocaleString("fa-IR")} ت</td>
                  <td className="px-4 py-3">{o.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">جزئیات</Button>
                      <Button size="sm" variant="outline">لغو</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
