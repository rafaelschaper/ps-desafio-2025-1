<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nome_veiculo = [
            'Corolla',
            'Onix',
            'Celta',
            'Fazer 150cc',
            'Hilux'
        ];

        return [
            'name' => fake()->randomElement($nome_veiculo),
            'brand' => fake()->name(),
            'year' => fake()->year(),
            'image' => 'https://picsum.photos/'.rand(500, 300),
            'quantity' => fake()->randomNumber(3),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
