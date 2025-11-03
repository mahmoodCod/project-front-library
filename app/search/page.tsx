"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const filteredBooks = useMemo(() => {
    if (!query.trim()) return []
    
    const q = query.toLowerCase()
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            نتایج جستجو
          </h1>
          {query && (
            <p className="text-muted-foreground">
              جستجو برای: <span className="font-semibold text-foreground">{query}</span>
            </p>
          )}
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">
              هیچ کتابی برای "{query}" یافت نشد
            </p>
            <p className="text-sm text-muted-foreground">
              لطفاً کلمه کلیدی دیگری امتحان کنید
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لطفاً کلمه کلیدی را وارد کنید</p>
          </div>
        )}
      </div>
    </main>
  )
}

