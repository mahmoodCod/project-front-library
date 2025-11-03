"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { CategoryMenu } from "@/components/category-menu"
import { BookCard } from "@/components/book-card"

// نمونه داده‌های کتاب
const books = [
  {
    id: "1",
    title: "پدر",
    author: "میخائیل بولگاکوف",
    price: 89000,
    image: "/book-cover-1.png",
    rating: 4,
    reviews: 234,
    category: "fiction",
  },
  {
    id: "2",
    title: "ما کیستیم",
    author: "علی شریعتی",
    price: 75000,
    image: "/book-cover-2.jpg",
    rating: 5,
    reviews: 412,
    category: "history",
  },
  {
    id: "3",
    title: "یک یادداشت معمولی",
    author: "دوستایفسکی",
    price: 95000,
    image: "/book-cover-3.png",
    rating: 4,
    reviews: 178,
    category: "fiction",
  },
  {
    id: "4",
    title: "عادت‌های موفق",
    author: "جیمز کلیئر",
    price: 82000,
    image: "/book-cover-4.png",
    rating: 5,
    reviews: 567,
    category: "self-help",
  },
  {
    id: "5",
    title: "علم دین",
    author: "امام غزالی",
    price: 68000,
    image: "/book-cover-5.png",
    rating: 3,
    reviews: 89,
    category: "science",
  },
  {
    id: "6",
    title: "شنل‌های شگفت‌انگیز",
    author: "نویسنده ناشناخته",
    price: 55000,
    image: "/book-cover-6.png",
    rating: 4,
    reviews: 234,
    category: "kids",
  },
  {
    id: "7",
    title: "تاریخ ایران",
    author: "کاظم پایا",
    price: 120000,
    image: "/book-cover-7.png",
    rating: 4,
    reviews: 145,
    category: "history",
  },
  {
    id: "8",
    title: "سفر به ماه",
    author: "ژول ورن",
    price: 78000,
    image: "/book-cover-8.png",
    rating: 5,
    reviews: 356,
    category: "fiction",
  },
]

const categoryGroups: { key: string; title: string }[] = [
  { key: "fiction", title: "داستان و رمان" },
  { key: "history", title: "تاریخ و تمدن" },
  { key: "science", title: "علمی و تحقیقاتی" },
  { key: "self-help", title: "خودیاری و موفقیت" },
  { key: "kids", title: "کودکان و نوجوانان" },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular")

  const filteredBooks = useMemo(() => {
    let filtered = books

    if (selectedCategory !== "all") {
      filtered = books.filter((book) => book.category === selectedCategory)
    }

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [selectedCategory, sortBy])

  const groupsToRender = selectedCategory === "all"
    ? categoryGroups
    : categoryGroups.filter((g) => g.key === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CategoryMenu selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

      {/* فیلتر و مرتب‌سازی */}
      <section className="max-w-7xl mx-auto px-4 py-6 border-b border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{selectedCategory === "all" ? "مرور دسته‌ها" : `نمایش ${filteredBooks.length} کتاب`}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="مرتب‌سازی بر اساس"
              title="مرتب‌سازی کتاب‌ها"
              className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="popular">محبوب‌ترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
            </select>
          </div>
        </div>
      </section>

      {/* گروه‌های افقی دسته‌بندی */}
      <section className="max-w-7xl mx.auto px-4 py-8 space-y-12">
        {groupsToRender.map((group) => {
          const items = books.filter((b) => b.category === group.key)
          return (
            <div key={group.key}>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
                  {group.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(group.key)}
                  className="text-xs md:text-sm text-primary hover:underline"
                >
                  مشاهده همه
                </button>
              </div>

              <div className="relative">
                {/* حذف گرادیان سمت راست برای جلوگیری از سفیدی */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent" />

                <div className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-5 min-w-full snap-x snap-mandatory">
                    {items.map((book) => (
                      <div
                        key={book.id}
                        className="w-48 sm:w-56 md:w-64 flex-shrink-0 snap-start transition-transform duration-200 hover:-translate-y-1"
                      >
                        <BookCard {...book} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {selectedCategory !== "all" && groupsToRender.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">هیچ کتابی یافت نشد</p>
          </div>
        )}
      </section>

      {/* فوتر */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3">مکتب شریف</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                فروشگاه آنلاین کتاب با مجموعه‌ای از بهترین آثار ادبی، تاریخی و علمی.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">دسته‌بندی‌ها</h3>
              <ul className="space-y-2 text.sm text-muted-foreground">
                <li>داستان و رمان</li>
                <li>تاریخ و تمدن</li>
                <li>علمی و تحقیقاتی</li>
                <li>خودیاری و موفقیت</li>
                <li>کودکان و نوجوانان</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">راهنما</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>سوالات متداول</li>
                <li>قوانین و مقررات</li>
                <li>حریم خصوصی</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">ارتباط با ما</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ایمیل: support@maktebsharif.ir</li>
                <li>تلفن: 021-12345678</li>
                <li>آدرس: تهران، خیابان مثال، پلاک ۱۲۳</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground">© {new Date().getFullYear()} مکتب شریف</div>
        </div>
      </footer>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
