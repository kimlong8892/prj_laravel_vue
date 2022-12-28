<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['cors'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::post('login', [\App\Http\Controllers\Api\Auth\AuthController::class, 'login']);
        Route::post('register', [\App\Http\Controllers\Api\Auth\AuthController::class, 'register']);
        Route::post('forgot-password', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendCodeResetPassword']);
        Route::post('reset-password', [\App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'setNewPassword']);
    });

    Route::prefix('admin')->group(function () {
        Route::post('login', [\App\Http\Controllers\Api\Admin\Auth\AuthController::class, 'login']);
        Route::post('register', [\App\Http\Controllers\Api\Admin\Auth\AuthController::class, 'register']);
        Route::get('logout', [\App\Http\Controllers\Api\Admin\Auth\AuthController::class, 'logout']);
        Route::post('forgot-password', [\App\Http\Controllers\Api\Admin\Auth\ForgotPasswordController::class, 'sendCodeResetPassword']);
        Route::post('reset-password', [\App\Http\Controllers\Api\Admin\Auth\ResetPasswordController::class, 'setNewPassword']);

        Route::middleware(['auth:sanctum', 'auth_api.admin'])->group(function () {
            Route::get('admin', [\App\Http\Controllers\Api\Admin\AdminController::class, 'getInfo']);

            Route::resource('posts', \App\Http\Controllers\Api\Admin\PostController::class);
        });
    });

    Route::post('editor/image_upload', [\App\Http\Controllers\Api\UploadImageController::class, 'upload']);
});
