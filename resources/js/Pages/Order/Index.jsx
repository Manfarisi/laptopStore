import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function OrderIndex({ orders, auth, cartCount = 0 }) {
    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        processing: "bg-blue-100 text-blue-700 border-blue-200",
        shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
        delivered: "bg-green-100 text-green-700 border-green-200",
        cancelled: "bg-red-100 text-red-700 border-red-200",
    };

    const statusLabel = {
        pending: "⏳ Menunggu Pembayaran",
        processing: "⚙️ Diproses",
        shipped: "🚚 Dikirim",
        delivered: "✅ Selesai",
        cancelled: "❌ Dibatalkan",
    };

    const statusStep = {
        pending: 1,
        processing: 2,
        shipped: 3,
        delivered: 4,
        cancelled: 0,
    };

    return (
        <>
            <Head title="Riwayat Pesanan - LaptopStore" />

            {/* Navbar */}
            <Navbar auth={auth} cartCount={cartCount} />

            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                Riwayat Pesanan
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {orders.length} pesanan ditemukan
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition"
                        >
                            + Belanja Lagi
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-20 text-center">
                            <div className="text-5xl mb-4">📦</div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Belum ada pesanan
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Yuk mulai belanja laptop impianmu!
                            </p>
                            <Link
                                href="/shop"
                                className="bg-green-500 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-green-600 transition"
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                                >
                                    {/* Header Order */}
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">🏪</span>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    LaptopStore Official
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(
                                                        order.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor[order.status]}`}
                                            >
                                                {statusLabel[order.status]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar Status */}
                                    {order.status !== "cancelled" && (
                                        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50">
                                            <div className="flex items-center justify-between relative">
                                                {/* Line */}
                                                <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 z-0">
                                                    <div
                                                        className="h-full bg-green-500 transition-all duration-500"
                                                        style={{
                                                            width: `${((statusStep[order.status] - 1) / 3) * 100}%`,
                                                        }}
                                                    />
                                                </div>

                                                {[
                                                    {
                                                        step: 1,
                                                        label: "Pesanan\nDibuat",
                                                        icon: "📋",
                                                    },
                                                    {
                                                        step: 2,
                                                        label: "Sedang\nDiproses",
                                                        icon: "⚙️",
                                                    },
                                                    {
                                                        step: 3,
                                                        label: "Sedang\nDikirim",
                                                        icon: "🚚",
                                                    },
                                                    {
                                                        step: 4,
                                                        label: "Pesanan\nSelesai",
                                                        icon: "✅",
                                                    },
                                                ].map((s) => (
                                                    <div
                                                        key={s.step}
                                                        className="flex flex-col items-center z-10"
                                                    >
                                                        <div
                                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all ${
                                                                statusStep[
                                                                    order.status
                                                                ] >= s.step
                                                                    ? "bg-green-500 border-green-500 text-white"
                                                                    : "bg-white border-gray-300 text-gray-300"
                                                            }`}
                                                        >
                                                            {statusStep[
                                                                order.status
                                                            ] >= s.step
                                                                ? "✓"
                                                                : s.step}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-1 text-center whitespace-pre-line leading-tight">
                                                            {s.label}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Produk */}
                                    <div className="px-6 py-4">
                                        {order.order_items
                                            ?.slice(0, 2)
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-4 py-2"
                                                >
                                                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                        {item.product?.image ? (
                                                            <img
                                                                src={`/storage/${item.product.image}`}
                                                                alt={
                                                                    item.product_name
                                                                }
                                                                className="w-full h-full object-contain p-1"
                                                            />
                                                        ) : (
                                                            <span className="text-2xl">
                                                                💻
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                                            {item.product_name}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {item.quantity} × Rp{" "}
                                                            {Number(
                                                                item.price,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-800 flex-shrink-0">
                                                        Rp{" "}
                                                        {Number(
                                                            item.subtotal,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </p>
                                                </div>
                                            ))}

                                        {order.order_items?.length > 2 && (
                                            <p className="text-xs text-gray-400 mt-2 text-center">
                                                +{order.order_items.length - 2}{" "}
                                                produk lainnya
                                            </p>
                                        )}
                                    </div>

                                    {/* Footer Order */}
                                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                No. Pesanan:{" "}
                                                <span className="font-semibold text-gray-600">
                                                    {order.order_number}
                                                </span>
                                            </p>
                                            <p className="text-sm font-bold text-gray-800 mt-1">
                                                Total:{" "}
                                                <span className="text-green-600">
                                                    Rp{" "}
                                                    {Number(
                                                        order.total_price,
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {order.status === "pending" && (
                                                <Link
                                                    href={`/orders/${order.id}`}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition"
                                                >
                                                    💳 Bayar
                                                </Link>
                                            )}
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className="bg-white border-t border-gray-100 text-center py-6 mt-0">
                <p className="text-xs text-gray-400">
                    © 2026 LaptopStore. All rights reserved.
                </p>
            </footer>
        </>
    );
}
