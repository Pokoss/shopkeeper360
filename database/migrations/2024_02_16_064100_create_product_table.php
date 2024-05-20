<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('barcode')->nullable();
            $table->bigInteger('measurement');
            $table->decimal('cost_price',14,2);
            $table->decimal('retail_price',14,2);
            $table->decimal('wholesale_price',14,2);
            $table->bigInteger('available')->nullable();
            $table->bigInteger('created_by');
            $table->bigInteger('company_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
