<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Vehicle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        $nomes = ['Carro', 'Moto', 'Caminhão', 'SUV', 'Picape'];
        foreach ($nomes as $nome) {
            Category::create(['name' => $nome]);
        }
        Vehicle::factory()->count(20)->create();


        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignPermission('admin');
    }
}
