// مدیریت تنظیمات با localStorage

export type SiteSettings = {
  // اطلاعات کتابخانه
  siteName: string
  siteDescription: string
  logo?: string
  
  // اطلاعات تماس
  contactEmail: string
  contactPhone: string
  contactAddress?: string
  
  // تنظیمات عمومی
  currency: string
  freeShippingThreshold: number // حداقل مبلغ برای ارسال رایگان
  taxRate: number // درصد مالیات
  
  // تنظیمات نمایش
  itemsPerPage: number
  enableReviews: boolean
  enableWishlist: boolean
  
  // تنظیمات سئو
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

const STORAGE_KEY = "admin-settings"

const defaultSettings: SiteSettings = {
  siteName: "مکتب شریف",
  siteDescription: "فروشگاه آنلاین کتاب با مجموعه‌ای منتخب از بهترین آثار ادبی، تاریخی و علمی",
  contactEmail: "support@maktebsharif.ir",
  contactPhone: "021-12345678",
  contactAddress: "تهران، ایران",
  currency: "تومان",
  freeShippingThreshold: 500000,
  taxRate: 0,
  itemsPerPage: 12,
  enableReviews: true,
  enableWishlist: true,
  metaTitle: "مکتب شریف - فروشگاه آنلاین کتاب",
  metaDescription: "خرید آنلاین کتاب با بهترین قیمت و ارسال سریع",
  metaKeywords: "کتاب، خرید کتاب، فروشگاه کتاب، کتاب آنلاین",
}

export function getSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as SiteSettings
      // merge با پیش‌فرض برای اطمینان از وجود تمام فیلدها
      return { ...defaultSettings, ...parsed }
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings))
    return defaultSettings
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: Partial<SiteSettings>): void {
  if (typeof window === "undefined") return
  try {
    const current = getSettings()
    const updated = { ...current, ...settings }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {}
}

export function updateSetting<T extends keyof SiteSettings>(
  key: T,
  value: SiteSettings[T]
): void {
  if (typeof window === "undefined") return
  try {
    const current = getSettings()
    const updated = { ...current, [key]: value }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {}
}

export function resetSettings(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings))
  } catch {}
}

