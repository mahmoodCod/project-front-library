"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // تعیین active بر اساس pathname
  let active = "dashboard"
  if (pathname?.includes("/books")) active = "books"
  else if (pathname?.includes("/orders")) active = "orders"
  else if (pathname?.includes("/links")) active = "links"
  else if (pathname?.includes("/customers")) active = "customers"
  else if (pathname?.includes("/settings")) active = "settings"
  
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-l border-border bg-card/50">
          <AdminSidebar active={active} />
        </aside>
        
        <div className="flex-1 w-full">
          {/* Mobile Header */}
          <header className="sticky top-0 z-50 bg-card/70 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="font-bold text-lg">مدیریت کتابخانه</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </header>

          {/* Desktop Header */}
          <header className="hidden md:flex sticky top-0 z-40 bg-card/70 backdrop-blur border-b border-border px-4 py-3 items-center justify-between">
            <h1 className="font-bold">مدیریت کتابخانه</h1>
            <div className="text-sm text-muted-foreground">نسخه آزمایشی پنل</div>
          </header>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="fixed right-0 top-0 h-full w-64 bg-card border-l border-border z-50 md:hidden shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-bold">منو</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="overflow-y-auto h-[calc(100%-80px)]">
                  <AdminSidebar 
                    active={active} 
                    onLinkClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </div>
            </>
          )}

          <main className="p-4 md:p-6 max-w-6xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
