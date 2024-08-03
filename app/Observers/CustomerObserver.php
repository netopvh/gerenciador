<?php

namespace App\Observers;

use App\Models\Customer;

class CustomerObserver
{

    /**
     * Handle the post "saving" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function saving(Customer $customer)
    {
        $newPhone = preg_replace('/[^0-9]/','', $customer->mobile);
        $customer->mobile = $newPhone;
        $customer->cpfcnpj = preg_replace('/[^0-9]/','', $customer->cpfcnpj);
    }

    /**
     * Handle the Customer "created" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function created(Customer $customer)
    {
        //
    }

    /**
     * Handle the Customer "updated" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function updated(Customer $customer)
    {
        //
    }

    /**
     * Handle the Customer "deleted" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function deleted(Customer $customer)
    {
        //
    }

    /**
     * Handle the Customer "restored" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function restored(Customer $customer)
    {
        //
    }

    /**
     * Handle the Customer "force deleted" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function forceDeleted(Customer $customer)
    {
        //
    }
}
