"use client"

import Link from "next/link"

const categories = [
  { name: "تمام کتاب‌ها", key: "all" },
  { name: "داستان و رمان", key: "fiction" },
  { name: "تاریخ و تمدن", key: "history" },
  { name: "علمی و تحقیقاتی", key: "science" },
  { name: "خودیاری و موفقیت", key: "self-help" },
  { name: "کودکان و نوجوانان", key: "kids" },
]

export function CategoryMenu({
  selectedCategory,
  onSelect,
}: {
  selectedCategory?: string
  onSelect?: (categoryKey: string) => void
}) {
  return (
    <nav className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar py-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category.key || (!selectedCategory && category.key === "all")
            return onSelect ? (
              <button
                key={category.key}
                type="button"
                onClick={() => onSelect(category.key)}
                className={
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap " +
                  (isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:text-primary hover:bg-muted")
                }
              >
                {category.name}
              </button>
            ) : (
              <Link
                key={category.key}
                href={category.key === "all" ? "/" : `/category/${category.key}`}
                className={
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap text-foreground hover:text-primary hover:bg-muted"
                }
              >
                {category.name}
              </Link>
            )
          })}
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
