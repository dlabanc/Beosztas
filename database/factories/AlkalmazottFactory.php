<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlkalmazottFactory extends Factory
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
            'nev' => $this->faker->name(),
            'lakcim' => $this->faker->address(),
            'szuletesi_datum' => $this->faker->dateTimeInInterval('-40 years', '+24 years'),
            'adoazonosito' => $this->faker->numerify('##########'),
            'taj' => $this->faker->numerify('#########'),
            'elerhetoseg' => $this->faker->numerify('0630#######'),
            'email' => $this->faker->unique()->safeEmail(),
            'munkakor' => $this->faker->randomElement($munkakorok),
            'heti_oraszam' => 40,
            'munkaviszony_kezdete' => $this->faker->dateTimeBetween('-2 years'),
        ];
    }
}
