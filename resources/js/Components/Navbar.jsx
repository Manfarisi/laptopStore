import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar({ auth, cartCount = 0 }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        router.post("/logout");
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            router.get("/shop", { search: searchQuery });
        }
    };

    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">

                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <span className="text-lg font-semibold tracking-tight text-gray-900">
                        Laptop<span className="text-blue-600">Store</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                    <Link href="/shop?category=laptop-gaming" className="hover:text-gray-900 transition">Gaming</Link>
                    <Link href="/shop?category=laptop-office" className="hover:text-gray-900 transition">Office</Link>
                    <Link href="/shop?category=laptop-desain" className="hover:text-gray-900 transition">Desain</Link>
                    <Link href="/shop?category=laptop-pelajar" className="hover:text-gray-900 transition">Pelajar</Link>
                    <Link href="/shop" className="hover:text-gray-900 transition">Semua</Link>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-xs hidden md:block">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                        <span className="text-gray-400 text-sm">🔍</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Cari laptop..."
                            className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 flex-shrink-0">

                    {/* Cart */}
                    <Link href="/cart" className="relative text-gray-500 hover:text-gray-900 transition">
                        <span className="text-xl">🛒</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    {auth?.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold hover:bg-blue-700 transition"
                            >
                                {auth.user.name.charAt(0).toUpperCase()}
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 top-11 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">{auth.user.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{auth.user.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                                            >
                                                <span>👤</span> Profile Saya
                                            </Link>
                                            <Link
                                                href="/orders"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                                            >
                                                <span>📦</span> Pesanan Saya
                                            </Link>
                                            <Link
                                                href="/wishlist"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                                            >
                                                <span>♡</span> Wishlist
                                            </Link>
                                        </div>
                                        <div className="border-t border-gray-50 py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                                            >
                                                <span>🚪</span> Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}