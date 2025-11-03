"use client"

import { Button } from "@/components/ui/button"

const links = [
  { id: "l1", label: "اینستاگرام", url: "https://instagram.com/yourshop" },
  { id: "l2", label: "تلگرام", url: "https://t.me/yourshop" },
]

export default function AdminLinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">مدیریت لینک‌ها</h1>
        <Button size="sm">لینک جدید</Button>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right px-4 py-3">عنوان</th>
                <th className="text-right px-4 py-3">آدرس</th>
                <th className="text-right px-4 py-3">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{l.label}</td>
                  <td className="px-4 py-3 text-primary underline break-all">{l.url}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">ویرایش</Button>
                      <Button size="sm" variant="destructive">حذف</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
