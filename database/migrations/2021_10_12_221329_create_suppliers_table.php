<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //'doc', 'category_id', 'qtd', 'payable'
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cpf_cnpj')->nullable()->default('');
            $table->string('email')->nullable()->default('');
            $table->string('mobile')->nullable()->default('');
            $table->string('address')->nullable()->default('');
            $table->string('number', 10)->nullable()->default(null)->default('');
            $table->string('district')->nullable()->default(null)->default('');
            $table->string('complement')->nullable()->default(null)->default('');
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
        Schema::dropIfExists('suppliers');
    }
}
