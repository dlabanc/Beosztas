<?php

namespace Database\Factories;

use App\Models\Alkalmazott;
use Illuminate\Database\Eloquent\Factories\Factory;

class BejelentkezesiAdatokFactory extends Factory
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
            'user_login' => $alkalmazottak->random()->dolgozoi_azon, 
            'password' => '$2a$10$fAqCgjZ07Jgx66PXpSpHPejlZ484IbOcJ5HXt7hRYfPJau9ccEEJK'
        ];
    }
}
