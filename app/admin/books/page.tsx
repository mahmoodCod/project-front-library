"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBooks, deleteBook, type Book } from "@/lib/books-store"

const ITEMS_PER_PAGE = 5

export default function AdminBooksPage() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setBooks(getBooks())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟")) {
      if (deleteBook(id)) {
        const updatedBooks = getBooks()
        setBooks(updatedBooks)
        // اگر آخرین صفحه خالی شد، به صفحه قبل برو
        const totalPages = Math.ceil(updatedBooks.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages)
        }
        alert("کتاب با موفقیت حذف شد")
      }
    }
  }

  // محاسبه pagination
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBooks = books.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl md:text-2xl font-bold">مدیریت کتاب‌ها</h1>
        <Button asChild className="text-xs md:text-sm">
          <Link href="/admin/books/new">+ کتاب جدید</Link>
        </Button>
      </div>

      {books.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">هنوز کتابی اضافه نشده است</p>
          <Button asChild>
            <Link href="/admin/books/new">کتاب اول را اضافه کنید</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* نمایش موبایل - کارت‌بندی */}
          <div className="md:hidden space-y-3">
            {paginatedBooks.map((b) => (
              <div key={b.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm flex-1">{b.title}</h3>
                    <span className={b.inStock ? "text-green-600 text-xs font-medium" : "text-destructive text-xs font-medium"}>
                      {b.stockCount} عدد
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">نویسنده: {b.author}</p>
                  <p className="text-sm font-semibold">{b.price.toLocaleString("fa-IR")} تومان</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="text-xs flex-1 min-w-0" asChild>
                    <Link href={`/book/${b.id}`}>مشاهده</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs flex-1 min-w-0" asChild>
                    <Link href={`/admin/books/${b.id}/edit`}>ویرایش</Link>
                  </Button>
                  <Button variant="destructive" size="sm" className="text-xs flex-1 min-w-0" onClick={() => handleDelete(b.id)}>
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* نمایش دسکتاپ - جدول */}
          <div className="hidden md:block bg-card border border-border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-right px-4 py-3 font-semibold">عنوان</th>
                    <th className="text-right px-4 py-3 font-semibold">نویسنده</th>
                    <th className="text-right px-4 py-3 font-semibold">قیمت</th>
                    <th className="text-right px-4 py-3 font-semibold">موجودی</th>
                    <th className="text-right px-4 py-3 font-semibold">اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBooks.map((b) => (
                    <tr key={b.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{b.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.author}</td>
                      <td className="px-4 py-3">{b.price.toLocaleString("fa-IR")} ت</td>
                      <td className="px-4 py-3">
                        <span className={b.inStock ? "text-green-600" : "text-destructive"}>
                          {b.stockCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/book/${b.id}`}>مشاهده</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/books/${b.id}/edit`}>ویرایش</Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="text-xs md:text-sm"
              >
                <ChevronRight className="w-4 h-4" />
                قبلی
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="text-xs md:text-sm min-w-[2rem]"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="text-xs md:text-sm"
              >
                بعدی
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* نمایش اطلاعات صفحه */}
          {totalPages > 1 && (
            <div className="text-center text-sm text-muted-foreground">
              نمایش {startIndex + 1} تا {Math.min(endIndex, books.length)} از {books.length} کتاب
            </div>
          )}
        </>
      )}
    </div>
  )
}
