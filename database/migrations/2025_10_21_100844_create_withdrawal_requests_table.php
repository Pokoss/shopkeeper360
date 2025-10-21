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
        Schema::create('withdrawal_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained('wallets')->onDelete('cascade');
            $table->foreignId('company_id')->constrained('company')->onDelete('cascade');
            $table->foreignId('payout_detail_id')->constrained('payout_details')->onDelete('restrict');
            $table->decimal('amount', 15, 2); // Requested amount
            $table->decimal('fee', 15, 2)->default(0); // Withdrawal fee
            $table->decimal('total_amount', 15, 2); // amount + fee
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->text('notes')->nullable(); // Company notes
            $table->text('admin_notes')->nullable(); // Admin notes
            $table->string('rejection_reason')->nullable();
            $table->foreignId('requested_by')->nullable()->constrained('users')->onDelete('set null'); // User who requested
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null'); // Admin who processed
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('wallet_id');
            $table->index('company_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawal_requests');
    }
};
