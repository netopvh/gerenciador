<?php

namespace App\Providers;

use App\Models\Customer;
use App\Observers\CustomerObserver;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Inertia::share([
            'success' => function () {
                return session('success');
            },
            'error' => function () {
                return session('error');
            }
        ]);
    }
}
