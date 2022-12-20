<?php

namespace App\Repositories\User;

interface UserRepositoryInterface {
    public function getList();

    public function checkExistsEmail($email);

    public function sendEmailResetPassword($email);

    public function getTokenUser($email, $password, $expiresAt, $tokenType = 'app_auth');

    public function removeTokenUser($accessToken);

    public function registerUserToken($name, $email, $password, $expiresAt, $tokenType = 'app_auth');

    public function getUserCurrent();

    public function getUserById($id);

    public function checkExistsId($userId);
}
