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
        Schema::create('online_product', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id');
            $table->string('slug')->unique();
            $table->bigInteger('category_id');
            $table->string('image');
            $table->bigInteger('company_id');
            $table->bigInteger('added_by');
            $table->string('description')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('online_product');
    }
};
