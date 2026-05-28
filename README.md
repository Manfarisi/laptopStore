# 💻 LaptopStore — Toko Laptop Online
Aplikasi e-commerce toko laptop berbasis web yang dibangun dengan stack Laravel + Inertia.js + React + Filament PHP.
<img width="1366" height="768" alt="Screenshot (1007)" src="https://github.com/user-attachments/assets/16e891e6-07fb-403b-aea7-b931e0694de7" />
<img width="1366" height="768" alt="Screenshot (1006)" src="https://github.com/user-attachments/assets/2d81df7b-458d-45ba-82f0-c788ca7f3663" />
<img width="1366" height="768" alt="Screenshot (1005)" src="https://github.com/user-attachments/assets/291f2a3b-49bc-497a-9a87-c273862c1619" />
<img width="1366" height="768" alt="Screenshot (1004)" src="https://github.com/user-attachments/assets/ddd6e545-717d-4a10-b681-a1d7c5f8c137" />
<img width="1366" height="768" alt="Screenshot (1003)" src="https://github.com/user-attachments/assets/c2bf9993-ed30-497e-be05-d43f1daab7e4" />
<img width="1366" height="768" alt="Screenshot (1002)" src="https://github.com/user-attachments/assets/b352150a-2117-4ef2-b630-79538ca69c7c" />
<img width="1366" height="768" alt="Screenshot (1001)" src="https://github.com/user-attachments/assets/26f0c838-9865-49bc-b5dd-8675b1f7f5d0" />
<img width="1366" height="768" alt="Screenshot (1000)" src="https://github.com/user-attachments/assets/0d47543c-f9d3-433c-b89a-ed929b50760d" />




---

## 🖼️ Tampilan Aplikasi

| Halaman | Deskripsi |
|---|---|
| 🏠 Home | Hero section, kategori, produk terbaru, fitur toko |
| 🛍️ Shop | List produk dengan filter kategori, harga, dan sort |
| 💻 Detail Produk | Foto thumbnail, spesifikasi lengkap, review |
| 🛒 Cart | Keranjang belanja Tokopedia-style dengan checkbox |
| 📋 Checkout | Form pengiriman + ringkasan pesanan |
| 💳 Payment | Integrasi Midtrans (GoPay, QRIS, Transfer Bank, Kartu Kredit) |
| 📦 Riwayat Pesanan | Status tracker dengan progress bar |
| ⭐ Rating & Ulasan | Review produk setelah pembelian |
| 👤 Profile | Edit data diri, alamat, dan ganti password |
| 🔧 Admin Panel | Dashboard Filament dengan statistik & grafik penjualan |

---

## ✨ Fitur Utama

### 👤 Customer
- Register & Login
- Browse produk dengan filter kategori & harga
- Pencarian produk real-time
- Tambah ke keranjang belanja
- Checkout dengan form pengiriman
- Pembayaran via Midtrans (GoPay, QRIS, Transfer Bank, Kartu Kredit)
- Riwayat pesanan dengan status tracker
- Rating & ulasan produk (hanya setelah beli)
- Wishlist produk favorit
- Edit profile & alamat default

### 🔧 Admin
- Dashboard dengan statistik real-time (revenue, total order, customer, produk)
- Grafik penjualan 7 hari terakhir
- Tabel order terbaru
- Kelola produk (CRUD + multiple foto + spesifikasi lengkap)
- Kelola kategori
- Update status pesanan
- Notifikasi webhook pembayaran otomatis dari Midtrans

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Kegunaan |
|---|---|
| **Laravel 12** | Framework PHP utama, routing, middleware, ORM |
| **Filament 4** | Admin panel otomatis (CRUD, dashboard, widget) |
| **MySQL 8** | Database relasional |
| **Midtrans** | Payment gateway (GoPay, QRIS, Bank Transfer, Kartu Kredit) |
| **Laravel Sanctum** | Autentikasi API |

### Frontend
| Teknologi | Kegunaan |
|---|---|
| **React 18** | UI library untuk komponen interaktif |
| **Inertia.js 2** | Jembatan Laravel ↔ React (tanpa REST API terpisah) |
| **Tailwind CSS 3** | Styling utility-first |
| **Vite** | Build tool & dev server |

### Tools & Infrastructure
| Teknologi | Kegunaan |
|---|---|
| **Composer** | Package manager PHP |
| **npm** | Package manager JavaScript |
| **Git** | Version control |
| **phpMyAdmin** | GUI database management |
| **XAMPP** | Local development server |
| **ngrok** | Expose localhost untuk webhook Midtrans |

