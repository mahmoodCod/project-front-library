"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addBook } from "@/lib/books-store"

const categories = [
  { value: "fiction", label: "داستان و رمان" },
  { value: "history", label: "تاریخ و تمدن" },
  { value: "science", label: "علمی و تحقیقاتی" },
  { value: "self-help", label: "خودیاری و موفقیت" },
  { value: "kids", label: "کودکان و نوجوانان" },
]

export default function NewBookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    discountedPrice: "",
    image: "/book-cover-1.png",
    category: "fiction",
    stockCount: "0",
    inStock: true,
    rating: "4",
    reviews: "0",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      addBook({
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        discountedPrice: Number(formData.discountedPrice) || Number(formData.price) * 0.9,
        image: formData.image,
        category: formData.category,
        stockCount: Number(formData.stockCount),
        inStock: formData.inStock && Number(formData.stockCount) > 0,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      })
      alert("کتاب با موفقیت اضافه شد")
      router.push("/admin/books")
    } catch (error) {
      alert("خطا در اضافه کردن کتاب")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">افزودن کتاب جدید</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/books">← بازگشت</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان کتاب *</label>
            <Input
              required
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
              placeholder="مثال: پدر"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">نویسنده *</label>
            <Input
              required
              value={formData.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, author: e.target.value })}
              placeholder="مثال: میخائیل بولگاکوف"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">قیمت (تومان) *</label>
            <Input
              type="number"
              required
              value={formData.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })}
              placeholder="89000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">قیمت با تخفیف (تومان)</label>
            <Input
              type="number"
              value={formData.discountedPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, discountedPrice: e.target.value })}
              placeholder="خالی بگذارید تا 10% تخفیف محاسبه شود"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">دسته‌بندی *</label>
            <select
              required
              title="انتخاب دسته‌بندی"
              value={formData.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, category: e.target.value })}
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
            <Input
              value={formData.image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/book-cover-1.png"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">موجودی *</label>
            <Input
              type="number"
              required
              min="0"
              value={formData.stockCount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, stockCount: e.target.value })}
              placeholder="15"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">امتیاز</label>
            <Input
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, rating: e.target.value })}
              placeholder="4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد نظرات</label>
            <Input
              type="number"
              min="0"
              value={formData.reviews}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, reviews: e.target.value })}
              placeholder="234"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Button type="submit">ذخیره کتاب</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/books")}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  )
}

