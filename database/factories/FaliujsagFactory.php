<?php

namespace Database\Factories;

use App\Models\Alkalmazott;
use Illuminate\Database\Eloquent\Factories\Factory;

class FaliujsagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $alkalmazottak = Alkalmazott::all();
        return [
            'dolgozoi_azon' => $alkalmazottak->random()->dolgozoi_azon, 
            'mikor' => $this->faker->dateTimeBetween('-1 week'), 
            'cim' => $this->faker->sentence(4), 
            'tartalom' => $this->faker->text(40),
        ];
    }
}
