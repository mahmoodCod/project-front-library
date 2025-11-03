// مدیریت لینک‌ها با localStorage

export type LinkType = "category" | "footer-category" | "footer-support" | "social" | "other"

export type Link = {
  id: string
  label: string
  url: string
  type: LinkType
  categoryKey?: string // برای لینک‌های category، کلید دسته‌بندی (fiction, history, etc.)
  order?: number // برای ترتیب نمایش
}

const STORAGE_KEY = "admin-links"

// لینک‌های پیش‌فرض نمونه
const defaultLinks: Link[] = [
  // دسته‌بندی‌های منوی زیر هدر
  { id: "cat1", label: "تمام کتاب‌ها", type: "category", categoryKey: "all", url: "/", order: 1 },
  { id: "cat2", label: "داستان و رمان", type: "category", categoryKey: "fiction", url: "/category/fiction", order: 2 },
  { id: "cat3", label: "تاریخ و تمدن", type: "category", categoryKey: "history", url: "/category/history", order: 3 },
  { id: "cat4", label: "علمی و تحقیقاتی", type: "category", categoryKey: "science", url: "/category/science", order: 4 },
  { id: "cat5", label: "خودیاری و موفقیت", type: "category", categoryKey: "self-help", url: "/category/self-help", order: 5 },
  { id: "cat6", label: "کودکان و نوجوانان", type: "category", categoryKey: "kids", url: "/category/kids", order: 6 },
  
  // لینک‌های دسته‌بندی فوتر
  { id: "fc1", label: "داستان و رمان", type: "footer-category", url: "/category/fiction", order: 1 },
  { id: "fc2", label: "تاریخ و تمدن", type: "footer-category", url: "/category/history", order: 2 },
  { id: "fc3", label: "علمی و تحقیقاتی", type: "footer-category", url: "/category/science", order: 3 },
  { id: "fc4", label: "خودیاری و موفقیت", type: "footer-category", url: "/category/self-help", order: 4 },
  { id: "fc5", label: "کودکان و نوجوانان", type: "footer-category", url: "/category/kids", order: 5 },
  
  // لینک‌های پشتیبانی فوتر
  { id: "fs1", label: "سوالات متداول", type: "footer-support", url: "/faq", order: 1 },
  { id: "fs2", label: "قوانین و مقررات", type: "footer-support", url: "/terms", order: 2 },
  { id: "fs3", label: "حریم خصوصی", type: "footer-support", url: "/privacy", order: 3 },
  { id: "fs4", label: "پیگیری سفارش", type: "footer-support", url: "/track-order", order: 4 },
  
  // لینک‌های اجتماعی
  { id: "soc1", label: "اینستاگرام", type: "social", url: "https://instagram.com/yourshop", order: 1 },
  { id: "soc2", label: "تلگرام", type: "social", url: "https://t.me/yourshop", order: 2 },
  { id: "soc3", label: "واتساپ", type: "social", url: "https://wa.me/989123456789", order: 3 },
]

export function getLinks(): Link[] {
  if (typeof window === "undefined") return defaultLinks
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Link[]
    // اگر چیزی ذخیره نشده، پیش‌فرض رو ذخیره کن
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLinks))
    return defaultLinks
  } catch {
    return defaultLinks
  }
}

export function saveLinks(links: Link[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
  } catch {}
}

export function getLink(id: string): Link | null {
  const links = getLinks()
  return links.find((l) => l.id === id) || null
}

export function addLink(link: Omit<Link, "id">): Link {
  const links = getLinks()
  const newId = String(Date.now())
  const maxOrder = Math.max(...links.map((l) => l.order || 0), 0)
  const newLink: Link = {
    ...link,
    id: newId,
    order: link.order || maxOrder + 1,
  }
  links.push(newLink)
  saveLinks(links)
  return newLink
}

export function updateLink(id: string, updates: Partial<Link>): Link | null {
  const links = getLinks()
  const idx = links.findIndex((l) => l.id === id)
  if (idx === -1) return null
  links[idx] = { ...links[idx], ...updates }
  saveLinks(links)
  return links[idx]
}

export function deleteLink(id: string): boolean {
  const links = getLinks()
  const filtered = links.filter((l) => l.id !== id)
  if (filtered.length === links.length) return false
  saveLinks(filtered)
  return true
}

export function getLinksByType(type: LinkType): Link[] {
  const links = getLinks()
  return links.filter((l) => l.type === type).sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function getCategoryLinks(): Link[] {
  return getLinksByType("category").sort((a, b) => (a.order || 0) - (b.order || 0))
}

// اطمینان از اینکه همه لینک‌های پیش‌فرض وجود دارند
export function ensureDefaultLinks(): void {
  if (typeof window === "undefined") return
  const currentLinks = getLinks()
  const currentIds = new Set(currentLinks.map((l) => l.id))
  
  // اضافه کردن لینک‌های پیش‌فرض که هنوز اضافه نشده‌اند
  let hasNewLinks = false
  for (const defaultLink of defaultLinks) {
    if (!currentIds.has(defaultLink.id)) {
      currentLinks.push(defaultLink)
      hasNewLinks = true
    }
  }
  
  if (hasNewLinks) {
    saveLinks(currentLinks)
  }
}