---

## 🗄️ Struktur Database

```
users           → Data customer & admin
categories      → Kategori laptop (Gaming, Office, Desain, Pelajar)
products        → Data produk + spesifikasi lengkap
product_images  → Multiple foto per produk
carts           → Keranjang belanja
orders          → Data pesanan
order_items     → Detail item dalam pesanan
wishlists       → Produk favorit customer
reviews         → Rating & ulasan produk
```

---

## 📁 Struktur Project

```
toko-online/
├── app/
│   ├── Filament/
│   │   ├── Resources/          → Admin CRUD (Product, Category, Order)
│   │   └── Widgets/            → Dashboard widgets (Stats, Chart, Table)
│   ├── Http/Controllers/       → Controller untuk semua fitur
│   └── Models/                 → Eloquent models dengan relasi
├── database/
│   ├── migrations/             → Struktur tabel database
│   └── seeders/                → Data dummy produk laptop
├── resources/
│   └── js/
│       ├── Components/         → Komponen reusable (Navbar)
│       └── Pages/              → Halaman React
│           ├── Home.jsx
│           ├── Shop/
│           ├── Cart/
│           ├── Checkout/
│           ├── Order/
│           └── Profile/
└── routes/
    └── web.php                 → Semua route aplikasi
```

---

## 🚀 Cara Instalasi

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8+
- XAMPP / Laragon

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/toko-online.git
cd toko-online

# 2. Install PHP dependencies
composer install

# 3. Install JS dependencies
npm install

# 4. Copy environment file
cp .env.example .env

# 5. Generate app key
php artisan key:generate

# 6. Konfigurasi database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toko_online
DB_USERNAME=root
DB_PASSWORD=

# 7. Konfigurasi Midtrans di .env
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
VITE_MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false

# 8. Jalankan migration & seeder
php artisan migrate
php artisan db:seed --class=ProductSeeder

# 9. Buat storage link
php artisan storage:link

# 10. Buat akun admin
php artisan make:filament-user

# 11. Jalankan aplikasi
php artisan serve
npm run dev
```

### Akses Aplikasi
- **Frontend:** `http://localhost:8000`
- **Admin Panel:** `http://localhost:8000/admin`

---

## 💳 Test Pembayaran (Midtrans Sandbox)

```
Kartu Kredit:
Nomor  : 4811 1111 1111 1114
Exp    : 01/25
CVV    : 123
OTP    : 112233
```

---

## 📝 Perjalanan Pengembangan

Project ini dibangun dari nol dengan urutan pengerjaan:

1. **Setup Project** — Install Laravel, Breeze (React + Inertia), Filament
2. **Database Design** — Rancang & buat semua tabel (users, products, categories, carts, orders, dll)
3. **Admin Panel** — Setup Filament dengan CRUD Product, Category, Order
4. **Seeder** — Data dummy 12 laptop di 4 kategori dengan spesifikasi lengkap
5. **Frontend Home & Shop** — Halaman utama dengan filter, search, sort, pagination
6. **Detail Produk** — Thumbnail multiple foto, spesifikasi tab, produk terkait
7. **Cart** — Keranjang belanja dengan checkbox pilih item
8. **Checkout & Order** — Form pengiriman dan halaman konfirmasi
9. **Payment Gateway** — Integrasi Midtrans dengan webhook otomatis
10. **Navbar & Profile** — Navbar baru + halaman edit profile
11. **Dashboard Admin** — Widget statistik, grafik penjualan, tabel order terbaru
12. **Filter Harga** — Range harga dan custom price filter di halaman shop
13. **Produk Terkait** — Rekomendasi produk dari kategori yang sama
14. **Rating & Ulasan** — Review produk dengan sistem bintang
15. **Wishlist** — Simpan produk favorit
16. **UI Redesign** — Tampilan iBox/Apple Store style yang clean & profesional

---

## 👨‍💻 Developer

**Manfrsi**
- Background: Information Systems
- Focus: System Administrator & Full-stack Development
- Stack favorit: Laravel + React + Inertia.js

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran dan portofolio.

© 2026 LaptopStore. All rights reserved.<img width="1366" height="768" alt="Screenshot (1000)" src="https://github.com/user-attachments/assets/1a3e8d24-43d3-4c27-a0f5-f2b13d06d491" />
<img width="1366" height="768" alt="Screenshot (999)" src="https://github.com/user-attachments/assets/9c4c8562-32c2-457d-8479-14e68e050783" />
