import Navbar from "@/Components/Navbar";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function CartIndex({ carts = [], total = 0, auth, cartCount = 0 }) {
    const [checked, setChecked] = useState(carts.map((c) => c.id));

    const toggleCheck = (id) => {
        setChecked((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleAll = () => {
        setChecked(
            checked.length === carts.length ? [] : carts.map((c) => c.id),
        );
    };

    const selectedCarts = carts.filter((c) => checked.includes(c.id));
    const selectedTotal = selectedCarts.reduce(
        (sum, c) => sum + Number(c.product.price) * c.quantity,
        0,
    );
    const selectedCount = selectedCarts.reduce((sum, c) => sum + c.quantity, 0);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        router.put(`/cart/${id}`, { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        if (confirm("Hapus produk ini dari keranjang?")) {
            router.delete(`/cart/${id}`, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Keranjang Belanja - LaptopStore" />

            {/* Navbar Tokopedia Style */}
            <Navbar auth={auth} cartCount={cartCount} />

            <div className="bg-gray-100 min-h-screen py-4">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-lg font-bold text-gray-800 mb-4">
                        Keranjang Belanja
                    </h1>

                    {carts.length === 0 ? (
                        <div className="bg-white rounded-xl p-16 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Keranjang Belanja kamu kosong
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Yuk, temukan produk yang kamu mau!
                            </p>
                            <Link
                                href="/shop"
                                className="bg-indigo-500 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-indigo-600 transition"
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-4 items-start">
                            {/* Kiri — List Produk */}
                            <div className="flex-1 flex flex-col gap-3">
                                {/* Select All */}
                                <div className="bg-white rounded-xl px-5 py-3 flex items-center gap-3 border border-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={
                                            checked.length === carts.length
                                        }
                                        onChange={toggleAll}
                                        className="w-4 h-4 accent-indigo-500 cursor-pointer"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">
                                        Pilih Semua ({carts.length})
                                    </span>
                                    {checked.length > 0 && (
                                        <button
                                            onClick={() =>
                                                checked.forEach((id) =>
                                                    removeItem(id),
                                                )
                                            }
                                            className="ml-auto text-xs text-red-400 hover:text-red-600 transition"
                                        >
                                            Hapus ({checked.length})
                                        </button>
                                    )}
                                </div>

                                {/* Toko Group */}
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    {/* Store Header */}
                                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                                        <span className="text-indigo-600">
                                            🏪
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            LaptopStore Official
                                        </span>
                                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-medium ml-1">
                                            ⭐ Star Seller
                                        </span>
                                    </div>

                                    {/* Items */}
                                    <div className="divide-y divide-gray-50">
                                        {carts.map((cart) => (
                                            <div
                                                key={cart.id}
                                                className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50/50 transition"
                                            >
                                                {/* Checkbox */}
                                                <input
                                                    type="checkbox"
                                                    checked={checked.includes(
                                                        cart.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleCheck(cart.id)
                                                    }
                                                    className="w-4 h-4 accent-indigo-500 cursor-pointer mt-5"
                                                />

                                                {/* Gambar */}
                                                <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {cart.product.image ? (
                                                        <img
                                                            src={`/storage/${cart.product.image}`}
                                                            alt={
                                                                cart.product
                                                                    .name
                                                            }
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    ) : (
                                                        <span className="text-3xl">
                                                            💻
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-800 font-medium leading-snug mb-1 line-clamp-2">
                                                        {cart.product.name}
                                                    </p>
                                                    {cart.product.processor && (
                                                        <p className="text-xs text-gray-400 mb-2">
                                                            {
                                                                cart.product
                                                                    .processor
                                                            }{" "}
                                                            • {cart.product.ram}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                                                                cart.product
                                                                    .condition ===
                                                                "Baru"
                                                                    ? "bg-indigo-50 text-indigo-700"
                                                                    : "bg-orange-50 text-orange-700"
                                                            }`}
                                                        >
                                                            {
                                                                cart.product
                                                                    .condition
                                                            }
                                                        </span>
                                                        {cart.product
                                                            .warranty && (
                                                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                                                                🛡️{" "}
                                                                {
                                                                    cart.product
                                                                        .warranty
                                                                }
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Harga + Qty */}
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-base font-bold text-gray-900">
                                                            Rp{" "}
                                                            {Number(
                                                                cart.product
                                                                    .price,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </p>

                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    removeItem(
                                                                        cart.id,
                                                                    )
                                                                }
                                                                className="text-xs text-gray-400 hover:text-red-500 transition"
                                                            >
                                                                🗑️
                                                            </button>

                                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity(
                                                                            cart.id,
                                                                            cart.quantity -
                                                                                1,
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center text-indigo-600 hover:bg-gray-100 transition font-bold"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="w-10 text-center text-sm font-semibold text-gray-800 border-x border-gray-200">
                                                                    {
                                                                        cart.quantity
                                                                    }
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity(
                                                                            cart.id,
                                                                            cart.quantity +
                                                                                1,
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center text-indigo-600 hover:bg-gray-100 transition font-bold"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Subtotal */}
                                                    <p className="text-xs text-gray-400 mt-1 text-right">
                                                        Subtotal:{" "}
                                                        <span className="text-indigo-600 font-semibold">
                                                            Rp{" "}
                                                            {(
                                                                Number(
                                                                    cart.product
                                                                        .price,
                                                                ) *
                                                                cart.quantity
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Lanjut Belanja */}
                                <Link
                                    href="/shop"
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                                >
                                    ← Lanjut Belanja
                                </Link>
                            </div>

                            {/* Kanan — Ringkasan Belanja (Sticky) */}
                            <div className="w-80 flex-shrink-0 sticky top-20">
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <h2 className="font-bold text-gray-800 text-sm">
                                            Ringkasan Belanja
                                        </h2>
                                    </div>

                                    <div className="px-5 py-4 flex flex-col gap-3">
                                        {/* Total Harga */}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Total Harga ({selectedCount}{" "}
                                                barang)
                                            </span>
                                            <span className="font-semibold text-gray-800">
                                                Rp{" "}
                                                {selectedTotal.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </span>
                                        </div>

                                        {/* Ongkir */}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Total Ongkos Kirim
                                            </span>
                                            <span className="font-semibold text-indigo-600">
                                                Gratis
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-dashed border-gray-200 pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-gray-800">
                                                    Total Tagihan
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    Rp{" "}
                                                    {selectedTotal.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tombol Checkout */}
                                        <button
                                            onClick={() =>
                                                selectedCount > 0 &&
                                                router.get("/checkout")
                                            }
                                            disabled={selectedCount === 0}
                                            className="w-full bg-indigo-500 text-white py-3 rounded-full font-bold text-sm hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition mt-2"
                                        >
                                            Beli ({selectedCount})
                                        </button>
                                    </div>

                                    {/* Info Keamanan */}
                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                                        <span className="text-lg">🔒</span>
                                        <p className="text-xs text-gray-400">
                                            Transaksi kamu aman bersama
                                            LaptopStore
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 text-center py-6 mt-4">
                <p className="text-xs text-gray-400">
                    © 2026 LaptopStore. All rights reserved.
                </p>
            </footer>
        </>
    );
}
