<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * AuthController
 */
class ResetPasswordController extends Controller {
    use ResetsPasswords;

    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function setNewPassword(Request $request): JsonResponse {
        try {
            if (empty($request->get('token'))) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'INVALID_TOKEN'
                ], 400);
            }

            if (empty($request->get('password')) && empty($request->get('password_confirmation'))) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'EMPTY_PASSWORD'
                ], 400);
            }

            if ($request->get('password') != $request->get('password_confirmation')) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'INVALID_PASSWORD'
                ], 400);
            }

            $response = $this->broker()->reset(
                $this->credentials($request), function ($user, $password) {
                    $this->resetPassword($user, $password);
                }
            );

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
