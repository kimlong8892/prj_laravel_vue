<?php

namespace App\Repositories\Post;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostRepository implements PostRepositoryInterface {
    public function getAll($search = null, $page = 1, $perPage = 10): \Illuminate\Database\Eloquent\Collection|array {
        $totalRow = DB::table('posts')
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('name', 'like', '%' . $search . '%');
                }
            })
            ->count();

        return [
            'list_post' => Post::with(['admin'])
                ->where(function ($query) use ($search) {
                    if (!empty($search)) {
                        $query->where('name', 'like', '%' . $search . '%');
                    }
                })
                ->limit($perPage)
                ->offset(($page - 1) * $perPage)
                ->get(),
            'total_page' => ceil($totalRow / $perPage)
        ];
    }
}
