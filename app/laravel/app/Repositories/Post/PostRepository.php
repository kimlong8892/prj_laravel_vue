<?php

namespace App\Repositories\Post;
use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Mockery\Mock;

class PostRepository implements PostRepositoryInterface {
    public function getAll($search = null, $page = 1, $perPage = 10): \Illuminate\Database\Eloquent\Collection|array {
        $totalRow = DB::table('posts')
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('name', 'like', '%' . $search . '%');
                    $query->orWhere('content', 'like', '%' . $search . '%');
                }
            })->count();

        return [
            'list_post' => Post::with(['admin'])
                ->where(function ($query) use ($search) {
                    if (!empty($search)) {
                        $query->where('name', 'like', '%' . $search . '%');
                        $query->orWhere('content', 'like', '%' . $search . '%');
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

        if (!empty($data['image']) && $data['image'] instanceof UploadedFile) {
            $this->uploadOrAddImage($data['image'], $post);
        }

        unset($data['image']);
        $post->fill($data);
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
        if ($imageFile instanceof UploadedFile && $post instanceof Post) {
            foreach (File::glob(public_path('post_images') .  '/' . $post->getAttribute('id') . '/*') as $path) {
                File::delete($path);
            }

            $imagePath = 'post_images/' . $post->getAttribute('id');
            $imageUrl = uploadImage($imageFile, 'avatar', $imagePath);
            $post->setAttribute('image', $imageUrl);
        }
    }

    public function delete($id) {
        $post = Post::find($id);
        $post->delete();
    }
}
