<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MunkakorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $munkakorok = ['Adminisztrátor', 'Felszolgáló', 'Konyhai kisegítő', 'Leszedő', 'Pultos', 'Szakács'];
        return [
            'megnevezes' => $this->faker->randomElement($munkakorok),
            'leiras' => $this->faker->sentence(5), 
        ];
    }
}
