<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SeedAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insertOrIgnore([
            'name' => 'admin',
            'email' => 'kenhcongnghe.com@gmail.com',
            'password' => Hash::make(123)
        ]);
    }
}
