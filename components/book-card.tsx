"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

interface BookCardProps {
  id: string
  title: string
  author: string
  price: number
  image: string
  rating: number
  reviews: number
}

export function BookCard({ id, title, author, price, image, rating, reviews }: BookCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  const discount = useMemo(() => {
    const sum = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    return 10 + (sum % 21) // 10..30
  }, [id])

  const handleAddToCart = () => {
    addItem({ id, title, author, price, discountedPrice: Math.floor(price * 0.9), image })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Link href={`/book/${id}`}>
      <div className="relative bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 group cursor-pointer h-full flex flex-col hover:shadow-lg">

        {/* تصویر کتاب */}
        <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
            {discount}% تخفیف
          </div>
        </div>

        {/* اطلاعات کتاب */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{author}</p>

          {/* امتیاز */}
          <div className="flex items-center gap-1 mb-3 text-xs">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.floor(rating) ? "" : "opacity-30"}`}>
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-muted-foreground">({reviews})</span>
          </div>

          {/* قیمت و دکمه */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{Math.floor(price * 0.9).toLocaleString("fa-IR")}</span>
              <span className="text-xs text-muted-foreground line-through">{price.toLocaleString("fa-IR")}</span>
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              variant="default"
              size="sm"
              className="w-full"
            >
              {isAdded ? "✓ اضافه شد" : "🛒 اضافه به سبد"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
