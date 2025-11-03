"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // تعیین active بر اساس pathname
  let active = "dashboard"
  if (pathname?.includes("/books")) active = "books"
  else if (pathname?.includes("/orders")) active = "orders"
  else if (pathname?.includes("/links")) active = "links"
  else if (pathname?.includes("/customers")) active = "customers"
  else if (pathname?.includes("/analytics")) active = "analytics"
  else if (pathname?.includes("/settings")) active = "settings"
  
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="hidden md:block w-64 border-l border-border bg-card/50">
          <AdminSidebar active={active} />
        </aside>
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-card/70 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
            <h1 className="font-bold">مدیریت کتابخانه</h1>
            <div className="text-sm text-muted-foreground">نسخه آزمایشی پنل</div>
          </header>
          <main className="p-4 md:p-6 max-w-6xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
