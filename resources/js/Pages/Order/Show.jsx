import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function OrderShow({ order, auth, flash, cartCount = 0 }) {
    const [paying, setPaying] = useState(false);
    const snapToken = flash?.snap_token;

    useEffect(() => {
        // Load Midtrans Snap.js
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
        );
        script.async = true;
        document.head.appendChild(script);
        return () => document.head.removeChild(script);
    }, []);

    const handlePay = () => {
        if (!snapToken) return;
        setPaying(true);
        window.snap.pay(snapToken, {
            onSuccess: () => window.location.reload(),
            onPending: () => window.location.reload(),
            onError: () => setPaying(false),
            onClose: () => setPaying(false),
        });
    };

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        processing: "bg-blue-100 text-blue-700",
        shipped: "bg-indigo-100 text-indigo-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    const statusLabel = {
        pending: "⏳ Menunggu Pembayaran",
        processing: "⚙️ Diproses",
        shipped: "🚚 Dikirim",
        delivered: "✅ Selesai",
        cancelled: "❌ Dibatalkan",
    };

    return (
        <>
            <Head title={`Order ${order.order_number}`} />

            {/* Navbar */}
            <Navbar auth={auth} cartCount={cartCount} />

            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Banner */}
                    {order.status === "pending" ? (
                        <div className="bg-yellow-500 rounded-2xl p-8 text-center text-white mb-6">
                            <div className="text-5xl mb-3">⏳</div>
                            <h1 className="text-2xl font-bold mb-1">
                                Pesanan Dibuat!
                            </h1>
                            <p className="text-yellow-100 text-sm">
                                Selesaikan pembayaran untuk memproses pesananmu
                            </p>
                        </div>
                    ) : (
                        <div className="bg-indigo-500 rounded-2xl p-8 text-center text-white mb-6">
                            <div className="text-5xl mb-3">🎉</div>
                            <h1 className="text-2xl font-bold mb-1">
                                Pembayaran Berhasil!
                            </h1>
                            <p className="text-indigo-100 text-sm">
                                Terima kasih telah berbelanja di LaptopStore
                            </p>
                        </div>
                    )}

                    {/* Tombol Bayar Midtrans */}
                    {snapToken && order.status === "pending" && (
                        <div className="bg-white rounded-xl border border-yellow-200 p-5 mb-4 text-center">
                            <p className="text-sm text-gray-600 mb-4">
                                Selesaikan pembayaran sebesar{" "}
                                <span className="font-bold text-gray-900">
                                    Rp{" "}
                                    {Number(order.total_price).toLocaleString(
                                        "id-ID",
                                    )}
                                </span>
                            </p>
                            <button
                                onClick={handlePay}
                                disabled={paying}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
                            >
                                {paying ? (
                                    <>⏳ Membuka Halaman Pembayaran...</>
                                ) : (
                                    <>💳 Bayar Sekarang</>
                                )}
                            </button>
                            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                                <span>GoPay</span>
                                <span>•</span>
                                <span>QRIS</span>
                                <span>•</span>
                                <span>Transfer Bank</span>
                                <span>•</span>
                                <span>Kartu Kredit</span>
                            </div>
                        </div>
                    )}

                    {/* Info Order */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-gray-800 text-sm">
                                Informasi Pesanan
                            </h2>
                        </div>
                        <div className="px-5 py-4 flex flex-col gap-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                    No. Pesanan
                                </span>
                                <span className="font-bold text-gray-800">
                                    {order.order_number}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Status</span>
                                <span
                                    className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor[order.status]}`}
                                >
                                    {statusLabel[order.status]}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total</span>
                                <span className="font-bold text-indigo-600 text-base">
                                    Rp{" "}
                                    {Number(order.total_price).toLocaleString(
                                        "id-ID",
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tanggal</span>
                                <span className="text-gray-700">
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                            <span>📍</span>
                            <h2 className="font-bold text-gray-800 text-sm">
                                Alamat Pengiriman
                            </h2>
                        </div>
                        <div className="px-5 py-4 text-sm text-gray-600 flex flex-col gap-1">
                            <p className="font-semibold text-gray-800">
                                {order.shipping_name}
                            </p>
                            <p>{order.shipping_phone}</p>
                            <p>{order.shipping_address}</p>
                            <p>
                                {order.shipping_city},{" "}
                                {order.shipping_postal_code}
                            </p>
                            {order.notes && (
                                <p className="text-gray-400 italic mt-1">
                                    Catatan: {order.notes}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Produk */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                            <span>📦</span>
                            <h2 className="font-bold text-gray-800 text-sm">
                                Produk Dipesan
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.order_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="px-5 py-4 flex items-center gap-4"
                                >
                                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {item.product?.image ? (
                                            <img
                                                src={`/storage/${item.product.image}`}
                                                alt={item.product_name}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        ) : (
                                            <span className="text-2xl">💻</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            {item.product_name}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {item.quantity} × Rp{" "}
                                            {Number(item.price).toLocaleString(
                                                "id-ID",
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-800">
                                        Rp{" "}
                                        {Number(item.subtotal).toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                            <span className="text-sm font-bold text-gray-700">
                                Total
                            </span>
                            <span className="text-sm font-bold text-indigo-600">
                                Rp{" "}
                                {Number(order.total_price).toLocaleString(
                                    "id-ID",
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Tombol */}
                    <div className="flex gap-3">
                        <Link
                            href="/shop"
                            className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full text-sm font-semibold text-center hover:bg-gray-50 transition"
                        >
                            Lanjut Belanja
                        </Link>
                        <Link
                            href="/orders"
                            className="flex-1 bg-indigo-500 text-white py-3 rounded-full text-sm font-bold text-center hover:bg-indigo-600 transition"
                        >
                            Lihat Semua Pesanan
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-100 text-center py-6">
                <p className="text-xs text-gray-400">
                    © 2026 LaptopStore. All rights reserved.
                </p>
            </footer>
        </>
    );
}
