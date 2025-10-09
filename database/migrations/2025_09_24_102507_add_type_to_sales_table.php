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
        Schema::table('sales', function (Blueprint $table) {
             $table->unsignedBigInteger('product_id')->nullable()->change();

            // Add type column: 'product' or 'room'
            $table->string('type')->default('product')->after('product_id');

            // Add room_booking_id column for room sales
            $table->unsignedBigInteger('room_booking_id')->nullable()->after('type');

            // Optional: add foreign key if you want
            $table->foreign('room_booking_id')->references('id')->on('room_bookings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['room_booking_id']);
            $table->dropColumn(['type', 'room_booking_id']);

            // Make product_id non-nullable again
            $table->unsignedBigInteger('product_id')->nullable(false)->change();
        });
    }
};
