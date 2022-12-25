<?php

namespace App\Repositories\Admin;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Laravel\Sanctum\PersonalAccessToken;

class AdminRepository implements AdminRepositoryInterface {
    public function getList(): \Illuminate\Database\Eloquent\Collection {
        return User::all();
    }

    public function checkExistsEmail($email): bool {
        return DB::table('admins')->where('email', $email)->exists();
    }

    public function sendEmailResetPassword($email) {
        Password::broker('admins')->sendResetLink([
            'email' => $email
        ]);
    }

    public function getTokenUser($email, $password, $expiresAt, $tokenType = 'app_auth') {
        if (Auth::guard('admin')->attempt(['email' => $email, 'password' => $password])) {
            $user = Admin::where('email', $email)->first();
            return $user->createToken($tokenType, ['*'], $expiresAt)->plainTextToken;
        }

        return null;
    }

    public function removeTokenUser($accessToken): bool {
        if (empty($accessToken)) {
            return false;
        }

        $token = PersonalAccessToken::findToken($accessToken);
        $token->delete();

        return true;
    }

    public function registerUserToken($name, $email, $password, $expiresAt, $tokenType = 'app_auth'): string {
        $admin = new Admin([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        $admin->save();

        return $admin->createToken($tokenType, ['*'], $expiresAt)->plainTextToken;
    }

    public function getAdminCurrent(): ?\Illuminate\Contracts\Auth\Authenticatable {
        return auth('sanctum')->user();
    }

    public function getAdminById($id) {
        return Admin::find($id);
    }

    public function checkExistsId($userId): bool {
        return DB::table('admins')->where('id', $userId)->exists();
    }
}
