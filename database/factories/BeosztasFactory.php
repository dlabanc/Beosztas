<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BeosztasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'beo_azonosito' => '', 
            'napim_azonosito' => '', 
            'alkalmazott' => ''
        ];
    }
}
