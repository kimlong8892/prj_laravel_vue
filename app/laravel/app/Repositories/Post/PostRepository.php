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
            })->count();

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

    public function getDetail($id) {
        return Post::find($id);
    }

    public function update($id, $data): int {
        $post = Post::find($id);
        $post->fill($data);

        if (!empty($data['image'])) {
            $this->uploadOrAddImage($data['image'], $post);
        }

        $post->save();

        return $post->getAttribute('id');
    }

    public function store($data): int {
        $post = new Post();
        $post->fill($data);
        $post->save();

        if (!empty($data['image'])) {
            $this->uploadOrAddImage($data['image'], $post);
        }

        $post->save();

        return $post->getAttribute('id');
    }

    private function uploadOrAddImage($imageFile, &$post) {
        $imagePath = 'post_images/' . $post->getAttribute('id');
        $imageUrl = uploadImage($imageFile, 'avatar', $imagePath);
        $post->setAttribute('image', $imageUrl);
    }
}
