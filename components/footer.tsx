"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Instagram, Send, MessageCircle, Twitter, Facebook } from "lucide-react"
import { getLinksByType, ensureDefaultLinks, type Link as LinkType } from "@/lib/links-store"

export function Footer() {
  const [footerCategories, setFooterCategories] = useState<LinkType[]>([])
  const [footerSupport, setFooterSupport] = useState<LinkType[]>([])
  const [socialLinks, setSocialLinks] = useState<LinkType[]>([])

  useEffect(() => {
    // اطمینان از اینکه همه لینک‌های پیش‌فرض وجود دارند
    ensureDefaultLinks()
    setFooterCategories(getLinksByType("footer-category"))
    setFooterSupport(getLinksByType("footer-support"))
    setSocialLinks(getLinksByType("social"))
  }, [])

  const getSocialIcon = (label: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      اینستاگرام: Instagram,
      تلگرام: Send,
      واتساپ: MessageCircle,
      توییتر: Twitter,
      فیسبوک: Facebook,
    }
    return iconMap[label] || MessageCircle
  }

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
              {footerCategories.length > 0 ? (
                footerCategories.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground/50">هیچ لینکی تعریف نشده</li>
              )}
            </ul>
          </div>

          {/* support */}
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-foreground">پشتیبانی</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerSupport.length > 0 ? (
                footerSupport.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground/50">هیچ لینکی تعریف نشده</li>
              )}
            </ul>
          </div>

          {/* newsletter + contact */}
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-foreground">عضویت در خبرنامه</h3>
            <p className="text-sm text-muted-foreground mb-3">جدیدترین کتاب‌ها و تخفیف‌ها را زودتر از همه دریافت کنید.</p>
            <form className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
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
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  const IconComponent = getSocialIcon(link.label)
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                      title={link.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })
              ) : (
                <span className="text-muted-foreground/50 text-xs">هیچ لینک اجتماعی تعریف نشده</span>
              )}
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
