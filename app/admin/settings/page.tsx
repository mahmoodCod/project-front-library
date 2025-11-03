"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSettings, saveSettings, resetSettings, type SiteSettings } from "@/lib/settings-store"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(getSettings())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(getSettings())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    alert("تنظیمات با موفقیت ذخیره شد")
  }

  const handleReset = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید همه تنظیمات را به حالت پیش‌فرض برگردانید؟")) {
      resetSettings()
      setSettings(getSettings())
      alert("تنظیمات به حالت پیش‌فرض بازگشت")
    }
  }

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">تنظیمات سایت</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            بازگشت به پیش‌فرض
          </Button>
          {saved && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              ✓ ذخیره شد
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* اطلاعات کتابخانه */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">اطلاعات کتابخانه</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام سایت *</label>
              <Input
                required
                value={settings.siteName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("siteName", e.target.value)}
                placeholder="مکتب شریف"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">آدرس لوگو</label>
              <Input
                value={settings.logo || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("logo", e.target.value)}
                placeholder="/logo.png"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">توضیحات سایت *</label>
              <textarea
                required
                value={settings.siteDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("siteDescription", e.target.value)}
                placeholder="توضیحات درباره کتابخانه..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">اطلاعات تماس</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">ایمیل تماس *</label>
              <Input
                required
                type="email"
                value={settings.contactEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("contactEmail", e.target.value)}
                placeholder="support@maktebsharif.ir"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">شماره تماس *</label>
              <Input
                required
                value={settings.contactPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("contactPhone", e.target.value)}
                placeholder="021-12345678"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">آدرس</label>
              <Input
                value={settings.contactAddress || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("contactAddress", e.target.value)}
                placeholder="تهران، ایران"
              />
            </div>
          </div>
        </div>

        {/* تنظیمات مالی */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">تنظیمات مالی</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">واحد پول *</label>
              <Input
                required
                value={settings.currency}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("currency", e.target.value)}
                placeholder="تومان"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">حداقل مبلغ ارسال رایگان (تومان) *</label>
              <Input
                required
                type="number"
                min="0"
                value={settings.freeShippingThreshold}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("freeShippingThreshold", Number(e.target.value))}
                placeholder="500000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">درصد مالیات</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("taxRate", Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* تنظیمات نمایش */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">تنظیمات نمایش</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">تعداد آیتم در هر صفحه *</label>
              <Input
                required
                type="number"
                min="1"
                max="100"
                value={settings.itemsPerPage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("itemsPerPage", Number(e.target.value))}
                placeholder="12"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableReviews"
                  checked={settings.enableReviews}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("enableReviews", e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="enableReviews" className="text-sm font-medium cursor-pointer">
                  فعال‌سازی نظرات و امتیازدهی
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableWishlist"
                  checked={settings.enableWishlist}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("enableWishlist", e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="enableWishlist" className="text-sm font-medium cursor-pointer">
                  فعال‌سازی لیست علاقه‌مندی
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* تنظیمات سئو */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">تنظیمات سئو (SEO)</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان متا</label>
              <Input
                value={settings.metaTitle || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("metaTitle", e.target.value)}
                placeholder="مکتب شریف - فروشگاه آنلاین کتاب"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات متا</label>
              <textarea
                value={settings.metaDescription || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("metaDescription", e.target.value)}
                placeholder="توضیحات برای موتورهای جستجو..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">کلمات کلیدی (با کاما جدا کنید)</label>
              <Input
                value={settings.metaKeywords || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("metaKeywords", e.target.value)}
                placeholder="کتاب، خرید کتاب، فروشگاه کتاب"
              />
            </div>
          </div>
        </div>

        {/* دکمه‌های ذخیره */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
          <Button type="submit" size="lg">
            ذخیره تنظیمات
          </Button>
        </div>
      </form>
    </div>
  )
}

