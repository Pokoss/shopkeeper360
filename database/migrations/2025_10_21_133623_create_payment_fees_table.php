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
        Schema::create('payment_fees', function (Blueprint $table) {
            $table->id();
            $table->enum('fee_type', ['platform', 'gateway'])->comment('platform = your fee, gateway = Flutterwave fee');
            $table->string('name')->comment('e.g., "Platform Fee - Small", "Gateway Fee - Standard"');
            $table->decimal('min_amount', 15, 2)->default(0)->comment('Minimum amount for this tier (inclusive)');
            $table->decimal('max_amount', 15, 2)->nullable()->comment('Maximum amount for this tier (inclusive), null = no limit');
            $table->enum('calculation_type', ['fixed', 'percentage'])->comment('fixed = flat fee, percentage = % of amount');
            $table->decimal('fee_value', 10, 2)->comment('The fee amount (if fixed) or percentage value (if percentage)');
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0)->comment('Lower number = higher priority when multiple rules match');
            $table->timestamps();

            // Indexes for performance
            $table->index(['fee_type', 'is_active']);
            $table->index(['min_amount', 'max_amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_fees');
    }
};
