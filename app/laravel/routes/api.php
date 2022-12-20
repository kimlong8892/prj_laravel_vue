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

Route::prefix('user')->group(function () {
    Route::post('login', [\App\Http\Controllers\Api\Auth\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\Api\Auth\AuthController::class, 'register']);
    Route::post('forgot-password', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendCodeResetPassword']);
    Route::post('reset-password', [\App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'setNewPassword']);
});

Route::prefix('admin')->group(function () {
    Route::post('login', [\App\Http\Controllers\Api\Admin\Auth\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\Api\Admin\Auth\AuthController::class, 'register']);
    Route::post('forgot-password', [\App\Http\Controllers\Api\Admin\Auth\ForgotPasswordController::class, 'sendCodeResetPassword']);
    Route::post('reset-password', [\App\Http\Controllers\Api\Admin\Auth\ResetPasswordController::class, 'setNewPassword']);
});
