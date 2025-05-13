<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('company', function (Blueprint $table) {
            //
            $table->enum('plan',['basic','standard','premium'])->default('premium')->after('subscription_expiry');
        });
        DB::table('company')->update(['plan' => 'premium']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company', function (Blueprint $table) {
            //
            $table->dropColumn('plan');
        });
    }
};
