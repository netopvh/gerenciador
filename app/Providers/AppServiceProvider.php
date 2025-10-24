<?php

namespace App\Providers;

use App\Models\Customer;
use App\Observers\CustomerObserver;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;

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

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

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
