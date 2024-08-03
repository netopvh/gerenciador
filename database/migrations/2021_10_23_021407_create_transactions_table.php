<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('income_id')->nullable();
            $table->unsignedBigInteger('expense_id')->nullable();
            $table->unsignedBigInteger('payment_method_id');
            $table->decimal('received', 10, 2);
            $table->dateTime('date_payment');
            $table->char('status', 1)->nullable();
            $table->text('obs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
