<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::dropIfExists('room_bookings');
        Schema::dropIfExists('rooms');
    }

    public function down()
    {
        // No need to recreate tables in down() as they will be created by other migrations
    }
};
