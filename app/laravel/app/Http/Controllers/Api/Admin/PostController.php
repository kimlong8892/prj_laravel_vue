<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostUpdateRequest;
use App\Models\Post;
use App\Repositories\Post\PostRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller {
    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository) {
        $this->postRepository = $postRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse {
        $dataPost = $this->postRepository->getAll($request->get('search'), $request->get('page'));

        return response()->json([
            'success' => true,
            'data' => [
                'list_post' => $dataPost['list_post'] ?? [],
                'total_page' => $dataPost['total_page'] ?? 0
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse {
        $request->request->set('admin_id', auth('sanctum')->user()->id);
        $postId = $this->postRepository->store($request->toArray());

        return response()->json([
            'success' => true,
            'post_id' => $postId
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function edit(int $id): JsonResponse {
        $post = $this->postRepository->getDetail($id);

        if (empty($post)) {
            abort(404);
        }

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PostUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(PostUpdateRequest $request, int $id): JsonResponse {
        $this->postRepository->update($id, $request->only(['name', 'content']));

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        //
    }
}
