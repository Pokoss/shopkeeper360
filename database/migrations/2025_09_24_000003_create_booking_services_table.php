<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_services', function (Blueprint $table) {
            $table->id();

            // Make sure these match the type of the referenced tables
            $table->unsignedBigInteger('room_booking_id');
            $table->unsignedBigInteger('service_id');

            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('cost_price', 10, 2);

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('room_booking_id')
                ->references('id')
                ->on('room_bookings')
                ->onDelete('cascade');

            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_services');
    }
};
