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
        Schema::create('subscription_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('company')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Who made the payment
            $table->foreignId('pricing_plan_id')->nullable()->constrained('pricing_plans')->onDelete('set null');
            
            // Plan details at time of payment
            $table->string('plan_name');
            $table->enum('plan_type', ['basic', 'standard', 'premium']);
            
            // Payment details
            $table->decimal('amount', 10, 2);
            $table->string('currency', 10)->default('UGX');
            $table->string('transaction_reference')->nullable(); // FlutterWave transaction ref
            $table->string('payment_method')->nullable(); // card, mobile_money, etc.
            $table->enum('status', ['pending', 'completed', 'failed'])->default('completed');
            
            // Subscription period
            $table->dateTime('subscription_start');
            $table->dateTime('subscription_end');
            
            // Additional info
            $table->text('payment_details')->nullable(); // JSON for additional FlutterWave response
            $table->string('receipt_number')->unique(); // Unique receipt number
            
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index('company_id');
            $table->index('payment_method');
            $table->index('created_at');
            $table->index('receipt_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_payments');
    }
};
