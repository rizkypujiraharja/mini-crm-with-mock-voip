<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Company;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        Company::truncate();
        Contact::truncate();

        for ($i=0; $i < 10; $i++) {
            \App\Models\User::factory()->create([
                'email' => "user_$i@example.com",
            ]);
        }

        Company::factory(20)->create();
        Contact::factory(100)->create();
    }
}
