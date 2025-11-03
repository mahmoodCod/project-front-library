"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { BookCard } from "@/components/book-card"
import { getBooks } from "@/lib/books-store"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const filteredBooks = useMemo(() => {
    if (!query.trim()) return []
    
    const books = getBooks()
    const q = query.toLowerCase()
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
    )
  }, [query])

  return (
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
  )
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              نتایج جستجو
            </h1>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">در حال بارگذاری...</p>
          </div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </main>
  )
}

