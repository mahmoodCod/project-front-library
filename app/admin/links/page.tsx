"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLinks, deleteLink, ensureDefaultLinks, type Link as LinkType, type LinkType as LinkTypeEnum } from "@/lib/links-store"

const ITEMS_PER_PAGE = 10

const typeLabels: Record<LinkTypeEnum, string> = {
  category: "دسته‌بندی (منوی زیر هدر)",
  "footer-category": "دسته‌بندی فوتر",
  "footer-support": "پشتیبانی فوتر",
  social: "شبکه‌های اجتماعی",
  other: "سایر",
}

export default function AdminLinksPage() {
  const router = useRouter()
  const [links, setLinks] = useState<LinkType[]>([])
  const [selectedType, setSelectedType] = useState<LinkTypeEnum | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // اطمینان از اینکه همه لینک‌های پیش‌فرض وجود دارند
    ensureDefaultLinks()
    setLinks(getLinks())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این لینک را حذف کنید؟")) {
      if (deleteLink(id)) {
        const updatedLinks = getLinks()
        setLinks(updatedLinks)
        // اگر آخرین صفحه خالی شد، به صفحه قبل برو
        const filtered = selectedType === "all" 
          ? updatedLinks.sort((a, b) => (a.order || 0) - (b.order || 0))
          : updatedLinks.filter((l) => l.type === selectedType).sort((a, b) => (a.order || 0) - (b.order || 0))
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages)
        }
        alert("لینک با موفقیت حذف شد")
      }
    }
  }

  const filteredLinks = selectedType === "all" 
    ? links.sort((a, b) => (a.order || 0) - (b.order || 0))
    : links.filter((l) => l.type === selectedType).sort((a, b) => (a.order || 0) - (b.order || 0))

  // محاسبه pagination
  const totalPages = Math.ceil(filteredLinks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedLinks = filteredLinks.slice(startIndex, endIndex)

  // وقتی فیلتر تغییر می‌کند، به صفحه اول برو
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedType])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl md:text-2xl font-bold">مدیریت لینک‌ها</h1>
        <Button asChild className="text-xs md:text-sm">
          <Link href="/admin/links/new">+ لینک جدید</Link>
        </Button>
      </div>

      {/* فیلتر بر اساس نوع */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <span className="text-xs md:text-sm font-medium text-muted-foreground">فیلتر بر اساس نوع:</span>
          <select
            value={selectedType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value as LinkTypeEnum | "all")}
            className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-xs md:text-sm flex-1 min-w-0"
          >
            <option value="all">همه</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredLinks.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">
            {selectedType === "all" ? "هنوز لینکی اضافه نشده است" : `هیچ لینکی از نوع "${typeLabels[selectedType as LinkTypeEnum]}" وجود ندارد`}
          </p>
          <Button asChild>
            <Link href="/admin/links/new">+ لینک جدید</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* نمایش موبایل - کارت‌بندی */}
          <div className="md:hidden space-y-3">
            {paginatedLinks.map((l) => (
              <div key={l.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm flex-1">{l.label}</h3>
                    <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-primary/10 text-primary whitespace-nowrap">
                      {typeLabels[l.type]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start justify-between text-xs gap-2">
                      <span className="text-muted-foreground">آدرس:</span>
                      <span className="text-xs break-all text-left flex-1 min-w-0">
                        {l.type === "category" ? (
                          <span className="text-muted-foreground font-mono">{l.categoryKey}</span>
                        ) : (
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary/80 break-all"
                          >
                            {l.url}
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="text-xs flex-1 min-w-0" asChild>
                    <Link href={`/admin/links/${l.id}/edit`}>ویرایش</Link>
                  </Button>
                  <Button size="sm" variant="destructive" className="text-xs flex-1 min-w-0" onClick={() => handleDelete(l.id)}>
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* نمایش دسکتاپ - جدول */}
          <div className="hidden md:block bg-card border border-border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-right px-4 py-3 font-semibold">عنوان</th>
                    <th className="text-right px-4 py-3 font-semibold">نوع</th>
                    <th className="text-right px-4 py-3 font-semibold">آدرس / کلید</th>
                    <th className="text-right px-4 py-3 font-semibold">اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLinks.map((l) => (
                    <tr key={l.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{l.label}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                          {typeLabels[l.type]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {l.type === "category" ? (
                          <span className="text-muted-foreground font-mono text-xs">{l.categoryKey}</span>
                        ) : (
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary/80 break-all text-xs"
                          >
                            {l.url}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/links/${l.id}/edit`}>ویرایش</Link>
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(l.id)}>
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="text-xs md:text-sm"
              >
                <ChevronRight className="w-4 h-4" />
                قبلی
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="text-xs md:text-sm min-w-[2rem]"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="text-xs md:text-sm"
              >
                بعدی
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* نمایش اطلاعات صفحه */}
          {totalPages > 1 && (
            <div className="text-center text-sm text-muted-foreground">
              نمایش {startIndex + 1} تا {Math.min(endIndex, filteredLinks.length)} از {filteredLinks.length} لینک
            </div>
          )}
        </>
      )}
    </div>
  )
}
