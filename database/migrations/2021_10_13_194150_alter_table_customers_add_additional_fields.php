<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCustomersAddAdditionalFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('cod')->nullable()->default(null)->after('id');
            $table->enum('status',['A','I','P','B'])->default('A')->after('cpfcnpj');
            $table->string('address')->nullable()->default(null)->after('status');
            $table->string('number', 10)->nullable()->default(null)->after('address');
            $table->string('district')->nullable()->default(null)->after('number');
            $table->string('complement')->nullable()->default(null)->after('district');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
