# 📚 Makteb Sharif - Online Library Management System

A modern, full-featured online library and bookstore platform built with Next.js 16, React 19, and TypeScript. This application provides a complete e-commerce solution for managing books, orders, customers, and links with a comprehensive admin panel.

## ✨ Features

### Customer-Facing Features

- **📖 Book Catalog**: Browse books by category (Fiction, History, Science, Self-Help, Kids)
- **🔍 Search Functionality**: Search books by title or author with instant results
- **🛒 Shopping Cart**: Add books to cart with quantity management
- **👤 User Authentication**: Registration and login system with profile management
- **📱 Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop
- **🌐 RTL Support**: Right-to-left layout support for Persian/Arabic content
- **🖼️ Image Lightbox**: Click-to-zoom functionality for book images
- **⭐ Book Details**: Comprehensive book information including features, reviews, and ratings

### Admin Panel Features

- **📊 Dashboard**: Overview with KPIs, revenue charts, and recent orders
- **📚 Book Management**: Full CRUD operations for books (Create, Read, Update, Delete)
- **📦 Order Management**: View, manage, and cancel orders with Excel export
- **👥 Customer Management**: View customer details, order history, and sync from orders
- **🔗 Link Management**: Manage header categories, footer links, and social media links
- **⚙️ Settings**: Comprehensive settings for library info, contact, financial, display, and SEO
- **📱 Mobile-Friendly Admin**: Fully responsive admin panel with mobile menu

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.0](https://nextjs.org/)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: React Context API
- **Storage**: localStorage (client-side data persistence)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-front-library
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: Turbopack is disabled by default in the dev script for Windows compatibility. If you encounter lock issues, use the `fix-lock.ps1` script (Windows PowerShell).

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 📁 Project Structure

```
project-front-library/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   │   ├── books/         # Book management
│   │   ├── orders/       # Order management
│   │   ├── customers/     # Customer management
│   │   ├── links/         # Link management
│   │   ├── settings/      # Application settings
│   │   └── page.tsx       # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── book/[id]/         # Book detail pages
│   ├── cart/              # Shopping cart page
│   ├── profile/           # User profile page
│   ├── search/            # Search results page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   ├── book-card.tsx     # Book card component
│   ├── category-menu.tsx # Category navigation
│   ├── cart-provider.tsx # Cart context provider
│   └── auth-provider.tsx # Auth context provider
├── lib/                  # Utility functions and stores
│   ├── books-store.ts    # Book data management
│   ├── orders-store.ts   # Order data management
│   ├── customers-store.ts# Customer data management
│   ├── links-store.ts    # Link data management
│   ├── users-store.ts    # User data management
│   └── settings-store.ts # Settings management
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🔐 Authentication

### Admin Login

- **Username**: `admin`
- **Password**: `admin1234`

### User Registration

Users must register before logging in. Registration is available at `/auth`.

## 📦 Data Storage

All data is stored in browser `localStorage`:
- Books: `admin-books`
- Orders: `admin-orders`
- Customers: `admin-customers`
- Links: `admin-links`
- Users: `app-users`
- Settings: `app-settings`
- Cart: `cart-items`
- Auth: `is-admin`, `current-user-id`

**Note**: This is a client-side only solution. For production, consider implementing a backend API with a database.

## 🎨 Features in Detail

### Book Management

- Add, edit, and delete books
- Manage book details (title, author, price, stock, images, etc.)
- Category-based organization
- Stock management
- Image upload support

### Order Management

- View all orders with status tracking
- Cancel pending orders
- Export orders to Excel (CSV format)
- Order details with customer information
- Order status: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled

### Customer Management

- View customer list with statistics
- Customer details and order history
- Sync customers from existing orders
- Customer statistics (total orders, total spent)

### Link Management

- Manage header category links
- Manage footer category links
- Manage footer support links
- Manage social media links
- Dynamic link ordering

### Settings

- **Library Info**: Site name, logo, description
- **Contact**: Email, phone, address
- **Financial**: Currency, free shipping threshold, tax rate
- **Display**: Items per page, comments, wishlist
- **SEO**: Meta title, description, keywords

## 🐛 Troubleshooting

### Next.js Lock Issue

If you encounter a lock error, run the PowerShell script:

```powershell
.\fix-lock.ps1
```

Or manually:
```powershell
# Stop Node.js processes
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force

# Remove lock files
Remove-Item -Path ".\.next\dev\lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\.next\dev" -Recurse -Force -ErrorAction SilentlyContinue
```

### Dependency Issues

If you encounter peer dependency conflicts:

```bash
npm install --legacy-peer-deps
```

### TypeScript Errors

If you see TypeScript errors:
1. Restart the TypeScript server in your IDE
2. Reload the IDE window

## 📝 Scripts

- `npm run dev` - Start development server (Turbopack disabled)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. Contributions are not accepted at this time.

## 📞 Support

For support, please contact the project maintainer.

---

**Built with ❤️ using Next.js and React**
