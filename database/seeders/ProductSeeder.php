<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Hapus data lama
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('carts')->truncate();
        DB::table('order_items')->truncate();
        DB::table('orders')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // =====================
        // KATEGORI LAPTOP
        // =====================
        $categories = [
            ['name' => 'Laptop Gaming',   'slug' => 'laptop-gaming',  'description' => 'Laptop bertenaga tinggi untuk gaming'],
            ['name' => 'Laptop Office',   'slug' => 'laptop-office',  'description' => 'Laptop ringan dan produktif untuk kerja'],
            ['name' => 'Laptop Desain',   'slug' => 'laptop-desain',  'description' => 'Laptop layar akurat untuk kreator konten'],
            ['name' => 'Laptop Pelajar',  'slug' => 'laptop-pelajar', 'description' => 'Laptop terjangkau untuk belajar sehari-hari'],
        ];

        foreach ($categories as $cat) {
            DB::table('categories')->insert([
                'name'        => $cat['name'],
                'slug'        => $cat['slug'],
                'description' => $cat['description'],
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }

        // =====================
        // PRODUK LAPTOP
        // =====================
        $products = [

            // ---- LAPTOP GAMING ----
            [
                'category' => 'laptop-gaming',
                'name'     => 'ASUS ROG Strix G16 2024',
                'brand'    => 'ASUS',
                'desc'     => 'Laptop gaming flagship dari ASUS ROG dengan performa brutal untuk gaming AAA dan streaming. Dilengkapi layar 165Hz untuk pengalaman visual yang mulus.',
                'price'    => 22999000,
                'stock'    => 8,
                'specs'    => [
                    'processor' => 'Intel Core i9-14900HX',
                    'ram'       => '16GB DDR5',
                    'storage'   => '1TB NVMe SSD',
                    'display'   => '16 inch QHD+ 165Hz IPS',
                    'gpu'       => 'NVIDIA RTX 4070 8GB',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '90Wh, up to 6 jam',
                    'weight'    => '2.5 kg',
                    'color'     => 'Eclipse Gray',
                    'warranty'  => '2 Tahun Resmi ASUS',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-gaming',
                'name'     => 'Lenovo Legion 5i Gen 9',
                'brand'    => 'Lenovo',
                'desc'     => 'Laptop gaming mid-range terbaik dengan pendingin Legion Coldfront yang canggih. Cocok untuk gamer yang butuh performa tinggi dengan harga terjangkau.',
                'price'    => 16499000,
                'stock'    => 10,
                'specs'    => [
                    'processor' => 'Intel Core i7-14650HX',
                    'ram'       => '16GB DDR5',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '15.6 inch FHD 144Hz IPS',
                    'gpu'       => 'NVIDIA RTX 4060 8GB',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '80Wh, up to 5 jam',
                    'weight'    => '2.4 kg',
                    'color'     => 'Onyx Grey',
                    'warranty'  => '2 Tahun Resmi Lenovo',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-gaming',
                'name'     => 'Acer Nitro V 15 2024',
                'brand'    => 'Acer',
                'desc'     => 'Entry-level gaming laptop terbaik di kelasnya. Performa solid untuk gaming esports dan konten kreasi ringan dengan harga yang sangat bersaing.',
                'price'    => 10999000,
                'stock'    => 15,
                'specs'    => [
                    'processor' => 'AMD Ryzen 5 7535HS',
                    'ram'       => '8GB DDR5',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '15.6 inch FHD 144Hz IPS',
                    'gpu'       => 'NVIDIA RTX 4050 6GB',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '57Wh, up to 5 jam',
                    'weight'    => '2.2 kg',
                    'color'     => 'Black',
                    'warranty'  => '1 Tahun Resmi Acer',
                    'condition' => 'Baru',
                ],
            ],

            // ---- LAPTOP OFFICE ----
            [
                'category' => 'laptop-office',
                'name'     => 'Dell Latitude 5540',
                'brand'    => 'Dell',
                'desc'     => 'Laptop bisnis premium dengan keamanan enterprise-grade dan ketahanan MIL-STD-810H. Ideal untuk profesional yang sering bepergian.',
                'price'    => 18999000,
                'stock'    => 7,
                'specs'    => [
                    'processor' => 'Intel Core i7-1365U',
                    'ram'       => '16GB DDR4',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '15.6 inch FHD IPS Anti-Glare',
                    'gpu'       => 'Intel Iris Xe Graphics',
                    'os'        => 'Windows 11 Pro',
                    'battery'   => '54Wh, up to 12 jam',
                    'weight'    => '1.74 kg',
                    'color'     => 'Titan Gray',
                    'warranty'  => '3 Tahun Resmi Dell',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-office',
                'name'     => 'HP EliteBook 840 G11',
                'brand'    => 'HP',
                'desc'     => 'Laptop bisnis ultra-tipis dengan layar OLED memukau dan performa Intel Core Ultra. Desain premium dengan bodi aluminium anodized.',
                'price'    => 21499000,
                'stock'    => 5,
                'specs'    => [
                    'processor' => 'Intel Core Ultra 7 165U',
                    'ram'       => '16GB LPDDR5',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '14 inch OLED 2.8K 120Hz',
                    'gpu'       => 'Intel Arc Graphics',
                    'os'        => 'Windows 11 Pro',
                    'battery'   => '51Wh, up to 14 jam',
                    'weight'    => '1.39 kg',
                    'color'     => 'Silver',
                    'warranty'  => '3 Tahun Resmi HP',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-office',
                'name'     => 'Lenovo ThinkPad E14 Gen 5',
                'brand'    => 'Lenovo',
                'desc'     => 'ThinkPad legendaris dengan keyboard terbaik di kelasnya dan daya tahan tak tertandingi. Pilihan utama para profesional dan enterprise.',
                'price'    => 13999000,
                'stock'    => 10,
                'specs'    => [
                    'processor' => 'AMD Ryzen 7 7730U',
                    'ram'       => '16GB DDR4',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '14 inch FHD IPS Anti-Glare',
                    'gpu'       => 'AMD Radeon 610M',
                    'os'        => 'Windows 11 Pro',
                    'battery'   => '57Wh, up to 11 jam',
                    'weight'    => '1.64 kg',
                    'color'     => 'Thunder Black',
                    'warranty'  => '1 Tahun Resmi Lenovo',
                    'condition' => 'Baru',
                ],
            ],

            // ---- LAPTOP DESAIN ----
            [
                'category' => 'laptop-desain',
                'name'     => 'Apple MacBook Pro 14 M3 Pro',
                'brand'    => 'Apple',
                'desc'     => 'Laptop terbaik untuk kreator konten dengan chip M3 Pro yang luar biasa cepat. Layar Liquid Retina XDR dengan akurasi warna sempurna untuk editing foto dan video.',
                'price'    => 32999000,
                'stock'    => 5,
                'specs'    => [
                    'processor' => 'Apple M3 Pro 11-core CPU',
                    'ram'       => '18GB Unified Memory',
                    'storage'   => '512GB SSD',
                    'display'   => '14.2 inch Liquid Retina XDR 120Hz',
                    'gpu'       => 'Apple M3 Pro 14-core GPU',
                    'os'        => 'macOS Sonoma',
                    'battery'   => '70Wh, up to 18 jam',
                    'weight'    => '1.61 kg',
                    'color'     => 'Space Black',
                    'warranty'  => '1 Tahun Resmi Apple',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-desain',
                'name'     => 'ASUS ProArt Studiobook 16',
                'brand'    => 'ASUS',
                'desc'     => 'Laptop workstation premium untuk profesional desain grafis, 3D artist, dan video editor. Dilengkapi OLED display dengan akurasi warna PANTONE Validated.',
                'price'    => 28499000,
                'stock'    => 4,
                'specs'    => [
                    'processor' => 'Intel Core i9-13980HX',
                    'ram'       => '32GB DDR5',
                    'storage'   => '1TB NVMe SSD',
                    'display'   => '16 inch OLED 4K 120Hz PANTONE Validated',
                    'gpu'       => 'NVIDIA RTX 4070 8GB',
                    'os'        => 'Windows 11 Pro',
                    'battery'   => '90Wh, up to 8 jam',
                    'weight'    => '2.4 kg',
                    'color'     => 'Mineral Black',
                    'warranty'  => '2 Tahun Resmi ASUS',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-desain',
                'name'     => 'Microsoft Surface Laptop Studio 2',
                'brand'    => 'Microsoft',
                'desc'     => 'Laptop 2-in-1 inovatif dengan layar sentuh PixelSense Flow yang bisa dilipat untuk menggambar. Sempurna untuk desainer dan ilustrator digital.',
                'price'    => 25999000,
                'stock'    => 6,
                'specs'    => [
                    'processor' => 'Intel Core i7-13700H',
                    'ram'       => '16GB LPDDR5',
                    'storage'   => '512GB SSD',
                    'display'   => '14.4 inch PixelSense Flow Touch 120Hz',
                    'gpu'       => 'NVIDIA RTX 4050 6GB',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '58Wh, up to 10 jam',
                    'weight'    => '1.98 kg',
                    'color'     => 'Platinum',
                    'warranty'  => '1 Tahun Resmi Microsoft',
                    'condition' => 'Baru',
                ],
            ],

            // ---- LAPTOP PELAJAR ----
            [
                'category' => 'laptop-pelajar',
                'name'     => 'Acer Aspire 3 AMD Ryzen 5',
                'brand'    => 'Acer',
                'desc'     => 'Laptop pelajar terbaik dengan harga terjangkau. Performa AMD Ryzen 5 yang kencang untuk multitasking, mengerjakan tugas, dan hiburan sehari-hari.',
                'price'    => 6499000,
                'stock'    => 20,
                'specs'    => [
                    'processor' => 'AMD Ryzen 5 7520U',
                    'ram'       => '8GB LPDDR5',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '15.6 inch FHD IPS',
                    'gpu'       => 'AMD Radeon 610M',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '50Wh, up to 8 jam',
                    'weight'    => '1.7 kg',
                    'color'     => 'Pure Silver',
                    'warranty'  => '1 Tahun Resmi Acer',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-pelajar',
                'name'     => 'ASUS VivoBook Go 14 E1404',
                'brand'    => 'ASUS',
                'desc'     => 'Laptop tipis dan ringan ideal untuk pelajar. Desain stylish dengan performa yang cukup untuk kebutuhan belajar online, mengerjakan tugas, dan video call.',
                'price'    => 5999000,
                'stock'    => 25,
                'specs'    => [
                    'processor' => 'Intel Core i3-N305',
                    'ram'       => '8GB DDR4',
                    'storage'   => '256GB NVMe SSD',
                    'display'   => '14 inch FHD IPS',
                    'gpu'       => 'Intel UHD Graphics',
                    'os'        => 'Windows 11 Home S',
                    'battery'   => '42Wh, up to 9 jam',
                    'weight'    => '1.38 kg',
                    'color'     => 'Indie Black',
                    'warranty'  => '2 Tahun Resmi ASUS',
                    'condition' => 'Baru',
                ],
            ],
            [
                'category' => 'laptop-pelajar',
                'name'     => 'Lenovo IdeaPad Slim 3 Gen 8',
                'brand'    => 'Lenovo',
                'desc'     => 'Laptop pelajar yang seimbang antara harga dan performa. Baterai tahan lama membuatnya cocok dibawa seharian ke sekolah atau kampus tanpa khawatir kehabisan daya.',
                'price'    => 7299000,
                'stock'    => 18,
                'specs'    => [
                    'processor' => 'AMD Ryzen 5 7530U',
                    'ram'       => '8GB DDR4',
                    'storage'   => '512GB NVMe SSD',
                    'display'   => '15.6 inch FHD IPS Anti-Glare',
                    'gpu'       => 'AMD Radeon Graphics',
                    'os'        => 'Windows 11 Home',
                    'battery'   => '45Wh, up to 10 jam',
                    'weight'    => '1.62 kg',
                    'color'     => 'Arctic Grey',
                    'warranty'  => '2 Tahun Resmi Lenovo',
                    'condition' => 'Baru',
                ],
            ],
        ];

        foreach ($products as $p) {
            $categoryId = DB::table('categories')->where('slug', $p['category'])->value('id');

            DB::table('products')->insert([
                'category_id' => $categoryId,
                'name'        => $p['name'],
                'brand'       => $p['brand'],
                'slug'        => Str::slug($p['name']),
                'description' => $p['desc'],
                'price'       => $p['price'],
                'stock'       => $p['stock'],
                'image'       => null,
                'is_active'   => true,
                'processor'   => $p['specs']['processor'],
                'ram'         => $p['specs']['ram'],
                'storage'     => $p['specs']['storage'],
                'display'     => $p['specs']['display'],
                'gpu'         => $p['specs']['gpu'],
                'os'          => $p['specs']['os'],
                'battery'     => $p['specs']['battery'],
                'weight'      => $p['specs']['weight'],
                'color'       => $p['specs']['color'],
                'warranty'    => $p['specs']['warranty'],
                'condition'   => $p['specs']['condition'],
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}
