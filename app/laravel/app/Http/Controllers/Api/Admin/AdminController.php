<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\AdminRepositoryInterface;
use Illuminate\Http\Request;

class AdminController extends Controller {
    protected AdminRepositoryInterface $adminRepository;

    public function __construct(AdminRepositoryInterface $adminRepository) {
        $this->adminRepository = $adminRepository;
    }

    public function getInfo(Request $request): \Illuminate\Http\JsonResponse {
        return response()->json([
            'success' => true,
            'data' => $this->adminRepository->getAdminCurrent()
        ]);
    }
}
