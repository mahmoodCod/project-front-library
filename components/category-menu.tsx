"use client"

import Link from "next/link"

const categories = [
  { name: "تمام کتاب‌ها", href: "/" },
  { name: "داستان و رمان", href: "/category/fiction" },
  { name: "تاریخ و تمدن", href: "/category/history" },
  { name: "علمی و تحقیقاتی", href: "/category/science" },
  { name: "خودیاری و موفقیت", href: "/category/self-help" },
  { name: "کودکان و نوجوانان", href: "/category/kids" },
]

export function CategoryMenu() {
  return (
    <nav className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar py-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  )
}
