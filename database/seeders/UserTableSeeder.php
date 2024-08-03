<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Angelo Neto',
            'email' => 'netopvh@gmail.com',
            'password' => bcrypt('password')
        ]);

        User::create([
            'name' => 'Coelho Neto',
            'email' => 'coelhoparticular@gmail.com',
            'password' => bcrypt('10203040')
        ]);
    }
}
