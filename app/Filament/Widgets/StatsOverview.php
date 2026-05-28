<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Cart;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $todayRevenue = Order::whereDate('created_at', today())
            ->whereNotIn('status', ['cancelled'])
            ->sum('total_price');

        $monthRevenue = Order::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->whereNotIn('status', ['cancelled'])
            ->sum('total_price');

        $pendingOrders = Order::where('status', 'pending')->count();
        $processingOrders = Order::where('status', 'processing')->count();
        $totalOrders = Order::count();
        $totalCustomers = User::where('role', 'customer')->count();
        $totalProducts = Product::where('is_active', true)->count();
        $lowStock = Product::where('stock', '<=', 3)
            ->where('is_active', true)
            ->count();

        return [
            Stat::make('Revenue Hari Ini', 'Rp ' . number_format($todayRevenue, 0, ',', '.'))
                ->description('Total penjualan hari ini')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('Revenue Bulan Ini', 'Rp ' . number_format($monthRevenue, 0, ',', '.'))
                ->description('Total penjualan bulan ' . now()->translatedFormat('F'))
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Total Order', $totalOrders)
                ->description("Pending: {$pendingOrders} | Diproses: {$processingOrders}")
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('warning'),

            Stat::make('Customer', $totalCustomers)
                ->description('Total customer terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),

            Stat::make('Produk Aktif', $totalProducts)
                ->description('Tersedia di toko')
                ->descriptionIcon('heroicon-m-computer-desktop')
                ->color('primary'),

            Stat::make('Stok Menipis', $lowStock)
                ->description('Produk dengan stok ≤ 3')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($lowStock > 0 ? 'danger' : 'success'),
        ];
    }
}