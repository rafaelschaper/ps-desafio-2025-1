<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // $nome_categoria = [
        //     'Carro',
        //     'Moto',
        //     'Caminhão',
        //     'SUV',
        //     'Picape'
        // ];
        // return [
        //     'name' => fake()->unique()->randomElement($nome_categoria)
        // ];
    }
}
