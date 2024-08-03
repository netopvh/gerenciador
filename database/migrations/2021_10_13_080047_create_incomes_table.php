<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncomesTable extends Migration
{
    /*id: number;
    due_date: string;
    cod: string;
    customer: string;
    receive: string;
    received: string;
    payment_method: string;
    date_payment: string;
    obs: string;*/

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('payment_method_id')->nullable();
            $table->date('due_date');
            $table->decimal('receive',10,2);
            $table->integer('parcels')->nullable();
            $table->decimal('received',10,2)->nullable()->default(null);
            $table->text('obs')->nullable()->default(null);
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incomes');
    }
}
