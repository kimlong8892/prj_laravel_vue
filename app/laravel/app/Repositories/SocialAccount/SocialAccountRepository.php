<?php

namespace App\Repositories\SocialAccount;

use App\Models\SocialAccount;
use App\Models\User;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountRepository implements SocialAccountRepositoryInterface {
    public function createOrGetUser(ProviderUser $providerUser, $social) {
        $account = SocialAccount::whereProvider($social)
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        } else {
            $email = $providerUser->getEmail() ?? $providerUser->getNickname();
            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => $social
            ]);
            $user = User::whereEmail($email)->first();

            if (!$user) {

                $user = User::create([
                    'email' => $email,
                    'name' => $providerUser->getName() ?? $email,
                    'password' => '',
                ]);
            }

            $account->user()->associate($user);
            $account->save();

            return $user;
        }
    }
}
