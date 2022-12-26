<?php

namespace App\Repositories\Post;

interface PostRepositoryInterface {
    public function getAll($page = 1, $perPage = 10);
}
