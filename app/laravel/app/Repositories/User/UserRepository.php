<?php

namespace App\Repositories\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Laravel\Sanctum\PersonalAccessToken;

class UserRepository implements UserRepositoryInterface {
    public function getList(): \Illuminate\Database\Eloquent\Collection {
        return User::all();
    }

    public function checkExistsEmail($email): bool {
        return DB::table('users')->where('email', $email)->exists();
    }

    public function sendEmailResetPassword($email) {
        Password::broker('users')->sendResetLink([
            'email' => $email
        ]);
    }

    public function getTokenUser($email, $password, $expiresAt, $tokenType = 'app_auth') {
        if (Auth::guard('web')->attempt(['email' => $email, 'password' => $password])) {
            $user = User::where('email', $email)->first();
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
        $user = new User([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        $user->save();

        return $user->createToken($tokenType, ['*'], $expiresAt)->plainTextToken;
    }

    public function getUserCurrent(): ?\Illuminate\Contracts\Auth\Authenticatable {
        return auth('sanctum')->user();
    }

    public function getUserById($id) {
        return User::find($id);
    }

    public function checkExistsId($userId): bool {
        return DB::table('users')->where('id', $userId)->exists();
    }
}
