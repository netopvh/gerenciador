<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PaymentMethod::insert([
            [
                'name' => 'DINHEIRO'
            ],
            [
                'name' => 'BOLETO'
            ],
            [
                'name' => 'CARTÃO DE DÉBITO'
            ],
            [
                'name' => 'CARTÃO DE CRÉDITO'
            ],
            [
                'name' => 'TRANSFERÊNCIA'
            ],
            [
                'name' => 'PIX'
            ],
        ]);
    }
}
