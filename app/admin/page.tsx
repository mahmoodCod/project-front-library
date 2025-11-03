"use client"

import { Users, ShoppingCart, DollarSign, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { month: "فروردین", sales: 4000, revenue: 24000 },
  { month: "اردیبهشت", sales: 3000, revenue: 18000 },
  { month: "خرداد", sales: 2000, revenue: 12000 },
  { month: "تیر", sales: 2780, revenue: 16680 },
  { month: "مرداد", sales: 1890, revenue: 11340 },
  { month: "شهریور", sales: 2390, revenue: 14340 },
]

export default function AdminDashboard() {
  const stats = [
    { label: "کل فروش", value: "۲.۵M", icon: DollarSign, color: "text-green-600" },
    { label: "سفارشات", value: "۱۲۴", icon: ShoppingCart, color: "text-blue-600" },
    { label: "مشتریان", value: "۱۲۳۴", icon: Users, color: "text-purple-600" },
    { label: "کتاب‌ها", value: "۵۶", icon: BookOpen, color: "text-orange-600" },
  ]

  const recentOrders = [
    { id: "001", customer: "علی محمدی", total: "۲۴۵۰۰۰", status: "تکمیل شده", date: "۱۴۰۳/۰۹/۱۵" },
    { id: "002", customer: "فاطمه کریمی", total: "۳۲۰۰۰", status: "در حال ارسال", date: "۱۴۰۳/۰۹/۱۴" },
    { id: "003", customer: "محمود احمدی", total: "۱۸۵۰۰۰", status: "در انتظار پرداخت", date: "۱۴۰۳/۰۹/۱۳" },
    { id: "004", customer: "زهرا علوی", total: "۴۱۲۰۰۰", status: "تکمیل شده", date: "۱۴۰۳/۰۹/۱۲" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">داشبورد</h1>
          <p className="text-muted-foreground text-sm">نمای کلی عملکرد فروشگاه</p>
        </div>
        <Button size="sm" variant="outline">گزارش امروز</Button>
      </div>

      {/* آمار */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-lg font-bold mb-3">فروش ماهانه</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8b5e3c" name="تعداد" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-lg font-bold mb-3">درآمد</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#d4a574" name="درآمد" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">سفارشات اخیر</h2>
          <Button variant="outline" size="sm">مشاهده همه</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-3 px-4 font-semibold">شناسه</th>
                <th className="text-right py-3 px-4 font-semibold">مشتری</th>
                <th className="text-right py-3 px-4 font-semibold">مبلغ</th>
                <th className="text-right py-3 px-4 font-semibold">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4 font-semibold">{order.total} ت</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "تکمیل شده"
                        ? "bg-green-100 text-green-700"
                        : order.status === "در حال ارسال"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
