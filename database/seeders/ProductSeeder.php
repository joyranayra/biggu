<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                "name" => "Cincin",
                "price" => 45000,
                "image" => "/produk/cincin/cincin-1.jpeg",
                "badge" => "NEW",
                "category" => "Perhiasan",
                "rating" => 4.6,
                "reviews" => 18,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Dompet Rajut",
                "price" => 95000,
                "image" => "/produk/dompet rajut/dompet-rajut-1.jpeg",
                "badge" => "NEW",
                "category" => "Tas",
                "rating" => 4.7,
                "reviews" => 32,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gantungan Kunci",
                "price" => 15000,
                "image" => "/produk/gantungan kunci/gantungan-kunci-1.jpeg",
                "badge" => "NEW",
                "category" => "Aksesori",
                "rating" => 4.5,
                "reviews" => 64,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gantungan Kunci Bunga",
                "price" => 20000,
                "image" => "/produk/gantungan kunci bunga/gantungan-kunci-bunga-1.jpeg",
                "badge" => "NEW",
                "category" => "Aksesori",
                "rating" => 4.7,
                "reviews" => 41,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gantungan Kunci Rajut",
                "price" => 25000,
                "image" => "/produk/gantungan kunci rajut/gantungan-kunci-rajut-1.jpeg",
                "badge" => "NEW",
                "category" => "Aksesori",
                "rating" => 4.8,
                "reviews" => 27,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gelang",
                "price" => 35000,
                "image" => "/produk/gelang/gelang-1.jpeg",
                "badge" => "NEW",
                "category" => "Perhiasan",
                "rating" => 4.6,
                "reviews" => 22,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gelang Manik Manik",
                "price" => 40000,
                "image" => "/produk/gelang manik manik/gelang-manik-manik-2.jpeg",
                "badge" => "NEW",
                "category" => "Perhiasan",
                "rating" => 4.9,
                "reviews" => 36,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Gelang Tali",
                "price" => 30000,
                "image" => "/produk/gelang tali/gelang-tali-1.jpeg",
                "badge" => "NEW",
                "category" => "Perhiasan",
                "rating" => 4.5,
                "reviews" => 19,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Kalung",
                "price" => 75000,
                "image" => "/produk/kalung/kalung-1.jpeg",
                "badge" => "NEW",
                "category" => "Perhiasan",
                "rating" => 4.8,
                "reviews" => 28,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Tas Hobo",
                "price" => 180000,
                "image" => "/produk/tas hobo/tas-hobo-1.jpeg",
                "badge" => "NEW",
                "category" => "Tas",
                "rating" => 4.7,
                "reviews" => 15,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Tas Pita Rajut",
                "price" => 220000,
                "image" => "/produk/tas pita rajut/tas-pita-rajut-1.jpeg",
                "badge" => "NEW",
                "category" => "Tas",
                "rating" => 4.9,
                "reviews" => 12,
                "in_stock" => true,
                "stock" => 10,
            ],
            [
                "name" => "Topi Bunga Rajut",
                "price" => 120000,
                "image" => "/produk/topi bunga rajut/topi-bunga-rajut-1.jpeg",
                "badge" => "NEW",
                "category" => "Pakaian",
                "rating" => 4.7,
                "reviews" => 21,
                "in_stock" => true,
                "stock" => 10,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                ...$product,
                'created_by' => 1,
            ]);
        }
    }
}