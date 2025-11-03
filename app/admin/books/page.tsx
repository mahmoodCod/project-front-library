"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getBooks, deleteBook, type Book } from "@/lib/books-store"

export default function AdminBooksPage() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    setBooks(getBooks())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟")) {
      if (deleteBook(id)) {
        setBooks(getBooks())
        alert("کتاب با موفقیت حذف شد")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">مدیریت کتاب‌ها</h1>
        <Button asChild>
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
        <div className="bg-card border border-border rounded-lg">
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
                {books.map((b) => (
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
      )}
    </div>
  )
}
