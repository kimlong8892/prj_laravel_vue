<?php

namespace App\Repositories\Post;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostRepository implements PostRepositoryInterface {
    public function getAll($page = 1, $perPage = 10): \Illuminate\Database\Eloquent\Collection|array {
        return [
            'list_post' => Post::with(['admin'])
                ->limit($perPage)
                ->offset(($page - 1) * $perPage)
                ->get(),
            'total_page' => DB::table('posts')->count() / $perPage
        ];
    }
}
