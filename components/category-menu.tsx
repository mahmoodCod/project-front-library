"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getCategoryLinks, ensureDefaultLinks, type Link as LinkType } from "@/lib/links-store"

export function CategoryMenu({
  selectedCategory,
  onSelect,
}: {
  selectedCategory?: string
  onSelect?: (categoryKey: string) => void
}) {
  const [categories, setCategories] = useState<LinkType[]>([])

  useEffect(() => {
    // اطمینان از اینکه همه لینک‌های پیش‌فرض وجود دارند
    ensureDefaultLinks()
    setCategories(getCategoryLinks())
  }, [])

  return (
    <nav className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar py-3">
          {categories.length > 0 ? (
            categories.map((category) => {
              const categoryKey = category.categoryKey || "all"
              const isActive = selectedCategory === categoryKey || (!selectedCategory && categoryKey === "all")
              return onSelect ? (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onSelect(categoryKey)}
                  className={
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap " +
                    (isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary hover:bg-muted")
                  }
                >
                  {category.label}
                </button>
              ) : (
                <Link
                  key={category.id}
                  href={category.url}
                  className={
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap text-foreground hover:text-primary hover:bg-muted"
                  }
                >
                  {category.label}
                </Link>
              )
            })
          ) : (
            <span className="text-sm text-muted-foreground px-4 py-2">در حال بارگذاری...</span>
          )}
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
