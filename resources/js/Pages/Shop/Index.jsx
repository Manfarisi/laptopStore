import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";

export default function ShopIndex({
    products,
    categories = [],
    filters = {},
    auth,
    cartCount = 0,
}) {
    // Pengaman utama untuk objek filters dari backend
    const currentFilters = filters ?? {};

    // Membaca parameter langsung dari URL browser agar aman dari error null/undefined
    const getUrlParam = (param, defaultValue = "") => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            return params.get(param) || defaultValue;
        }
        return defaultValue;
    };

    // Inisialisasi state awal
    const [search, setSearch] = useState(() => getUrlParam("search"));
    const [minPrice, setMinPrice] = useState(() => getUrlParam("min_price"));
    const [maxPrice, setMaxPrice] = useState(() => getUrlParam("max_price"));
    const [currentSort, setCurrentSort] = useState(() => getUrlParam("sort"));
    const [showFilter, setShowFilter] = useState(false);

    // Sinkronisasi state jika filter berubah atau di-reset
    useEffect(() => {
        setSearch(getUrlParam("search"));
        setMinPrice(getUrlParam("min_price"));
        setMaxPrice(getUrlParam("max_price"));
        setCurrentSort(getUrlParam("sort"));
    }, [filters]);

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const applyFilters = (overrides = {}) => {
        router.get(
            "/shop",
            {
                search: search,
                category: currentFilters.category ?? "",
                min_price: minPrice,
                max_price: maxPrice,
                sort: currentSort,
                ...overrides,
            },
            { preserveState: true },
        );
    };

    const handleCategory = (slug) => {
        router.get(
            "/shop",
            {
                category: slug,
                min_price: minPrice,
                max_price: maxPrice,
                sort: currentSort,
                search: search,
            },
            { preserveState: true },
        );
    };

    const handleSort = (value) => {
        setCurrentSort(value);
        applyFilters({ sort: value });
    };

    const handlePriceFilter = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const resetFilters = () => {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setCurrentSort("");
        router.get("/shop");
    };

    const priceRanges = [
        { label: "Semua Harga", min: "", max: "" },
        { label: "Di bawah 5 juta", min: "", max: 5000000 },
        { label: "5 - 10 juta", min: 5000000, max: 10000000 },
        { label: "10 - 20 juta", min: 10000000, max: 20000000 },
        { label: "Di atas 20 juta", min: 20000000, max: "" },
    ];

    const handlePagination = (url) => {
        if (!url) return;
        const urlObj = new URL(url, window.location.origin);
        const page = urlObj.searchParams.get("page");
        applyFilters({ page });
    };

    return (
        <>
            <Head title="Shop - LaptopStore" />
            <Navbar auth={auth} cartCount={cartCount} />

            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-800">
                            Semua Laptop
                        </h1>
                        <div className="flex items-center gap-3">
                            {/* Sort */}
                            <select
                                value={currentSort}
                                onChange={(e) => handleSort(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                            >
                                <option value="">Terbaru</option>
                                <option value="price_asc">Harga Terendah</option>
                                <option value="price_desc">Harga Tertinggi</option>
                            </select>

                            {/* Toggle Filter */}
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${
                                    showFilter
                                        ? "bg-indigo-500 text-white border-indigo-500"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                🔧 Filter
                                {(minPrice || maxPrice) && (
                                    <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        !
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari laptop..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                        >
                            Cari
                        </button>
                        {(search || minPrice || maxPrice || currentSort || currentFilters.category) && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
                            >
                                Reset
                            </button>
                        )}
                    </form>

                    <div className="flex gap-4">
                        {/* Sidebar Filter */}
                        {showFilter && (
                            <div className="w-56 flex-shrink-0">
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    {/* Kategori */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3">
                                            Kategori
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => handleCategory("")}
                                                className={`text-left text-sm px-3 py-2 rounded-lg transition ${
                                                    !currentFilters.category
                                                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                            >
                                                Semua Kategori
                                            </button>
                                            {categories && categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => handleCategory(cat.slug)}
                                                    className={`text-left text-sm px-3 py-2 rounded-lg transition ${
                                                        currentFilters.category === cat.slug
                                                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Range Harga Cepat */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3">
                                            Range Harga
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                            {priceRanges.map((range, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => {
                                                        setMinPrice(range.min);
                                                        setMaxPrice(range.max);
                                                        router.get(
                                                            "/shop",
                                                            {
                                                                category: currentFilters.category ?? "",
                                                                min_price: range.min,
                                                                max_price: range.max,
                                                                sort: currentSort,
                                                                search,
                                                            },
                                                            { preserveState: true },
                                                        );
                                                    }}
                                                    className={`text-left text-sm px-3 py-2 rounded-lg transition ${
                                                        minPrice == range.min && maxPrice == range.max
                                                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {range.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Harga */}
                                    <form onSubmit={handlePriceFilter} className="px-4 py-3">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3">
                                            Harga Custom
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            <input
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                placeholder="Min (Rp)"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            />
                                            <input
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                placeholder="Max (Rp)"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            />
                                            <button
                                                type="submit"
                                                className="w-full bg-indigo-500 text-white py-2 rounded-lg text-xs font-semibold hover:bg-indigo-600 transition"
                                            >
                                                Terapkan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Konten Produk */}
                        <div className="flex-1">
                            {/* Filter Kategori Pills */}
                            <div className="flex gap-2 flex-wrap mb-4">
                                {categories && categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategory(cat.slug)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                                            currentFilters.category === cat.slug
                                                ? "bg-indigo-500 text-white"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Info hasil filter */}
                            {(minPrice || maxPrice || currentFilters.category || search) && (
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 bg-white rounded-lg px-4 py-2 border border-gray-200">
                                    <span>Filter aktif:</span>
                                    {currentFilters.category && (
                                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                                            {currentFilters.category}
                                        </span>
                                    )}
                                    {(minPrice || maxPrice) && (
                                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                                            Rp {minPrice ? Number(minPrice).toLocaleString("id-ID") : "0"} - {maxPrice ? Number(maxPrice).toLocaleString("id-ID") : "∞"}
                                        </span>
                                    )}
                                    {search && (
                                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
                                            "{search}"
                                        </span>
                                    )}
                                    <span className="text-gray-400">
                                        ({products?.total || 0} produk)
                                    </span>
                                </div>
                            )}

                            {/* Grid Produk */}
                            {!products?.data || products.data.length === 0 ? (
                                <div className="bg-white rounded-xl p-16 text-center">
                                    <div className="text-4xl mb-3">😔</div>
                                    <p className="text-gray-500 font-medium">Produk tidak ditemukan</p>
                                    <button onClick={resetFilters} className="mt-4 text-indigo-600 text-sm font-medium hover:underline">
                                        Reset semua filter
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {products.data.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/shop/${product.slug}`}
                                            className="bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-indigo-200 transition overflow-hidden"
                                        >
                                            <div className="h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
                                                {product.image ? (
                                                    <img src={`/storage/${product.image}`} alt={product.name} className="h-full w-full object-contain p-3" />
                                                ) : (
                                                    <span className="text-4xl">💻</span>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <p className="text-xs text-indigo-600 font-medium mb-1">{product.category?.name}</p>
                                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-2">{product.name}</h3>
                                                <p className="text-indigo-600 font-bold text-sm">Rp {Number(product.price).toLocaleString("id-ID")}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {products?.links && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {products.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePagination(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                                                link.active ? "bg-indigo-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                            } disabled:opacity-40`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}