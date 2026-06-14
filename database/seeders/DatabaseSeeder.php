<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'type' => 'admin',
        ]);

        User::create([
            'name' => 'joy',
            'email' => 'joy@gmail.com',
            'password' => bcrypt('joy'),
            'type' => 'customer',
        ]);

        $this->call([
            ProductSeeder::class,
            WorkshopSeeder::class,
        ]);
    }
}
