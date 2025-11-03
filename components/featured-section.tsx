import Image from "next/image"

export function FeaturedSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* تصویر */}
        <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
          <Image src="/featured-books-collection.jpg" alt="مجموعه کتاب‌های برتر" fill className="object-cover" />
        </div>

        {/* متن */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">داستان‌های انتخابی برای شما</h2>
          <p className="text-muted-foreground leading-relaxed">
            بهترین نویسندگان ایران و جهان در یک جا. کتاب‌های برگزیده‌شده با دقت برای علاقه‌مندان به ادبیات و فرهنگ.
          </p>
          <div className="pt-4">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              مشاهده مجموعه
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
