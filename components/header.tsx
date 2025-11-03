"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* دسکتاپ هدر */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* لوگو */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">📚</span>
              </div>
              <span className="font-bold text-xl text-primary">کتاب‌خانه</span>
            </div>
          </Link>

          {/* سرچ */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی کتاب..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground">🔍</span>
            </div>
          </div>

          {/* بخش راست - ورود و سبد خرید */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <span>👤</span>
              <span>ورود</span>
            </Button>
            <Button variant="ghost" className="relative">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* موبایل هدر */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">📚</span>
            </div>
            <span className="font-bold text-primary">کتاب‌خانه</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? "✕" : "☰"}
            </Button>
          </div>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-border pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی کتاب..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />
              <span className="absolute left-2 top-2 text-sm text-muted-foreground">🔍</span>
            </div>
            <Button variant="outline" className="w-full justify-center bg-transparent">
              <span className="text-lg me-2">👤</span>
              ورود
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
