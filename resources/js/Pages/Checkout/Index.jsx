import Navbar from '@/Components/Navbar';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function CheckoutIndex({ carts, total, auth, cartCount = 0 }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name:        auth.user?.name || '',
        shipping_phone:       '',
        shipping_address:     '',
        shipping_city:        '',
        shipping_postal_code: '',
        notes:                '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/checkout');
    };

    return (
        <>
            <Head title="Checkout - LaptopStore" />

            {/* Navbar */}
<Navbar auth={auth} cartCount={cartCount} />


            <div className="bg-gray-100 min-h-screen py-6">
                <div className="max-w-6xl mx-auto px-4">

                    <h1 className="text-lg font-bold text-gray-800 mb-4">Checkout</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 items-start">

                            {/* Kiri — Form Pengiriman */}
                            <div className="flex-1 flex flex-col gap-4">

                                {/* Alamat Pengiriman */}
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                                        <span className="text-green-600">📍</span>
                                        <span className="text-sm font-bold text-gray-800">Alamat Pengiriman</span>
                                    </div>

                                    <div className="px-5 py-5 flex flex-col gap-4">
                                        {/* Nama & Telepon */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                    Nama Penerima <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.shipping_name}
                                                    onChange={e => setData('shipping_name', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    placeholder="Nama lengkap penerima"
                                                />
                                                {errors.shipping_name && <p className="text-xs text-red-500 mt-1">{errors.shipping_name}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                    No. Telepon <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.shipping_phone}
                                                    onChange={e => setData('shipping_phone', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    placeholder="08xxxxxxxxxx"
                                                />
                                                {errors.shipping_phone && <p className="text-xs text-red-500 mt-1">{errors.shipping_phone}</p>}
                                            </div>
                                        </div>

                                        {/* Alamat */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                Alamat Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={data.shipping_address}
                                                onChange={e => setData('shipping_address', e.target.value)}
                                                rows={3}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan..."
                                            />
                                            {errors.shipping_address && <p className="text-xs text-red-500 mt-1">{errors.shipping_address}</p>}
                                        </div>

                                        {/* Kota & Kode Pos */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                    Kota <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.shipping_city}
                                                    onChange={e => setData('shipping_city', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    placeholder="Jakarta, Bandung, Surabaya..."
                                                />
                                                {errors.shipping_city && <p className="text-xs text-red-500 mt-1">{errors.shipping_city}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                    Kode Pos <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.shipping_postal_code}
                                                    onChange={e => setData('shipping_postal_code', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    placeholder="12345"
                                                />
                                                {errors.shipping_postal_code && <p className="text-xs text-red-500 mt-1">{errors.shipping_postal_code}</p>}
                                            </div>
                                        </div>

                                        {/* Catatan */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                                Catatan (opsional)
                                            </label>
                                            <textarea
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                                rows={2}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                placeholder="Catatan untuk penjual..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Produk yang dipesan */}
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                                        <span className="text-green-600">📦</span>
                                        <span className="text-sm font-bold text-gray-800">Produk Dipesan</span>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {carts.map((cart) => (
                                            <div key={cart.id} className="px-5 py-4 flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    {cart.product.image ? (
                                                        <img
                                                            src={`/storage/${cart.product.image}`}
                                                            alt={cart.product.name}
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">💻</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-800 truncate">{cart.product.name}</p>
                                                    <p className="text-xs text-gray-400">{cart.product.processor} • {cart.product.ram}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {cart.quantity} × Rp {Number(cart.product.price).toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-800 flex-shrink-0">
                                                    Rp {(Number(cart.product.price) * cart.quantity).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Kanan — Ringkasan */}
                            <div className="w-80 flex-shrink-0 sticky top-20">
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <h2 className="font-bold text-gray-800 text-sm">Ringkasan Pembayaran</h2>
                                    </div>
                                    <div className="px-5 py-4 flex flex-col gap-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Total Harga</span>
                                            <span className="font-semibold">Rp {Number(total).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Ongkos Kirim</span>
                                            <span className="text-green-600 font-semibold">Gratis</span>
                                        </div>
                                        <div className="border-t border-dashed border-gray-200 pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-gray-800">Total Tagihan</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    Rp {Number(total).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-green-500 text-white py-3 rounded-full font-bold text-sm hover:bg-green-600 disabled:opacity-50 transition mt-2"
                                        >
                                            {processing ? 'Memproses...' : 'Buat Pesanan'}
                                        </button>

                                        <Link
                                            href="/cart"
                                            className="block text-center text-xs text-gray-400 hover:text-gray-700 transition"
                                        >
                                            ← Kembali ke Keranjang
                                        </Link>
                                    </div>

                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                                        <span className="text-base">🔒</span>
                                        <p className="text-xs text-gray-400">Pembayaran aman & terpercaya</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-100 text-center py-6">
                <p className="text-xs text-gray-400">© 2026 LaptopStore. All rights reserved.</p>
            </footer>
        </>
    );
}