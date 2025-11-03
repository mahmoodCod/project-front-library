"use client"

import { useState } from "react"
import { Trash2, Edit, Plus, Search } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Book {
  id: string
  title: string
  author: string
  price: number
  stock: number
  image: string
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([
    { id: "1", title: "پدر", author: "میخائیل بولگاکوف", price: 71200, stock: 15, image: "/book-cover-1.png" },
    { id: "2", title: "ما کیستیم", author: "علی شریعتی", price: 67500, stock: 23, image: "/book-cover-2.jpg" },
    { id: "3", title: "یک یادداشت معمولی", author: "دوستایفسکی", price: 85500, stock: 8, image: "/book-cover-3.png" },
    { id: "4", title: "عادت‌های موفق", author: "جیمز کلیئر", price: 73800, stock: 31, image: "/book-cover-4.png" },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredBooks = books.filter((book) => book.title.includes(searchTerm) || book.author.includes(searchTerm))

  const handleDelete = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="books" />

      <div className="flex-1">
        {/* هدر */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مدیریت کتاب‌ها</h1>
            <p className="text-muted-foreground">مدیریت فهرست کتاب‌های فروشگاه</p>
          </div>
          <Button>
            <Plus className="w-5 h-5 ms-2" />
            افزودن کتاب جدید
          </Button>
        </div>

        {/* محتوا */}
        <div className="p-6 space-y-4">
          {/* جستجو */}
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="جستجو برای کتاب یا نویسنده..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* جدول */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-right py-4 px-6 font-semibold">کتاب</th>
                    <th className="text-right py-4 px-6 font-semibold">نویسنده</th>
                    <th className="text-right py-4 px-6 font-semibold">قیمت</th>
                    <th className="text-right py-4 px-6 font-semibold">موجودی</th>
                    <th className="text-right py-4 px-6 font-semibold">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-12 bg-muted rounded">
                            <Image
                              src={book.image || "/placeholder.svg"}
                              alt={book.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <span className="font-medium">{book.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{book.author}</td>
                      <td className="py-4 px-6 font-semibold text-primary">{book.price.toLocaleString("fa-IR")}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            book.stock > 20
                              ? "bg-green-100 text-green-700"
                              : book.stock > 5
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {book.stock} عدد
                        </span>
                      </td>
                      <td className="py-4 px-6 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive bg-transparent"
                          onClick={() => handleDelete(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
