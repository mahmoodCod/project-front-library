import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

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
    <html lang="فا" dir="rtl">
      <body className={`${vazirmatn.className} font-sans antialiased min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
