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
        Schema::create('sms_bundles', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Starter Pack"
            $table->integer('sms_count'); // Number of SMS in bundle
            $table->decimal('price', 10, 2); // Price in UGX
            $table->text('description')->nullable(); // Bundle description
            $table->string('currency')->default('UGX');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sms_bundles');
    }
};
