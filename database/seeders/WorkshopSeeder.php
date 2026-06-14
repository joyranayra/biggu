<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workshop;

class WorkshopSeeder extends Seeder
{
    public function run(): void
    {
        $workshops = [
            [
                "name" => "Workshop Thanks Voold",
                "description" => "Workshop Thanks Voold",
                "price" => 150000,
                "image" => "/workshop_image/thanks-voold.jpeg",
                "badge" => "POPULAR",
                "category" => "Beading",
                "date" => "2026-04-20",
                "time" => "10:00 - 13:00",
                "location" => "Studio Biggu Lab",
                "spots_total" => 12,
                "spots_left" => 4,
                "rating" => 4.9,
                "reviews" => 28,
                "difficulty" => "Pemula",
                "includes" => ["Bahan", "Snack", "Sertifikat"],
            ],
            [
                "name" => "Workshop beramai-ramai",
                "description" => "Workshop beramai-ramai",
                "price" => 150000,
                "image" => "/workshop_image/beramai-ramai.jpeg",
                "badge" => "POPULAR",
                "category" => "Beading",
                "date" => "2026-04-20",
                "time" => "10:00 - 13:00",
                "location" => "Studio Biggu Lab",
                "spots_total" => 12,
                "spots_left" => 4,
                "rating" => 4.9,
                "reviews" => 28,
                "difficulty" => "Pemula",
                "includes" => ["Bahan", "Snack", "Sertifikat"],
            ],
            [
                "name" => "Workshop ber-karya",
                "description" => "Workshop ber-karya",
                "price" => 150000,
                "image" => "/workshop_image/ber-karya.jpeg",
                "badge" => "POPULAR",
                "category" => "Beading",
                "date" => "2026-04-20",
                "time" => "10:00 - 13:00",
                "location" => "Studio Biggu Lab",
                "spots_total" => 12,
                "spots_left" => 4,
                "rating" => 4.9,
                "reviews" => 28,
                "difficulty" => "Pemula",
                "includes" => ["Bahan", "Snack", "Sertifikat"],
            ],
            [
                "name" => "Workshop biggu-1",
                "description" => "Workshop biggu-1",
                "price" => 150000,
                "image" => "/workshop_image/biggu-1.jpeg",
                "badge" => "POPULAR",
                "category" => "Beading",
                "date" => "2026-04-20",
                "time" => "10:00 - 13:00",
                "location" => "Studio Biggu Lab",
                "spots_total" => 12,
                "spots_left" => 4,
                "rating" => 4.9,
                "reviews" => 28,
                "difficulty" => "Pemula",
                "includes" => ["Bahan", "Snack", "Sertifikat"],
            ],
            [
                "name" => "Workshop bead-keychain-workshop",
                "description" => "Workshop bead-keychain-workshop",
                "price" => 150000,
                "image" => "/workshop_image/bead-keychain-workshop.jpeg",
                "badge" => "POPULAR",
                "category" => "Beading",
                "date" => "2026-04-20",
                "time" => "10:00 - 13:00",
                "location" => "Studio Biggu Lab",
                "spots_total" => 12,
                "spots_left" => 4,
                "rating" => 4.9,
                "reviews" => 28,
                "difficulty" => "Pemula",
                "includes" => ["Bahan", "Snack", "Sertifikat"],
            ],
        ];

        foreach ($workshops as $workshop) {
            Workshop::create([
                ...$workshop,
                'created_by' => 1,
            ]);
        }
    }
}