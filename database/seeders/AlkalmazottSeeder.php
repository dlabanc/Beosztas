<?php

namespace Database\Seeders;

use App\Models\Alkalmazott;
use Illuminate\Database\Seeder;

class AlkalmazottSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Alkalmazott::factory(10)->create();
    }
}
