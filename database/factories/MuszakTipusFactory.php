<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MuszakTipusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'tipus' => $this->faker->randomLetter(),
            'leiras' => $this->faker->sentence(4),
        ];
    }
}
