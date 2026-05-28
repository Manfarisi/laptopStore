<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class RevenueChart extends ChartWidget
{
    protected ?string $heading = '📈 Grafik Penjualan 7 Hari Terakhir';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $data = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo);
            $revenue = Order::whereDate('created_at', $date)
                ->whereNotIn('status', ['cancelled'])
                ->sum('total_price');

            return [
                'date'    => $date->format('d M'),
                'revenue' => $revenue,
            ];
        });

        return [
            'datasets' => [
                [
                    'label'           => 'Revenue (Rp)',
                    'data'            => $data->pluck('revenue')->toArray(),
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'borderColor'     => 'rgb(16, 185, 129)',
                    'borderWidth'     => 2,
                    'fill'            => true,
                    'tension'         => 0.4,
                ],
            ],
            'labels' => $data->pluck('date')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}