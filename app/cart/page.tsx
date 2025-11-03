"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  discountedPrice: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "پدر",
      author: "میخائیل بولگاکوف",
      price: 89000,
      discountedPrice: 71200,
      image: "/book-cover-1.png",
      quantity: 1,
    },
    {
      id: "2",
      title: "ما کیستیم",
      author: "علی شریعتی",
      price: 75000,
      discountedPrice: 67500,
      image: "/book-cover-2.jpg",
      quantity: 2,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode === "BOOKFEST2024") {
      setDiscountPercent(15)
    } else if (promoCode === "WELCOME10") {
      setDiscountPercent(10)
    } else {
      alert("کد تخفیف معتبر نیست")
      setDiscountPercent(0)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const discount = Math.floor(subtotal * (discountPercent / 100))
  const shippingCost = subtotal > 500000 ? 0 : 15000
  const total = subtotal - discount + shippingCost

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">سبد خرید خالی است</h1>
          <p className="text-muted-foreground mb-8">هنوز کتابی به سبد خود نیافزوده‌اید</p>
          <Link href="/">
            <Button>بازگشت به فروشگاه</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground border-b border-border">
        <div className="flex gap-2">
          <Link href="/" className="hover:text-primary">
            صفحه اصلی
          </Link>
          <span>/</span>
          <span className="text-foreground">سبد خرید</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* لیست محصولات */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                {/* تصویر */}
                <div className="relative w-24 h-32 flex-shrink-0 bg-muted rounded">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* اطلاعات */}
                <div className="flex-1">
                  <Link href={`/book/${item.id}`}>
                    <h3 className="font-semibold hover:text-primary cursor-pointer">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{item.author}</p>

                  <div className="flex items-center justify-between mt-4">
                    {/* قیمت */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{item.discountedPrice.toLocaleString("fa-IR")}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {item.price.toLocaleString("fa-IR")}
                      </span>
                    </div>

                    {/* تعداد */}
                    <div className="flex items-center gap-2 border border-border rounded">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 font-medium min-w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* حذف */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* جمع بندی ردیف */}
                  <div className="mt-3 text-sm text-muted-foreground">
                    جمع: {(item.discountedPrice * item.quantity).toLocaleString("fa-IR")} تومان
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
              <h2 className="text-xl font-bold">خلاصه سفارش</h2>

              {/* کد تخفیف */}
              <div className="space-y-2">
                <label className="text-sm font-medium">کد تخفیف</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="کد تخفیف را وارد کنید"
                    className="flex-1 px-3 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <Button variant="outline" size="sm" onClick={applyPromoCode}>
                    اعمال
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">کدهای نمونه: BOOKFEST2024، WELCOME10</p>
              </div>

              {/* حساب */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span>جمع محصولات:</span>
                  <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>تخفیف ({discountPercent}%):</span>
                    <span>-{discount.toLocaleString("fa-IR")} تومان</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span>هزینه ارسال:</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-semibold">رایگان</span>
                    ) : (
                      `${shippingCost.toLocaleString("fa-IR")} تومان`
                    )}
                  </span>
                </div>

                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                  <span>مجموع:</span>
                  <span className="text-primary">{total.toLocaleString("fa-IR")} تومان</span>
                </div>
              </div>

              {/* دکمه پرداخت */}
              <Link href="/checkout">
                <Button className="w-full py-6 text-base">نهایی کردن سفارش</Button>
              </Link>

              {/* پیام ارسال رایگان */}
              {shippingCost === 0 ? (
                <p className="text-xs text-green-600 text-center font-semibold">
                  ✓ شما برای ارسال رایگان واجد شرایط هستید
                </p>
              ) : (
                <p className="text-xs text-muted-foreground text-center">
                  برای ارسال رایگان {(500000 - subtotal).toLocaleString("fa-IR")} تومان دیگر خرید کنید
                </p>
              )}
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
