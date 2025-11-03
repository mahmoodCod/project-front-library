"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { CategoryMenu } from "@/components/category-menu"
import { BookCard } from "@/components/book-card"
import { FeaturedSection } from "@/components/featured-section"

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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular")

  const filteredBooks = useMemo(() => {
    let filtered = books

    if (selectedCategory !== "all") {
      filtered = books.filter((book) => book.category === selectedCategory)
    }

    // مرتب‌سازی
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CategoryMenu />

      {/* بخش برجسته */}
      <FeaturedSection />

      {/* فیلتر و مرتب‌سازی */}
      <section className="max-w-7xl mx-auto px-4 py-6 border-b border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">نمایش {filteredBooks.length} کتاب</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="popular">محبوب‌ترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
            </select>
          </div>
        </div>
      </section>

      {/* شبکه کتاب‌ها */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        ) : (
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
              <h4 className="font-bold mb-4">درباره ما</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    تاریخچه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    تیم ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    وظایف
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدمات</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    ارسال سریع
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    بازگشت راحت
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    ضمانت
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    تلفن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    ایمیل
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    آدرس
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">شبکه‌های اجتماعی</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    اینستاگرام
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    توتر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    فیس‌بوک
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© ۱۴۰۳ کتاب‌خانه. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
