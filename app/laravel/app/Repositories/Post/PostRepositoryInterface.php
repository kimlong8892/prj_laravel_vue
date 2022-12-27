<?php

namespace App\Repositories\Post;

interface PostRepositoryInterface {
    public function getAll($search = null, $page = 1, $perPage = 10);
    public function getDetail($id);

    public function update($id, $data);
}
