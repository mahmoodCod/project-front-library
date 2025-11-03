"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirmation")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* مراحل */}
        <div className="flex items-center justify-between mb-12">
          {[
            { id: "shipping", label: "آدرس ارسال" },
            { id: "payment", label: "پرداخت" },
            { id: "confirmation", label: "تایید" },
          ].map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  ["shipping", "payment", "confirmation"].indexOf(step) >= idx
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {idx + 1}
              </div>
              <p className="text-sm font-medium text-muted-foreground ms-2">{s.label}</p>
              {idx < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    ["shipping", "payment", "confirmation"].indexOf(step) > idx ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* مرحله ارسال */}
        {step === "shipping" && (
          <form onSubmit={handleShippingSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold">آدرس ارسال</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ایمیل</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">آدرس</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">شهر</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">کد پستی</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Link href="/cart">
                <Button variant="outline">بازگشت</Button>
              </Link>
              <Button type="submit">ادامه</Button>
            </div>
          </form>
        )}

        {/* مرحله پرداخت */}
        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold">روش پرداخت</h2>

            <div className="space-y-3">
              {[
                { id: "card", label: "کارت اعتباری" },
                { id: "wallet", label: "کیف پول دیجیتال" },
                { id: "bank", label: "تراسفر بانکی" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ms-3 font-medium">{method.label}</span>
                </label>
              ))}
            </div>

            {formData.paymentMethod === "card" && (
              <div className="bg-muted p-6 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">شماره کارت</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">تاریخ انقضا</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="000"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setStep("shipping")}>
                بازگشت
              </Button>
              <Button type="submit">تایید پرداخت</Button>
            </div>
          </form>
        )}

        {/* تایید */}
        {step === "confirmation" && (
          <div className="bg-card border border-border rounded-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">سفارش شما تایید شد!</h2>
              <p className="text-muted-foreground">
                شماره سفارش: <span className="font-bold text-foreground">#BOO-2024-001234</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">لطفاً ایمیل تایید را بررسی کنید</p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm">
              <p className="font-semibold mb-2">جزئیات ارسال:</p>
              <p className="text-muted-foreground">کتاب‌های شما تا ۲ روز کاری در آدرس شما تحویل داده می‌شود</p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">بازگشت به صفحه اصلی</Button>
              </Link>
              <Button>پیگیری سفارش</Button>
            </div>
          </div>
        )}
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
