<?php

namespace App\Providers;

use App\Repositories\Admin\AdminRepository;
use App\Repositories\Admin\AdminRepositoryInterface;
use App\Repositories\Eav\EavRepository;
use App\Repositories\Eav\EavRepositoryInterface;
use App\Repositories\SocialAccount\SocialAccountRepository;
use App\Repositories\SocialAccount\SocialAccountRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->bind(
            SocialAccountRepositoryInterface::class,
            SocialAccountRepository::class
        );
        $this->app->bind(
            EavRepositoryInterface::class,
            EavRepository::class
        );
        $this->app->bind(
            AdminRepositoryInterface::class,
            AdminRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void {
        //
    }
}
