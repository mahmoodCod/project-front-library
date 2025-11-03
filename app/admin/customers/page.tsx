"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCustomers, deleteCustomer, syncCustomersFromOrders, type Customer } from "@/lib/customers-store"

const ITEMS_PER_PAGE = 5

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // همگام‌سازی با سفارشات
    syncCustomersFromOrders()
    setCustomers(getCustomers())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این مشتری را حذف کنید؟")) {
      if (deleteCustomer(id)) {
        const updatedCustomers = getCustomers()
        setCustomers(updatedCustomers)
        // اگر آخرین صفحه خالی شد، به صفحه قبل برو
        const filtered = updatedCustomers.filter((customer) => {
          if (!searchQuery) return true
          const query = searchQuery.toLowerCase()
          return (
            customer.name.toLowerCase().includes(query) ||
            customer.email?.toLowerCase().includes(query) ||
            customer.phone?.includes(query)
          )
        })
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages)
        }
        alert("مشتری با موفقیت حذف شد")
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "نامشخص"
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const filteredCustomers = customers.filter((customer) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.phone?.includes(query)
    )
  })

  // محاسبه pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  // وقتی جستجو تغییر می‌کند، به صفحه اول برو
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl md:text-2xl font-bold">مدیریت مشتریان</h1>
        <Button variant="outline" size="sm" className="text-xs md:text-sm" onClick={() => {
          syncCustomersFromOrders()
          setCustomers(getCustomers())
          alert("لیست مشتریان با سفارشات همگام‌سازی شد")
        }}>
          همگام‌سازی با سفارشات
        </Button>
      </div>

      {/* جستجو */}
      <div className="bg-card border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="جستجو بر اساس نام، ایمیل یا شماره تماس..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-xs md:text-sm"
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery ? "هیچ مشتری با این جستجو یافت نشد" : "هنوز مشتریی ثبت نشده است"}
          </p>
        </div>
      ) : (
        <>
          {/* نمایش موبایل - کارت‌بندی */}
          <div className="md:hidden space-y-3">
            {paginatedCustomers.map((customer) => (
              <div key={customer.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{customer.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">ایمیل:</span>
                      <span className="font-medium text-xs truncate">{customer.email || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">شماره تماس:</span>
                      <span className="font-medium">{customer.phone || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">تعداد سفارشات:</span>
                      <span className="font-semibold">{customer.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">مجموع خرید:</span>
                      <span className="font-semibold">{customer.totalSpent.toLocaleString("fa-IR")} ت</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">آخرین سفارش:</span>
                      <span className="text-muted-foreground">{formatDate(customer.lastOrderDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="text-xs flex-1 min-w-0" asChild>
                    <Link href={`/admin/customers/${customer.id}`}>جزئیات</Link>
                  </Button>
                  <Button size="sm" variant="destructive" className="text-xs flex-1 min-w-0" onClick={() => handleDelete(customer.id)}>
                    حذف
                  </Button>
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
                    <th className="text-right px-4 py-3 font-semibold">نام</th>
                    <th className="text-right px-4 py-3 font-semibold">ایمیل</th>
                    <th className="text-right px-4 py-3 font-semibold">شماره تماس</th>
                    <th className="text-right px-4 py-3 font-semibold">تعداد سفارشات</th>
                    <th className="text-right px-4 py-3 font-semibold">مجموع خرید</th>
                    <th className="text-right px-4 py-3 font-semibold">آخرین سفارش</th>
                    <th className="text-right px-4 py-3 font-semibold">اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{customer.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{customer.email || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{customer.phone || "—"}</td>
                      <td className="px-4 py-3">{customer.totalOrders}</td>
                      <td className="px-4 py-3">{customer.totalSpent.toLocaleString("fa-IR")} ت</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(customer.lastOrderDate)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/customers/${customer.id}`}>جزئیات</Link>
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(customer.id)}>
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="text-xs md:text-sm"
              >
                <ChevronRight className="w-4 h-4" />
                قبلی
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="text-xs md:text-sm min-w-[2rem]"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="text-xs md:text-sm"
              >
                بعدی
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* نمایش اطلاعات صفحه */}
          {totalPages > 1 && (
            <div className="text-center text-sm text-muted-foreground">
              نمایش {startIndex + 1} تا {Math.min(endIndex, filteredCustomers.length)} از {filteredCustomers.length} مشتری
            </div>
          )}
        </>
      )}

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">تعداد کل مشتریان</p>
          <p className="text-xl md:text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">مجموع خرید کل</p>
          <p className="text-xl md:text-2xl font-bold text-primary">
            {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString("fa-IR")} ت
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">میانگین خرید هر مشتری</p>
          <p className="text-xl md:text-2xl font-bold">
            {customers.length > 0
              ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString("fa-IR")
              : 0}{" "}
            ت
          </p>
        </div>
      </div>
    </div>
  )
}

