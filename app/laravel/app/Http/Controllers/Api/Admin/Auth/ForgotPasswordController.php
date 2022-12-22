<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminForgotPasswordRequest;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;

/**
 * AuthController
 */
class ForgotPasswordController extends Controller {
    use SendsPasswordResetEmails;

    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function sendCodeResetPassword(AdminForgotPasswordRequest $request): JsonResponse {
        try {
            $email = $request->get('email') ?? null;

            if (!$this->userRepository->checkExistsEmail($email)) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'INVALID_EMAIL'
                ], 400);
            }

            DB::table('password_resets')->where('email', $email)->delete();
            $response = Password::broker('users')->sendResetLink(
                $this->credentials($request)
            );

            if ($response === 'passwords.sent') {
                return response()->json([
                    'success' => true,
                    'data' => $response
                ]);
            }

            if ($response === 'passwords.throttled') {
                return response()->json([
                    'success' => false,
                    'code_error' => 'HAVE_SEND_FIRST'
                ], 400);
            }

            return response()->json([
                'success' => false,
                'code_error' => $response
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
                'code_error' => 'SERVER_ERROR'
            ], 500);
        }
    }
}
