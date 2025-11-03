"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { getOrders } from "@/lib/orders-store"
import { Header } from "@/components/header"
import { User, ShoppingBag, Calendar, Phone, LogOut, Package, DollarSign } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [userOrders, setUserOrders] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    } else {
      // دریافت سفارشات کاربر
      const orders = getOrders().filter((order) => {
        return (
          order.customerPhone === user.phone ||
          order.customerName === `${user.firstName} ${user.lastName}` ||
          order.customerName.toLowerCase() === `${user.firstName} ${user.lastName}`.toLowerCase()
        )
      })
      setUserOrders(orders)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "نامشخص"
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0)

  const handleLogout = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید خارج شوید؟")) {
      logout()
      router.push("/")
    }
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-primary/10 to-background py-6 md:py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
              {/* آواتار */}
              <div className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center text-2xl md:text-4xl font-bold text-primary-foreground shadow-lg">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg md:text-3xl font-bold mb-1 truncate">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">@{user.username}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 text-xs md:text-sm shrink-0">
                <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">خروج</span>
              </Button>
            </div>

            {/* آمار کلی */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-primary/20">
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">تعداد سفارشات</p>
                      <p className="text-lg md:text-2xl font-bold">{userOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">مجموع خرید</p>
                      <p className="text-lg md:text-2xl font-bold text-green-600">{totalSpent.toLocaleString("fa-IR")} ت</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 col-span-2 md:col-span-1">
                <CardContent className="pt-4 md:pt-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">تاریخ عضویت</p>
                      <p className="text-sm md:text-lg font-bold">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 md:mb-6 text-xs md:text-sm">
              <TabsTrigger value="info">اطلاعات شخصی</TabsTrigger>
              <TabsTrigger value="orders">سفارشات</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                    اطلاعات شخصی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">نام</p>
                          <p className="font-semibold text-sm md:text-base">{user.firstName}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">نام خانوادگی</p>
                          <p className="font-semibold text-sm md:text-base">{user.lastName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">نام کاربری</p>
                          <p className="font-semibold text-sm md:text-base">@{user.username}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">شماره تماس</p>
                          <p className="font-semibold text-sm md:text-base">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Package className="w-4 h-4 md:w-5 md:h-5" />
                    سفارشات من
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userOrders.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm md:text-lg">شما هنوز سفارشی ثبت نکرده‌اید</p>
                      <p className="text-xs md:text-sm text-muted-foreground mb-6">برای مشاهده کتاب‌های ما به فروشگاه مراجعه کنید</p>
                      <Button asChild size="sm" className="md:hidden">
                        <Link href="/">بازگشت به فروشگاه</Link>
                      </Button>
                      <Button asChild size="lg" className="hidden md:inline-flex">
                        <Link href="/">بازگشت به فروشگاه</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                      {userOrders.map((order) => (
                        <div key={order.id} className="border border-border rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow bg-card">
                          <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <Package className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                                <span className="font-semibold text-sm md:text-lg">سفارش #{order.id}</span>
                              </div>
                              <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground flex-wrap">
                                <div className="flex items-center gap-1 md:gap-2">
                                  <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                                  <span>{formatDate(order.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-1 md:gap-2">
                                  <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                                  <span>{order.items.length} آیتم</span>
                                </div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap shrink-0 ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status === "delivered"
                                ? "تحویل شده"
                                : order.status === "shipped"
                                ? "ارسال شده"
                                : order.status === "cancelled"
                                ? "لغو شده"
                                : order.status === "pending"
                                ? "در انتظار پرداخت"
                                : "در حال پردازش"}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 pt-3 md:pt-4 border-t border-border">
                            <div>
                              <p className="text-xs md:text-sm text-muted-foreground mb-1">مبلغ کل</p>
                              <p className="font-bold text-base md:text-xl text-primary">
                                {order.total.toLocaleString("fa-IR")} تومان
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs md:text-sm w-full md:w-auto" asChild>
                              <Link href={`/admin/orders/${order.id}`}>مشاهده جزئیات</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </>
  )
}

