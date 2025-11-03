"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, ShoppingCart, Users, BarChart3, Settings, LogOut, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

interface AdminSidebarProps {
  active: string
}

export function AdminSidebar({ active }: AdminSidebarProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const menuItems = [
    { id: "dashboard", label: "داشبورد", href: "/admin", icon: LayoutDashboard },
    { id: "books", label: "کتاب‌ها", href: "/admin/books", icon: BookOpen },
    { id: "orders", label: "سفارشات", href: "/admin/orders", icon: ShoppingCart },
    { id: "links", label: "لینک‌ها", href: "/admin/links", icon: Link2 },
    { id: "customers", label: "مشتریان", href: "/admin/customers", icon: Users },
    { id: "analytics", label: "آمار و تحلیل", href: "/admin/analytics", icon: BarChart3 },
    { id: "settings", label: "تنظیمات", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-card border-l border-border min-h-screen flex flex-col">
      {/* سر لوگو */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">📚</span>
          </div>
          <span className="font-bold text-lg">کتاب‌خانه</span>
        </Link>
      </div>

      {/* منو */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* خروج */}
      <div className="border-t border-border p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 bg-transparent"
          onClick={() => {
            logout()
            router.push("/")
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </Button>
      </div>
    </aside>
  )
}
