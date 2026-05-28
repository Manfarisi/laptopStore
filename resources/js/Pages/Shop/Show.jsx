import Navbar from "@/Components/Navbar";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function ShowProduct({
    product,
    auth,
    cartCount = 0,
    relatedProducts = [],
    canReview = false,
    userReview = null,
    reviewableOrders = [],
}) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("deskripsi");
    const [activeImage, setActiveImage] = useState(0);

    // Review States
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(
        reviewableOrders[0]?.id || "",
    );

    const allImages = [
        ...(product.image ? [product.image] : []),
        ...(product.images?.map((img) => img.image) || []),
    ];

    const handleReview = (e) => {
        e.preventDefault();
        router.post(
            "/reviews",
            {
                product_id: product.id,
                order_id: selectedOrder,
                rating,
                comment,
            },
            {
                onSuccess: () => {
                    setComment("");
                    setRating(5);
                },
            },
        );
    };

    const handleAddToCart = () => {
        if (!auth.user) {
            router.get("/login");
            return;
        }
        router.post(
            "/cart",
            { product_id: product.id, quantity },
            {
                onSuccess: () => alert("Produk berhasil ditambahkan ke keranjang!"),
            },
        );
    };

    const handleBuyNow = () => {
        if (!auth.user) {
            router.get("/login");
            return;
        }
        router.post(
            "/cart",
            { product_id: product.id, quantity },
            {
                onSuccess: () => router.get("/cart"),
            },
        );
    };

    const specs = [
        { icon: "🔲", label: "Processor", value: product.processor },
        { icon: "💾", label: "RAM", value: product.ram },
        { icon: "💿", label: "Storage", value: product.storage },
        { icon: "🖥️", label: "Layar", value: product.display },
        { icon: "🎮", label: "GPU / VGA", value: product.gpu },
        { icon: "💻", label: "Sistem Operasi", value: product.os },
        { icon: "🔋", label: "Baterai", value: product.battery },
        { icon: "⚖️", label: "Berat", value: product.weight },
        { icon: "🎨", label: "Warna", value: product.color },
        { icon: "🛡️", label: "Garansi", value: product.warranty },
        { icon: "📦", label: "Kondisi", value: product.condition },
    ].filter((s) => s.value);

    // Menghitung rata-rata rating
    const averageRating = product.reviews?.length > 0
        ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
        : '0';

    return (
        <>
            <Head title={product.name} />

            {/* Navbar */}
            <Navbar auth={auth} cartCount={cartCount} />

            {/* Main Content Wrapper */}
            <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-400 mb-6 flex gap-2 flex-wrap items-center">
                        <Link href="/" className="hover:text-indigo-600">Home</Link>
                        <span>›</span>
                        <Link href="/shop" className="hover:text-indigo-600">Shop</Link>
                        <span>›</span>
                        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-indigo-600">
                            {product.category.name}
                        </Link>
                        <span>›</span>
                        <span className="text-gray-600 truncate max-w-xs">{product.name}</span>
                    </div>

                    {/* Main Card: Image & Detail Info */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-8 flex flex-col lg:flex-row gap-10 mb-8">
                        
                        {/* Kiri: Bagian Gambar */}
                        <div className="lg:w-1/2 flex flex-col gap-4">
                            {/* Gambar Utama */}
                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl flex items-center justify-center h-[450px] overflow-hidden group">
                                {allImages.length > 0 ? (
                                    <img
                                        src={`/storage/${allImages[activeImage]}`}
                                        alt={product.name}
                                        className="h-full w-full object-contain p-6 group-hover:scale-105 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="text-center text-gray-300">
                                        <div className="text-6xl mb-3">💻</div>
                                        <p className="text-sm">Foto segera hadir</p>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                    {allImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${
                                                activeImage === i
                                                    ? "ring-2 ring-indigo-500 border-transparent shadow-md"
                                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${img}`}
                                                alt={`Foto ${i + 1}`}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Kanan: Info & Transaksi */}
                        <div className="lg:w-1/2 flex flex-col gap-6">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                                    SKU: {product.slug}
                                </p>
                            </div>

                            {/* Harga */}
                            <div className="border-t border-b border-gray-100 py-4 bg-slate-50/50 px-4 rounded-2xl">
                                <p className="text-xs text-gray-400 mb-1">Harga Special</p>
                                <p className="text-4xl font-black text-indigo-600 tracking-tight">
                                    Rp {Number(product.price).toLocaleString("id-ID")}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Harga sudah termasuk PPN</p>
                            </div>

                            {/* Spek Singkat Quick View */}
                            {(product.processor || product.ram || product.storage || product.display) && (
                                <div className="grid grid-cols-2 gap-3">
                                    {product.processor && (
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start gap-2.5">
                                            <span className="text-lg">🔲</span>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Processor</p>
                                                <p className="text-xs font-semibold text-gray-700 line-clamp-1">{product.processor}</p>
                                            </div>
                                        </div>
                                    )}
                                    {product.ram && (
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start gap-2.5">
                                            <span className="text-lg">💾</span>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">RAM</p>
                                                <p className="text-xs font-semibold text-gray-700">{product.ram}</p>
                                            </div>
                                        </div>
                                    )}
                                    {product.storage && (
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start gap-2.5">
                                            <span className="text-lg">💿</span>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Storage</p>
                                                <p className="text-xs font-semibold text-gray-700">{product.storage}</p>
                                            </div>
                                        </div>
                                    )}
                                    {product.display && (
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start gap-2.5">
                                            <span className="text-lg">🖥️</span>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Layar</p>
                                                <p className="text-xs font-semibold text-gray-700 line-clamp-1">{product.display}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Stok Status */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500 font-medium">Ketersediaan:</span>
                                {product.stock > 0 ? (
                                    <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-xs border border-green-100">
                                        ✅ Stok Tersedia ({product.stock} unit)
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-xs border border-red-100">
                                        ❌ Stok Habis
                                    </span>
                                )}
                            </div>

                            {/* Kuantitas */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 font-medium">Jumlah:</span>
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-lg transition"
                                    >
                                        −
                                    </button>
                                    <span className="px-6 py-2 text-gray-800 font-bold text-base border-x border-gray-200 min-w-[50px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-lg transition"
                                        disabled={product.stock === 0}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Subtotal Card */}
                            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl px-5 py-4 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-indigo-500 font-medium mb-0.5">Total Harga</p>
                                    <p className="text-2xl font-black text-indigo-700">
                                        Rp {(Number(product.price) * quantity).toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <span className="bg-indigo-200/50 text-indigo-700 font-bold text-xs px-3 py-1 rounded-lg">
                                    {quantity} Unit
                                </span>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3.5 rounded-xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    🛒 Keranjang
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    ⚡ Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Section: Deskripsi & Spesifikasi Lengkap */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-8 mb-8">
                        {/* Tab Headers */}
                        <div className="flex gap-6 border-b border-gray-100 mb-6">
                            {["deskripsi", "spesifikasi"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 font-bold text-sm border-b-2 transition-all duration-300 ${
                                        activeTab === tab
                                            ? "border-indigo-600 text-indigo-600"
                                            : "border-transparent text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    {tab === "deskripsi" ? "📄 Deskripsi Produk" : "⚙️ Spesifikasi Lengkap"}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content: Deskripsi */}
                        {activeTab === "deskripsi" && (
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                    {product.description || "Tidak ada deskripsi untuk produk ini."}
                                </p>
                            </div>
                        )}

                        {/* Tab Content: Spesifikasi */}
                        {activeTab === "spesifikasi" && (
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                                    Spesifikasi Teknis Laptop
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {specs.map((spec, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 py-3 px-4 rounded-xl bg-gray-50/60 border border-gray-100/50 hover:bg-gray-50 transition"
                                        >
                                            <span className="text-xl w-8 text-center">{spec.icon}</span>
                                            <span className="text-sm text-gray-400 w-28 font-medium">{spec.label}</span>
                                            <span className="text-sm font-semibold text-gray-800 flex-1">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Produk Terkait */}
                    {relatedProducts.length > 0 && (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-8 mb-8">
                            <h2 className="text-lg font-extrabold text-gray-800 mb-6">💻 Produk Terkait</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {relatedProducts.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/shop/${related.slug}`}
                                        className="bg-gray-50/50 rounded-2xl overflow-hidden hover:shadow-md hover:bg-white transition-all duration-300 border border-gray-100 flex flex-col h-full"
                                    >
                                        <div className="h-40 bg-white flex items-center justify-center p-4">
                                            {related.image ? (
                                                <img
                                                    src={`/storage/${related.image}`}
                                                    alt={related.name}
                                                    className="h-full w-full object-contain hover:scale-105 transition duration-300"
                                                />
                                            ) : (
                                                <span className="text-4xl">💻</span>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                                            <div>
                                                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider mb-1">
                                                    {related.category.name}
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                                                    {related.name}
                                                </p>
                                            </div>
                                            <p className="text-indigo-600 font-black text-sm mt-1">
                                                Rp {Number(related.price).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rating & Ulasan */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                            <h2 className="text-lg font-extrabold text-gray-800">⭐ Rating & Ulasan</h2>
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <div className="flex text-amber-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className={`text-lg ${
                                            star <= Math.round(Number(averageRating)) ? 'text-amber-400' : 'text-gray-200'
                                        }`}>★</span>
                                    ))}
                                </div>
                                <span className="text-sm font-black text-gray-700">{averageRating}</span>
                                <span className="text-xs text-gray-400">({product.reviews?.length || 0} ulasan)</span>
                            </div>
                        </div>

                        {/* Form Tulis Ulasan */}
                        {canReview && (
                            <div className="bg-indigo-50/50 rounded-2xl p-6 mb-8 border border-indigo-100/70">
                                <h3 className="text-sm font-bold text-gray-800 mb-4">✍️ Tulis Ulasanmu</h3>
                                <form onSubmit={handleReview} className="flex flex-col gap-4">
                                    {reviewableOrders.length > 1 && (
                                        <div>
                                            <label className="text-xs font-bold text-gray-600 mb-1.5 block">Pilih Pesanan</label>
                                            <select
                                                value={selectedOrder}
                                                onChange={(e) => setSelectedOrder(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                {reviewableOrders.map((order) => (
                                                    <option key={order.id} value={order.id}>
                                                        {order.order_number}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-xs font-bold text-gray-600 mb-1 block">Rating</label>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onMouseEnter={() => setHoveredStar(star)}
                                                        onMouseLeave={() => setHoveredStar(0)}
                                                        onClick={() => setRating(star)}
                                                        className={`text-3xl transition-transform active:scale-110 ${
                                                            star <= (hoveredStar || rating) ? 'text-amber-400' : 'text-gray-200'
                                                        }`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 border border-gray-100 rounded-md shadow-sm">
                                                {['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sangat Bagus'][rating]}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-600 mb-1.5 block">Ulasan (opsional)</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={3}
                                            placeholder="Bagikan pengalamanmu menggunakan produk ini..."
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="self-start bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 hover:shadow-md transition"
                                    >
                                        Kirim Ulasan
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Ulasan User Sendiri */}
                        {userReview && (
                            <div className="bg-emerald-50/50 rounded-2xl p-5 mb-6 border border-emerald-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                            {auth.user?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-800 block">{auth.user?.name}</span>
                                            <span className="text-[10px] text-emerald-600 font-medium tracking-wide uppercase">Ulasan Anda</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex text-amber-400">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className={`text-xs ${star <= userReview.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => router.delete(`/reviews/${userReview.id}`)}
                                            className="text-xs font-semibold text-red-500 hover:text-red-700 transition bg-white border border-red-100 px-2.5 py-1 rounded-md shadow-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                {userReview.comment && (
                                    <p className="text-sm text-gray-600 pl-10 leading-relaxed">{userReview.comment}</p>
                                )}
                            </div>
                        )}

                        {/* List Ulasan Penguji Lain */}
                        {product.reviews?.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {product.reviews
                                    .filter(r => !auth.user || r.user_id !== auth.user.id)
                                    .map((review) => (
                                        <div key={review.id} className="border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3 mb-2.5">
                                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-black">
                                                    {review.user?.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{review.user?.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex text-amber-400">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span key={star} className={`text-[11px] ${star <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] text-gray-400">
                                                            {new Date(review.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric', month: 'long', year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-gray-600 ml-12 leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
                                <div className="text-4xl mb-2">💬</div>
                                <p className="text-sm font-medium">Belum ada ulasan untuk produk ini</p>
                                {!auth.user && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link> untuk memberikan penilaian.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-500 text-center py-8 border-t border-gray-800">
                <p className="text-xs font-medium tracking-wide">
                    &copy; 2026 LaptopStore. All rights reserved.
                </p>
            </footer>
        </>
    );
}