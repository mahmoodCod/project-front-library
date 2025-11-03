"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getBook, updateBook } from "@/lib/books-store"
import type { Book } from "@/lib/books-store"

const categories = [
  { value: "fiction", label: "داستان و رمان" },
  { value: "history", label: "تاریخ و تمدن" },
  { value: "science", label: "علمی و تحقیقاتی" },
  { value: "self-help", label: "خودیاری و موفقیت" },
  { value: "kids", label: "کودکان و نوجوانان" },
]

export default function EditBookPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = getBook(id)
    if (!found) {
      alert("کتاب پیدا نشد")
      router.push("/admin/books")
      return
    }
    setBook(found)
    setLoading(false)
  }, [id, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!book) return

    const formData = new FormData(e.currentTarget)
    try {
      updateBook(id, {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        price: Number(formData.get("price")),
        discountedPrice: Number(formData.get("discountedPrice")) || Number(formData.get("price")) * 0.9,
        image: (formData.get("image") as string) || book.image,
        category: formData.get("category") as string,
        stockCount: Number(formData.get("stockCount")),
        inStock: Number(formData.get("stockCount")) > 0,
        rating: Number(formData.get("rating")),
        reviews: Number(formData.get("reviews")),
      })
      alert("کتاب با موفقیت به‌روزرسانی شد")
      router.push("/admin/books")
    } catch (error) {
      alert("خطا در به‌روزرسانی کتاب")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (!book) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ویرایش کتاب: {book.title}</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/books">← بازگشت</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان کتاب *</label>
            <Input name="title" required defaultValue={book.title} placeholder="مثال: پدر" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">نویسنده *</label>
            <Input name="author" required defaultValue={book.author} placeholder="مثال: میخائیل بولگاکوف" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">قیمت (تومان) *</label>
            <Input name="price" type="number" required defaultValue={book.price} placeholder="89000" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">قیمت با تخفیف (تومان)</label>
            <Input
              name="discountedPrice"
              type="number"
              defaultValue={book.discountedPrice}
              placeholder="خالی بگذارید تا 10% تخفیف محاسبه شود"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">دسته‌بندی *</label>
            <select
              name="category"
              required
              defaultValue={book.category}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">تصویر</label>
            <Input name="image" defaultValue={book.image} placeholder="/book-cover-1.png" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">موجودی *</label>
            <Input name="stockCount" type="number" required min="0" defaultValue={book.stockCount} placeholder="15" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">امتیاز</label>
            <Input name="rating" type="number" min="1" max="5" defaultValue={book.rating} placeholder="4" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد نظرات</label>
            <Input name="reviews" type="number" min="0" defaultValue={book.reviews} placeholder="234" />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/books")}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  )
}

