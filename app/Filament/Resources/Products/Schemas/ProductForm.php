<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Filament\Forms\Components\Repeater;

class ProductForm
{
    public static function configure(Schema $form): Schema
    {
        return $form->schema([

            // ── INFO UTAMA ──
            Section::make('Informasi Produk')
                ->schema([
                    Grid::make(2)->schema([
                        Select::make('category_id')
                            ->label('Kategori')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('brand')
                            ->label('Brand')
                            ->required(),
                    ]),

                    TextInput::make('name')
                        ->label('Nama Produk')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(
                            fn(string $operation, $state, $set) =>
                            $operation === 'create' ? $set('slug', Str::slug($state)) : null
                        )
                        ->columnSpanFull(),

                    TextInput::make('slug')
                        ->label('Slug')
                        ->required()
                        ->disabled(fn(string $operation) => $operation === 'edit')
                        ->dehydrated()
                        ->unique(ignoreRecord: true)
                        ->columnSpanFull(),

                    Textarea::make('description')
                        ->label('Deskripsi')
                        ->rows(4)
                        ->columnSpanFull(),

                    Grid::make(2)->schema([
                        TextInput::make('price')
                            ->label('Harga (Rp)')
                            ->numeric()
                            ->prefix('IDR')
                            ->required(),

                        TextInput::make('stock')
                            ->label('Stok')
                            ->numeric()
                            ->required(),
                    ]),

                    Grid::make(2)->schema([
                        Select::make('condition')
                            ->label('Kondisi')
                            ->options([
                                'Baru'  => 'Baru',
                                'Bekas' => 'Bekas',
                            ])
                            ->required(),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                    ]),

                    FileUpload::make('image')
                        ->label('Gambar Produk Utama')
                        ->helperText('Foto ini yang tampil di halaman Home & Shop')
                        ->image()
                        ->disk('public')
                        ->directory('products')
                        ->visibility('public')
                        ->columnSpanFull(),

                    Repeater::make('images')
                        ->label('Foto Tambahan')
                        ->relationship('images')
                        ->schema([
                            FileUpload::make('image')
                                ->label('Foto')
                                ->image()
                                ->disk('public')
                                ->directory('products')
                                ->visibility('public')
                                ->required(),
                            TextInput::make('order')
                                ->label('Urutan')
                                ->numeric()
                                ->default(0),
                        ])
                        ->columns(2)
                        ->columnSpanFull(),
                ]),



            // ── SPESIFIKASI ──
            Section::make('Spesifikasi Laptop')
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('processor')
                            ->label('Processor'),

                        TextInput::make('ram')
                            ->label('RAM'),

                        TextInput::make('storage')
                            ->label('Storage'),

                        TextInput::make('gpu')
                            ->label('GPU / VGA'),

                        TextInput::make('display')
                            ->label('Layar'),

                        TextInput::make('os')
                            ->label('Sistem Operasi'),

                        TextInput::make('battery')
                            ->label('Baterai'),

                        TextInput::make('weight')
                            ->label('Berat'),

                        TextInput::make('color')
                            ->label('Warna'),

                        TextInput::make('warranty')
                            ->label('Garansi'),
                    ]),
                ]),

        ]);
    }
}
