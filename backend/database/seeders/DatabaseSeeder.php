<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for ($i=0; $i < 10; $i++) {
            \App\Models\User::factory()->create([
                'email' => "user_$i@example.com",
            ]);
        }
    }
}
