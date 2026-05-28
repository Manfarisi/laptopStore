<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $form): Schema
    {
        return $form->schema([

            Placeholder::make('order_number')
                ->label('No. Order')
                ->content(fn ($record) => $record?->order_number),

            Placeholder::make('user_name')
                ->label('Customer')
                ->content(fn ($record) => $record?->user?->name),

            Placeholder::make('total_price')
                ->label('Total')
                ->content(fn ($record) => 'Rp ' . number_format($record?->total_price, 0, ',', '.')),

            Placeholder::make('shipping_name')
                ->label('Nama Penerima')
                ->content(fn ($record) => $record?->shipping_name),

            Placeholder::make('shipping_phone')
                ->label('No. Telepon')
                ->content(fn ($record) => $record?->shipping_phone),

            Placeholder::make('shipping_address')
                ->label('Alamat')
                ->content(fn ($record) => $record?->shipping_address . ', ' . $record?->shipping_city . ', ' . $record?->shipping_postal_code),

            Placeholder::make('notes')
                ->label('Catatan')
                ->content(fn ($record) => $record?->notes ?? '-'),

            // Hanya ini yang bisa diedit
            Select::make('status')
                ->label('Status Pesanan')
                ->options([
                    'pending'    => '⏳ Pending',
                    'processing' => '⚙️ Processing',
                    'shipped'    => '🚚 Shipped',
                    'delivered'  => '✅ Delivered',
                    'cancelled'  => '❌ Cancelled',
                ])
                ->required(),
        ]);
    }
}