"use client"

import Image from "next/image"
import { useState, use as usePromise, useEffect } from "react"
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { getBook } from "@/lib/books-store"
import type { Book } from "@/lib/books-store"

const categoryLabels: Record<string, string> = {
  fiction: "داستان و رمان",
  history: "تاریخ و تمدن",
  science: "علمی و تحقیقاتی",
  "self-help": "خودیاری و موفقیت",
  kids: "کودکان و نوجوانان",
}

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params)
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  useEffect(() => {
    const found = getBook(id)
    setBook(found)
    setLoading(false)
  }, [id])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsZoomOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  if (loading) {
    return (
      <main>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </main>
    )
  }

  if (!book) {
    return (
      <main>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">کتاب پیدا نشد</h1>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        discountedPrice: book.discountedPrice,
        image: book.image,
      },
      quantity
    )
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 3000)
  }

  const discount = Math.round((1 - book.discountedPrice / book.price) * 100)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground border-b border-border">
        <div className="flex gap-2">
          <a href="/" className="hover:text-primary">
            صفحه اصلی
          </a>
          <span>/</span>
          <a href="/" className="hover:text-primary">
            کتاب‌ها
          </a>
          <span>/</span>
          <span className="text-foreground">{book.title}</span>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* تصویر کتاب */}
          <div className="flex flex-col gap-4">
            <div
              className="relative bg-muted rounded-lg overflow-hidden h-56 md:h-80 cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
              title="برای بزرگ‌نمایی کلیک کنید"
            >
              <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
              {discount > 0 && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-accent text-accent-foreground px-3 py-1 md:px-4 md:py-2 rounded-lg font-bold text-sm md:text-lg">
                  {discount}% تخفیف
                </div>
              )}
            </div>
          </div>

          {/* اطلاعات کتاب */}
          <div className="space-y-6">
            {/* عنوان و نویسنده */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{book.title}</h1>
              <p className="text-base md:text-lg text-muted-foreground mb-4">نویسنده: {book.author}</p>

              {/* امتیاز */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {book.rating} از 5 ({book.reviews} نظر)
                </span>
              </div>
            </div>

            {/* قیمت */}
            <div className="bg-muted p-4 md:p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm text-muted-foreground">قیمت:</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {book.discountedPrice.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-base md:text-lg text-muted-foreground line-through">
                    {book.price.toLocaleString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>

            {/* تعداد و سبد */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">تعداد:</span>
                <div className="flex items-center gap-2 border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stockCount, quantity + 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1 py-4 md:py-6 text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 ms-2" />
                  {isAdded ? "اضافه شد ✓" : "اضافه به سبد"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)} className="px-4">
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent text-accent" : "text-foreground"}`} />
                </Button>
                <Button variant="outline" size="lg" className="px-4 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* وضعیت موجودی + ارسال رایگان در یک ردیف مقابل هم */}
              <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center gap-2">
                  {book.inStock ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">{book.stockCount} عدد در انبار</span>
                    </>
                  ) : (
                    <span className="text-destructive font-medium">ناموجود</span>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-md">
                  <span className="text-xs font-semibold">✓ ارسال رایگان</span>
                  <span className="text-[11px] text-primary/80">برای خرید بالای ۵۰۰ هزار تومان</span>
                </div>
              </div>
            </div>

            {/* ویژگی‌ها و اطلاعات کتاب */}
            <div className="pt-4 border-t border-border">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {/* ویژگی‌های کتاب */}
                  <div>
                    <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">ویژگی‌های کتاب:</h3>
                    <ul className="space-y-2">
                      {(book.features || ["ترجمه عالی و دقیق", "چاپ لوکس و زیبا", "جلد سخت و دوام‌دار"]).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* اطلاعات کتاب */}
                  <div>
                    <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">اطلاعات کتاب</h3>
                    <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap">انتشارات:</span>
                        <span className="text-right">{book.publisher || "نامشخص"}</span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap">سال:</span>
                        <span>{book.publishYear || "نامشخص"}</span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap">تعداد صفحات:</span>
                        <span>{book.pages || "نامشخص"}</span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap">زبان:</span>
                        <span>{book.language || "فارسی"}</span>
                      </li>
                      <li className="flex justify-between items-center gap-2">
                        <span className="text-muted-foreground whitespace-nowrap">ISBN:</span>
                        <span className="text-[10px] md:text-xs text-right break-all">{book.isbn || "نامشخص"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* اطلاعات تفصیلی کتاب */}
        <div className="mt-12 space-y-6">
          {/* توضیح کتاب */}
          {book.description && (
            <div className="bg-card border border-border p-4 md:p-6 rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">درباره این کتاب</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{book.description}</p>
            </div>
          )}

          {/* نقد و بررسی */}
          <div className="bg-card border border-border p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6">نقد و بررسی</h2>

            {/* نمونه نظرات */}
            <div className="space-y-4">
              {[1, 2].map((idx) => (
                <div key={idx} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">یک کاربر راضی</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">دیروز</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    این کتاب واقعاً فوق‌العاده است. نویسندگی عمیق و احساسی است.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* لایت‌باکس تصویر */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsZoomOpen(false)}
              aria-label="بستن"
              className="absolute -top-3 -left-3 md:top-0 md:left-0 -translate-y-full md:translate-y-0 md:-translate-x-full rounded-full bg-white/90 text.black w-8 h-8 flex items-center justify-center shadow"
            >
              ×
            </button>
            <div className="relative w-[90vw] h-[80vh] md:w-[70vw] md:h-[80vh]">
              <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
