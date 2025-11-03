"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

// لیست کتاب‌ها برای جستجو
const books = [
  { id: "1", title: "پدر", author: "میخائیل بولگاکوف" },
  { id: "2", title: "ما کیستیم", author: "علی شریعتی" },
  { id: "3", title: "یک یادداشت معمولی", author: "دوستایفسکی" },
  { id: "4", title: "عادت‌های موفق", author: "جیمز کلیئر" },
  { id: "5", title: "علم دین", author: "امام غزالی" },
  { id: "6", title: "شنل‌های شگفت‌انگیز", author: "نویسنده ناشناخته" },
  { id: "7", title: "تاریخ ایران", author: "کاظم پایا" },
  { id: "8", title: "سفر به ماه", author: "ژول ورن" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { count: cartCount } = useCart()
  const [query, setQuery] = useState("")
  const router = useRouter()

  function submitSearch(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault()
    const q = query.trim()
    if (!q) return
    
    // جستجوی کتاب بر اساس عنوان یا نویسنده
    const foundBook = books.find(
      (book) =>
        book.title.toLowerCase().includes(q.toLowerCase()) ||
        book.author.toLowerCase().includes(q.toLowerCase())
    )
    
    if (foundBook) {
      // اگر کتاب پیدا شد، به صفحه جزئیات برو
      router.push(`/book/${foundBook.id}`)
      setQuery("") // پاک کردن فیلد جستجو
    } else {
      // اگر کتاب پیدا نشد، به صفحه جستجو برو (یا صفحه اصلی)
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
  }

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
              <span className="font-bold text-xl text-primary">مکتب شریف</span>
            </div>
          </Link>

          {/* سرچ */}
          <div className="flex-1 max-w-md">
            <form className="relative" onSubmit={submitSearch} role="search" aria-label="جستجوی کتاب">
              <input
                type="search"
                placeholder="جستجوی کتاب..."
                aria-label="جستجوی کتاب"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-right"
              />
              <button type="submit" className="absolute inset-y-0 right-2 my-auto flex items-center text-muted-foreground hover:text-foreground">
                🔍
              </button>
            </form>
          </div>

          {/* بخش راست - ورود و سبد خرید */}
          <div className="flex items-center gap-4">
            <Link href="/auth" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted">
              <span>👤</span>
              <span>ورود</span>
            </Link>
            <Link href="/cart" className="relative px-3 py-2 rounded-lg hover:bg-muted">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* موبایل هدر */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">📚</span>
            </div>
            <span className="font-bold text-primary">مکتب شریف</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative px-2 py-1 rounded-lg hover:bg-muted">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? "✕" : "☰"}
            </Button>
          </div>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-border pt-4">
            <form className="relative" onSubmit={submitSearch} role="search" aria-label="جستجوی کتاب">
              <input
                type="search"
                placeholder="جستجوی کتاب..."
                aria-label="جستجوی کتاب"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm text-right"
              />
              <button type="submit" className="absolute inset-y-0 right-2 my-auto flex items-center text-sm text-muted-foreground hover:text-foreground">
                🔍
              </button>
            </form>
            <Link href="/auth" className="w-full flex items-center justify-center gap-2 border border-border rounded-lg py-2 bg-transparent hover:bg-muted">
              <span className="text-lg me-2">👤</span>
              <span>ورود</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
