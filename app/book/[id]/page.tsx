"use client"

import Image from "next/image"
import { useState, use as usePromise } from "react"
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

// نمونه داده برای کتاب
const books = {
  "1": {
    id: "1",
    title: "پدر",
    author: "میخائیل بولگاکوف",
    price: 89000,
    discountedPrice: 71200,
    image: "/book-cover-1.png",
    rating: 4,
    reviews: 234,
    description:
      "پدر یکی از بهترین آثار ادبی جهان است که داستان رابطه پیچیده بین پدر و فرزند را به تصویر می‌کشد. این کتاب مجموعه‌ای از احساسات عمیق، درام‌های خانوادگی و فلسفه زندگی است.",
    publisher: "انتشارات افق",
    publishYear: 1384,
    pages: 320,
    language: "فارسی",
    isbn: "978-964-6436-12-5",
    category: "داستان و رمان",
    features: ["ترجمه عالی و دقیق", "چاپ لوکس و زیبا", "جلد سخت و دوام‌دار", "فهرست و پی‌نویس‌های مفید"],
    relatedBooks: [2, 3, 4],
    inStock: true,
    stockCount: 15,
  },
}

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params)
  const book = books[id as keyof typeof books]
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

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
            <div className="relative bg-muted rounded-lg overflow-hidden h-96 md:h-full">
              <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold text-lg">
                  {discount}% تخفیف
                </div>
              )}
            </div>
          </div>

          {/* اطلاعات کتاب */}
          <div className="space-y-6">
            {/* عنوان و نویسنده */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">نویسنده: {book.author}</p>

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
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">قیمت:</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {book.discountedPrice.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {book.price.toLocaleString("fa-IR")}
                    </span>
                  </div>
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
                <Button onClick={handleAddToCart} className="flex-1 py-6 text-base">
                  <ShoppingCart className="w-5 h-5 ms-2" />
                  {isAdded ? "اضافه شد ✓" : "اضافه به سبد"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)} className="px-4">
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent text-accent" : "text-foreground"}`} />
                </Button>
                <Button variant="outline" size="lg" className="px-4 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* وضعیت موجودی */}
              <div className="flex items-center gap-2 text-sm">
                {book.inStock ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">{book.stockCount} عدد در انبار</span>
                  </>
                ) : (
                  <span className="text-destructive font-medium">ناموجود</span>
                )}
              </div>
            </div>

            {/* ویژگی‌ها */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-4">ویژگی‌های کتاب:</h3>
              <ul className="space-y-2">
                {book.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* اطلاعات تفصیلی کتاب */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* توضیح کتاب */}
            <div className="bg-card border border-border p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">درباره این کتاب</h2>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            {/* نقد و بررسی */}
            <div className="bg-card border border-border p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">نقد و بررسی</h2>

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

          {/* پنل جانبی */}
          <div className="space-y-4">
            {/* اطلاعات انتشار */}
            <div className="bg-card border border-border p-6 rounded-lg">
              <h3 className="font-semibold mb-4">اطلاعات کتاب</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">انتشارات:</span>
                  <span>{book.publisher}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">سال:</span>
                  <span>{book.publishYear}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">تعداد صفحات:</span>
                  <span>{book.pages}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">زبان:</span>
                  <span>{book.language}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="text-xs">{book.isbn}</span>
                </li>
              </ul>
            </div>

            {/* ارسال رایگان */}
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
              <p className="text-sm text-primary font-semibold">✓ ارسال رایگان برای خرید بالای ۵۰۰ هزار تومان</p>
            </div>
          </div>
        </div>
      </div>

      {/* فوتر */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© ۱۴۰۳ کتاب‌خانه. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </main>
  )
}
