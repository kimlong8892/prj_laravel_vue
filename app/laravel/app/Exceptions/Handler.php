<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register(): void {
        $this->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            Log::error($e->getMessage());
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'code_error' => 'NOT_AUTHENTICATED'
                ], 401);
            }

            return $this;
        });
    }

    public function render($request, Throwable $e) {
        if ($request->is('api/*')) {
            $response = [
                'success' => false,
                'mgs' => $e->getMessage(),
                'code_error' => 'SERVER_ERROR'
            ];

            $status = 400;

            if ($this->isHttpException($e)) {
                $status = $e->getStatusCode();
            }


            Log::error($e->getMessage());

            if ($status === 404) {
                $response['mgs'] = 'NOT_FOUND';
                $response['code_error'] = 'NOT_FOUND';
            }

            return response()->json($response, $status);
        }

        return parent::render($request, $e);
    }
}
