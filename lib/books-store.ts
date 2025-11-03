// مدیریت کتاب‌ها با localStorage

export type Book = {
  id: string
  title: string
  author: string
  price: number
  discountedPrice: number
  image: string
  rating: number
  reviews: number
  category: string
  description?: string
  publisher?: string
  publishYear?: number
  pages?: number
  language?: string
  isbn?: string
  features?: string[]
  inStock: boolean
  stockCount: number
}

const STORAGE_KEY = "admin-books"

// کتاب‌های پیش‌فرض
const defaultBooks: Book[] = [
  {
    id: "1",
    title: "پدر",
    author: "میخائیل بولگاکوف",
    price: 89000,
    discountedPrice: 71200,
    image: "/book-cover-1.png",
    rating: 4,
    reviews: 234,
    category: "fiction",
    description: "پدر یکی از بهترین آثار ادبی جهان است که داستان رابطه پیچیده بین پدر و فرزند را به تصویر می‌کشد.",
    publisher: "انتشارات افق",
    publishYear: 1384,
    pages: 320,
    language: "فارسی",
    isbn: "978-964-6436-12-5",
    features: ["ترجمه عالی و دقیق", "چاپ لوکس و زیبا", "جلد سخت و دوام‌دار"],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    title: "ما کیستیم",
    author: "علی شریعتی",
    price: 75000,
    discountedPrice: 60000,
    image: "/book-cover-2.jpg",
    rating: 5,
    reviews: 412,
    category: "history",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "3",
    title: "یک یادداشت معمولی",
    author: "دوستایفسکی",
    price: 95000,
    discountedPrice: 76000,
    image: "/book-cover-3.png",
    rating: 4,
    reviews: 178,
    category: "fiction",
    inStock: true,
    stockCount: 3,
  },
  {
    id: "4",
    title: "عادت‌های موفق",
    author: "جیمز کلیئر",
    price: 82000,
    discountedPrice: 65600,
    image: "/book-cover-4.png",
    rating: 5,
    reviews: 567,
    category: "self-help",
    inStock: true,
    stockCount: 12,
  },
  {
    id: "5",
    title: "علم دین",
    author: "امام غزالی",
    price: 68000,
    discountedPrice: 54400,
    image: "/book-cover-5.png",
    rating: 3,
    reviews: 89,
    category: "science",
    inStock: true,
    stockCount: 5,
  },
  {
    id: "6",
    title: "شنل‌های شگفت‌انگیز",
    author: "نویسنده ناشناخته",
    price: 55000,
    discountedPrice: 44000,
    image: "/book-cover-6.png",
    rating: 4,
    reviews: 234,
    category: "kids",
    inStock: true,
    stockCount: 20,
  },
  {
    id: "7",
    title: "تاریخ ایران",
    author: "کاظم پایا",
    price: 120000,
    discountedPrice: 96000,
    image: "/book-cover-7.png",
    rating: 4,
    reviews: 145,
    category: "history",
    inStock: true,
    stockCount: 7,
  },
  {
    id: "8",
    title: "سفر به ماه",
    author: "ژول ورن",
    price: 78000,
    discountedPrice: 62400,
    image: "/book-cover-8.png",
    rating: 5,
    reviews: 356,
    category: "fiction",
    inStock: true,
    stockCount: 10,
  },
]

export function getBooks(): Book[] {
  if (typeof window === "undefined") return defaultBooks
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Book[]
    // اگر چیزی ذخیره نشده، پیش‌فرض رو ذخیره کن
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBooks))
    return defaultBooks
  } catch {
    return defaultBooks
  }
}

export function saveBooks(books: Book[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch {}
}

export function addBook(book: Omit<Book, "id">): Book {
  const books = getBooks()
  const newId = String(Date.now())
  const newBook: Book = { ...book, id: newId }
  books.push(newBook)
  saveBooks(books)
  return newBook
}

export function updateBook(id: string, updates: Partial<Book>): Book | null {
  const books = getBooks()
  const idx = books.findIndex((b) => b.id === id)
  if (idx === -1) return null
  books[idx] = { ...books[idx], ...updates }
  saveBooks(books)
  return books[idx]
}

export function deleteBook(id: string): boolean {
  const books = getBooks()
  const filtered = books.filter((b) => b.id !== id)
  if (filtered.length === books.length) return false
  saveBooks(filtered)
  return true
}

export function getBook(id: string): Book | null {
  const books = getBooks()
  return books.find((b) => b.id === id) || null
}

