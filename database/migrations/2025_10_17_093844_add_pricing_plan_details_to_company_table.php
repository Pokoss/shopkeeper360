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
        Schema::table('company', function (Blueprint $table) {
            $table->unsignedBigInteger('pricing_plan_id')->nullable()->after('plan');
            $table->string('pricing_plan_name')->nullable()->after('pricing_plan_id');
            $table->decimal('pricing_plan_price', 10, 2)->nullable()->after('pricing_plan_name');
            
            $table->foreign('pricing_plan_id')->references('id')->on('pricing_plans')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company', function (Blueprint $table) {
            $table->dropForeign(['pricing_plan_id']);
            $table->dropColumn(['pricing_plan_id', 'pricing_plan_name', 'pricing_plan_price']);
        });
    }
};
