<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeedPost extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void {
        $adminId = Admin::first()->id ?? null;

        if (!empty($adminId)) {
            for ($i = 1; $i <= 100; ++$i) {
                DB::table('posts')
                    ->insertOrIgnore([
                        'admin_id' => $adminId,
                        'name' => 'Name ' . $i,
                        'content' => 'test content ' . $i
                ]);
            }
        }
    }
}
