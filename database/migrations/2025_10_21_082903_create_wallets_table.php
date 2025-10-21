<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Company; // make sure this model exists

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('company')->onDelete('cascade');
            $table->decimal('balance', 15, 2)->default(0);
            $table->string('currency')->default('UGX');
            $table->timestamps();
        });

        // Backfill wallets for existing companies
        if (Schema::hasTable('company')) {
            Company::doesntHave('wallet')->get()->each(function ($company) {
                $company->wallet()->create([
                    'balance' => 0,
                    'currency' => 'UGX',
                ]);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
