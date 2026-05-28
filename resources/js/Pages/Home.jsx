import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function Home({ products, categories, auth, cartCount = 0 }) {

    const categoryIcons = {
        'laptop-gaming':  { icon: '🎮', color: 'bg-red-50 text-red-600 border-red-100' },
        'laptop-office':  { icon: '💼', color: 'bg-blue-50 text-blue-600 border-blue-100' },
        'laptop-desain':  { icon: '🎨', color: 'bg-purple-50 text-purple-600 border-purple-100' },
        'laptop-pelajar': { icon: '📚', color: 'bg-green-50 text-green-600 border-green-100' },
    };

    return (
        <>
            <Head title="LaptopStore — Laptop Terbaik untuk Semua Kebutuhan" />
            <Navbar auth={auth} cartCount={cartCount} />

            {/* Hero */}
            <section className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
                            New Arrivals 2024
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            Laptop Terbaik<br />
                            <span className="text-blue-600">untuk Semua</span><br />
                            Kebutuhan
                        </h1>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Temukan laptop gaming, office, desain, hingga pelajar dengan spesifikasi lengkap dan harga terbaik.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link
                                href="/shop"
                                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-sm"
                            >
                                Belanja Sekarang
                            </Link>
                            <Link
                                href="/shop?category=laptop-gaming"
                                className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition border border-gray-200"
                            >
                                Lihat Gaming
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 justify-center md:justify-start">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">12+</p>
                                <p className="text-sm text-gray-400">Produk</p>
                            </div>
                            <div className="border-l border-gray-200 pl-8">
                                <p className="text-2xl font-bold text-gray-900">4</p>
                                <p className="text-sm text-gray-400">Kategori</p>
                            </div>
                            <div className="border-l border-gray-200 pl-8">
                                <p className="text-2xl font-bold text-gray-900">100%</p>
                                <p className="text-sm text-gray-400">Original</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            <div className="w-80 h-80 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-9xl">💻</span>
                            </div>
                            {/* Floating badges */}
                            <div className="absolute top-8 -left-8 bg-white rounded-2xl shadow-lg px-4 py-3">
                                <p className="text-xs text-gray-400">Best Seller</p>
                                <p className="text-sm font-bold text-gray-800">ASUS ROG Strix</p>
                            </div>
                            <div className="absolute bottom-8 -right-8 bg-white rounded-2xl shadow-lg px-4 py-3">
                                <p className="text-xs text-gray-400">Garansi Resmi</p>
                                <p className="text-sm font-bold text-gray-800">2 Tahun ✅</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kategori */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Kategori</h2>
                    <p className="text-gray-400 text-sm">Temukan laptop sesuai kebutuhanmu</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => {
                        const style = categoryIcons[category.slug] || { icon: '💻', color: 'bg-gray-50 text-gray-600 border-gray-100' };
                        return (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.slug}`}
                                className={`border rounded-2xl p-6 text-center hover:shadow-md transition ${style.color}`}
                            >
                                <div className="text-4xl mb-3">{style.icon}</div>
                                <p className="font-semibold text-sm">{category.name}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Produk Terbaru */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Produk Terbaru</h2>
                            <p className="text-gray-400 text-sm">Laptop pilihan terbaik minggu ini</p>
                        </div>
                        <Link
                            href="/shop"
                            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition"
                        >
                            Lihat Semua →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/shop/${product.slug}`}
                                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition group border border-gray-100"
                            >
                                <div className="bg-gray-50 h-48 flex items-center justify-center p-4 group-hover:bg-gray-100 transition">
                                    {product.image ? (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="h-full w-full object-contain group-hover:scale-105 transition duration-300"
                                        />
                                    ) : (
                                        <span className="text-5xl">💻</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-blue-600 font-medium mb-1">
                                        {product.category.name}
                                    </p>
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 leading-snug">
                                        {product.name}
                                    </h3>
                                    {product.processor && (
                                        <p className="text-xs text-gray-400 mb-2 truncate">
                                            {product.processor}
                                        </p>
                                    )}
                                    <p className="text-blue-600 font-bold text-sm">
                                        Rp {Number(product.price).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Kenapa Beli di LaptopStore?</h2>
                    <p className="text-gray-400 text-sm">Kami berkomitmen memberikan yang terbaik</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: '✅', title: 'Produk Original', desc: 'Semua produk 100% resmi bergaransi' },
                        { icon: '🚚', title: 'Gratis Ongkir', desc: 'Gratis ongkos kirim ke seluruh Indonesia' },
                        { icon: '🔒', title: 'Pembayaran Aman', desc: 'Didukung Midtrans & enkripsi SSL' },
                        { icon: '🛠️', title: 'After Sales', desc: 'Support purna jual & garansi resmi' },
                    ].map((item, i) => (
                        <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 py-16">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Siap Menemukan Laptop Impianmu?
                    </h2>
                    <p className="text-blue-100 mb-8 text-sm">
                        Lebih dari 12 pilihan laptop premium tersedia untuk kamu
                    </p>
                    <Link
                        href="/shop"
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition"
                    >
                        Mulai Belanja →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold mb-4">LaptopStore</h3>
                            <p className="text-sm leading-relaxed">Toko laptop terpercaya dengan produk original dan garansi resmi.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm">Kategori</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/shop?category=laptop-gaming" className="hover:text-white transition">Laptop Gaming</Link>
                                <Link href="/shop?category=laptop-office" className="hover:text-white transition">Laptop Office</Link>
                                <Link href="/shop?category=laptop-desain" className="hover:text-white transition">Laptop Desain</Link>
                                <Link href="/shop?category=laptop-pelajar" className="hover:text-white transition">Laptop Pelajar</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm">Akun</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/profile" className="hover:text-white transition">Profile</Link>
                                <Link href="/orders" className="hover:text-white transition">Pesanan Saya</Link>
                                <Link href="/wishlist" className="hover:text-white transition">Wishlist</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm">Bantuan</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/about" className="hover:text-white transition">Tentang Kami</Link>
                                <a href="mailto:support@laptopstore.id" className="hover:text-white transition">Hubungi Kami</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 text-center text-xs">
                        © 2026 LaptopStore. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}