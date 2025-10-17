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
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Basic, Standard, Premium
            $table->string('slug')->unique(); // basic, standard, premium
            $table->decimal('price', 10, 2); // Price amount
            $table->string('currency', 10)->default('UGX'); // Currency code
            $table->string('badge')->nullable(); // "Most Popular", "Retail Focused", etc.
            $table->json('features'); // Array of features
            $table->string('color')->nullable(); // Color class for UI
            $table->boolean('is_highlighted')->default(false); // For featured plan
            $table->boolean('is_active')->default(true); // Enable/disable plans
            $table->integer('sort_order')->default(0); // Display order
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
