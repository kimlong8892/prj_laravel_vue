<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

/**
 * AuthController
 */
class AuthController extends Controller {
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse {
        try {
            $email = $request->get('email') ?? null;
            $password = $request->get('password') ?? null;
            $expiresAt = Carbon::now()->addMinutes(config('sanctum.expiration'));

            if (empty($email) || empty($password)) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'EMPTY_EMAIL_OR_PASSWORD',
                ], 400);
            }

            $tokenResult = $this->userRepository->getTokenUser($email, $password, $expiresAt);

            if (empty($tokenResult)) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'INVALID_EMAIL_OR_PASSWORD'
                ], 400);
            }
            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'success',
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'expires_at' => $expiresAt->setTimezone('UTC'),
                'data' => User::where('email', $email)->first()
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
                'code_error' => 'SERVER_ERROR'
            ], 500);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse {
        try {
            if (!$this->userRepository->removeTokenUser($request->bearerToken())) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'INVALID_TOKEN'
                ], 401);
            }

            return response()->json([
                'success' => true,
                'message' => 'success'
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
                'code_error' => 'SERVER_ERROR'
            ], 500);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse {
        try {
            $name = $request->get('name') ?? null;
            $email = $request->get('email') ?? null;
            $password = $request->get('password') ?? null;

            if (!empty($email) && $this->userRepository->checkExistsEmail($email)) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'EMAIL_EXISTS',
                ], 400);
            }

            if (!empty($name) && !empty($email) && !empty($password)) {
                $expiresAt = Carbon::now()->addMinutes(config('sanctum.expiration'));
                $tokenResult = $this->userRepository->registerUserToken($name, $email, $password, $expiresAt);

                return response()->json([
                    'success' => true,
                    'access_token' => $tokenResult,
                    'token_type' => 'Bearer',
                    'expires_at' => $expiresAt->setTimezone('UTC')
                ]);
            }

            return response()->json([
                'success' => false,
                'code_error' => 'EMPTY_NAME_OR_EMAIL_PASSWORD',
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
