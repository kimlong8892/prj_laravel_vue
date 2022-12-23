<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminResetPasswordRequest;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

/**
 * AuthController
 */
class ResetPasswordController extends Controller {
    use ResetsPasswords;

    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function setNewPassword(AdminResetPasswordRequest $request): JsonResponse {
        try {
            $response = Password::broker('admins')->reset(
                $this->credentials($request), function ($user, $password) {
                    $this->resetPassword($user, $password);
                }
            );

            if ($response != 'passwords.reset') {
                return response()->json([
                    'success' => false,
                    'code_error' => $response
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $response
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
                'code_error' => 'SERVER_ERROR'
            ], 500);
        }
    }
}
