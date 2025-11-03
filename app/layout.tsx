import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"

const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: "کتاب‌خانه - فروشگاه کتاب آنلاین",
  description: "بهترین فروشگاه کتاب آنلاین با انتخاب وسیع کتاب‌های فارسی و خارجی",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
