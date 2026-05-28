import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function ProfileIndex({ auth, flash, cartCount = 0 }) {
    const [activeTab, setActiveTab] = useState('profile');

    const { data, setData, put, processing, errors } = useForm({
        name:        auth.user?.name || '',
        email:       auth.user?.email || '',
        phone:       auth.user?.phone || '',
        address:     auth.user?.address || '',
        city:        auth.user?.city || '',
        postal_code: auth.user?.postal_code || '',
    });

    const { data: passData, setData: setPassData, put: putPass, processing: passProcessing, errors: passErrors, reset } = useForm({
        current_password:      '',
        password:              '',
        password_confirmation: '',
    });

    const handleProfile = (e) => {
        e.preventDefault();
        put('/profile');
    };

    const handlePassword = (e) => {
        e.preventDefault();
        putPass('/profile/password', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Profile - LaptopStore" />
<Navbar auth={auth} cartCount={cartCount} />

            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">

                    <h1 className="text-xl font-bold text-gray-800 mb-6">Profile Saya</h1>

                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
                            ✅ {flash.success}
                        </div>
                    )}

                    <div className="flex gap-4 items-start">

                        {/* Sidebar */}
                        <div className="w-56 flex-shrink-0">
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                {/* Avatar */}
                                <div className="px-5 py-6 border-b border-gray-100 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700 mx-auto mb-2">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">{auth.user.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{auth.user.email}</p>
                                </div>

                                {/* Menu */}
                                <div className="py-2">
                                    {[
                                        { key: 'profile',  icon: '👤', label: 'Data Diri' },
                                        { key: 'address',  icon: '📍', label: 'Alamat' },
                                        { key: 'password', icon: '🔒', label: 'Ganti Password' },
                                    ].map((menu) => (
                                        <button
                                            key={menu.key}
                                            onClick={() => setActiveTab(menu.key)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                                                activeTab === menu.key
                                                    ? 'bg-green-50 text-green-700 font-semibold border-r-2 border-green-500'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>{menu.icon}</span>
                                            {menu.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                                {/* Tab: Data Diri */}
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleProfile}>
                                        <div className="px-6 py-4 border-b border-gray-100">
                                            <h2 className="font-bold text-gray-800">Data Diri</h2>
                                            <p className="text-xs text-gray-400 mt-0.5">Update informasi dasar akun kamu</p>
                                        </div>
                                        <div className="px-6 py-6 flex flex-col gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Nama Lengkap</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">No. Telepon</label>
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    placeholder="08xxxxxxxxxx"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Tab: Alamat */}
                                {activeTab === 'address' && (
                                    <form onSubmit={handleProfile}>
                                        <div className="px-6 py-4 border-b border-gray-100">
                                            <h2 className="font-bold text-gray-800">Alamat</h2>
                                            <p className="text-xs text-gray-400 mt-0.5">Alamat ini akan dipakai sebagai default saat checkout</p>
                                        </div>
                                        <div className="px-6 py-6 flex flex-col gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Alamat Lengkap</label>
                                                <textarea
                                                    value={data.address}
                                                    onChange={e => setData('address', e.target.value)}
                                                    rows={3}
                                                    placeholder="Jalan, RT/RW, Kelurahan, Kecamatan..."
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Kota</label>
                                                    <input
                                                        type="text"
                                                        value={data.city}
                                                        onChange={e => setData('city', e.target.value)}
                                                        placeholder="Jakarta, Bandung..."
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Kode Pos</label>
                                                    <input
                                                        type="text"
                                                        value={data.postal_code}
                                                        onChange={e => setData('postal_code', e.target.value)}
                                                        placeholder="12345"
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan Alamat'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Tab: Password */}
                                {activeTab === 'password' && (
                                    <form onSubmit={handlePassword}>
                                        <div className="px-6 py-4 border-b border-gray-100">
                                            <h2 className="font-bold text-gray-800">Ganti Password</h2>
                                            <p className="text-xs text-gray-400 mt-0.5">Pastikan password baru minimal 8 karakter</p>
                                        </div>
                                        <div className="px-6 py-6 flex flex-col gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Password Lama</label>
                                                <input
                                                    type="password"
                                                    value={passData.current_password}
                                                    onChange={e => setPassData('current_password', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                {passErrors.current_password && <p className="text-xs text-red-500 mt-1">{passErrors.current_password}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Password Baru</label>
                                                <input
                                                    type="password"
                                                    value={passData.password}
                                                    onChange={e => setPassData('password', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                                {passErrors.password && <p className="text-xs text-red-500 mt-1">{passErrors.password}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Konfirmasi Password Baru</label>
                                                <input
                                                    type="password"
                                                    value={passData.password_confirmation}
                                                    onChange={e => setPassData('password_confirmation', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={passProcessing}
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition"
                                            >
                                                {passProcessing ? 'Menyimpan...' : 'Ganti Password'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-100 text-center py-6">
                <p className="text-xs text-gray-400">© 2026 LaptopStore. All rights reserved.</p>
            </footer>
        </>
    );
}