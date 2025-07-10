<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'company_id' => Company::first()->id,
            'phone' => fake()->phoneNumber(),
            'role' => fake()->randomElement(RoleEnum::cases()),
        ];
    }
}
