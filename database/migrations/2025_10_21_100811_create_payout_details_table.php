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
        Schema::create('payout_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('company')->onDelete('cascade');
            $table->enum('type', ['mobile_money', 'bank']); // Type of payout method
            $table->string('label')->nullable(); // E.g., "My MTN", "Main Bank Account"
            
            // Mobile Money fields
            $table->string('phone_number')->nullable(); // For mobile money (07, 256, +256)
            $table->string('network')->nullable(); // MTN, Airtel, etc.
            
            // Bank fields
            $table->string('bank_name')->nullable();
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('branch')->nullable();
            
            $table->boolean('is_default')->default(false); // One default per type per company
            $table->boolean('is_verified')->default(false); // For future verification
            $table->timestamps();
            
            // Indexes
            $table->index('company_id');
            $table->index(['company_id', 'type']);
            $table->index(['company_id', 'is_default']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payout_details');
    }
};
