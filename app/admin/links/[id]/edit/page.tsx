"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getLink, updateLink, type Link as LinkType, type LinkType as LinkTypeEnum } from "@/lib/links-store"

const categoryKeys = [
  { value: "all", label: "همه کتاب‌ها" },
  { value: "fiction", label: "داستان و رمان" },
  { value: "history", label: "تاریخ و تمدن" },
  { value: "science", label: "علمی و تحقیقاتی" },
  { value: "self-help", label: "خودیاری و موفقیت" },
  { value: "kids", label: "کودکان و نوجوانان" },
]

export default function EditLinkPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [link, setLink] = useState<LinkType | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    label: "",
    url: "",
    type: "other" as LinkTypeEnum,
    categoryKey: "",
  })

  useEffect(() => {
    const found = getLink(id)
    if (!found) {
      alert("لینک پیدا نشد")
      router.push("/admin/links")
      return
    }
    setLink(found)
    setFormData({
      label: found.label,
      url: found.url,
      type: found.type,
      categoryKey: found.categoryKey || "",
    })
    setLoading(false)
  }, [id, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!link) return

    try {
      if (formData.type === "category") {
        if (!formData.categoryKey) {
          alert("لطفاً کلید دسته‌بندی را انتخاب کنید")
          return
        }
        updateLink(id, {
          label: formData.label,
          url: formData.categoryKey === "all" ? "/" : `/category/${formData.categoryKey}`,
          type: formData.type,
          categoryKey: formData.categoryKey,
        })
      } else {
        if (!formData.url) {
          alert("لطفاً آدرس را وارد کنید")
          return
        }
        if (!formData.url.startsWith("http://") && !formData.url.startsWith("https://") && !formData.url.startsWith("/")) {
          alert("لطفاً URL را با http://، https:// یا / شروع کنید")
          return
        }
        updateLink(id, {
          label: formData.label,
          url: formData.url,
          type: formData.type,
        })
      }
      alert("لینک با موفقیت به‌روزرسانی شد")
      router.push("/admin/links")
    } catch (error) {
      alert("خطا در به‌روزرسانی لینک")
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

  if (!link) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ویرایش لینک: {link.label}</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/links">← بازگشت</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">نوع لینک *</label>
            <select
              required
              value={formData.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, type: e.target.value as LinkTypeEnum, categoryKey: formData.type === "category" ? formData.categoryKey : "", url: formData.type !== "category" ? formData.url : "" })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="category">دسته‌بندی (منوی زیر هدر)</option>
              <option value="footer-category">دسته‌بندی فوتر</option>
              <option value="footer-support">پشتیبانی فوتر</option>
              <option value="social">شبکه‌های اجتماعی</option>
              <option value="other">سایر</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان لینک *</label>
            <Input
              required
              value={formData.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, label: e.target.value })}
              placeholder="مثال: اینستاگرام"
            />
          </div>

          {formData.type === "category" ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">کلید دسته‌بندی *</label>
              <select
                required
                value={formData.categoryKey}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, categoryKey: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">انتخاب کنید</option>
                {categoryKeys.map((key) => (
                  <option key={key.value} value={key.value}>
                    {key.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">این کلید برای فیلتر کردن کتاب‌ها استفاده می‌شود</p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">آدرس (URL) *</label>
              <Input
                required
                value={formData.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, url: e.target.value })}
                placeholder={formData.type === "footer-category" || formData.type === "footer-support" ? "/category/fiction" : "https://example.com"}
              />
              <p className="text-xs text-muted-foreground">
                {formData.type === "footer-category" || formData.type === "footer-support"
                  ? "می‌توانید از URL داخلی (مثل /category/fiction) یا خارجی استفاده کنید"
                  : "لطفاً URL را با http://، https:// یا / شروع کنید"}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/links")}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  )
}

