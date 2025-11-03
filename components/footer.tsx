"use client"

import type React from "react"

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left place-items-center sm:place-items-start">
          {/* brand/intro */}
          <div className="w-full">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-lg">📚</span>
              </div>
              <span className="font-extrabold text-lg text-primary">مکتب شریف</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              فروشگاه آنلاین کتاب با مجموعه‌ای منتخب از بهترین آثار ادبی، تاریخی و علمی. تجربه خرید سریع، امن و لذت‌بخش.
            </p>
          </div>

          {/* categories */}
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-foreground">دسته‌بندی‌ها</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">داستان و رمان</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">تاریخ و تمدن</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">علمی و تحقیقاتی</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">خودیاری و موفقیت</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">کودکان و نوجوانان</a></li>
            </ul>
          </div>

          {/* support */}
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-foreground">پشتیبانی</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">سوالات متداول</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">قوانین و مقررات</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">پیگیری سفارش</a></li>
            </ul>
          </div>

          {/* newsletter + contact */}
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-foreground">عضویت در خبرنامه</h3>
            <p className="text-sm text-muted-foreground mb-3">جدیدترین کتاب‌ها و تخفیف‌ها را زودتر از همه دریافت کنید.</p>
            <form className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-4" onSubmit={(e: any) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="ایمیل شما"
                className="w-full sm:flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                aria-label="ایمیل"
              />
              <button type="submit" className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                عضویت
              </button>
            </form>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-muted-foreground text-sm">
              <span className="whitespace-nowrap">ایمیل: support@maktebsharif.ir</span>
              <span className="opacity-40">|</span>
              <span className="whitespace-nowrap">تلفن: 021-12345678</span>
            </div>
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3 text-xl">
              <a href="#" aria-label="اینستاگرام" className="hover:text-primary transition-colors">📷</a>
              <a href="#" aria-label="تلگرام" className="hover:text-primary transition-colors">✈️</a>
              <a href="#" aria-label="توئیتر" className="hover:text-primary transition-colors">🐦</a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} مکتب شریف — تمامی حقوق محفوظ است
        </div>
      </div>
    </footer>
  )
}
