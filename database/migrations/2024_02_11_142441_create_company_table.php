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
        Schema::create('company', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('contacts')->nullable();
            $table->string('location')->nullable();
            $table->string('email')->nullable();
            $table->bigInteger('category_id')->nullable();
            $table->decimal('latitude',10, 7)->nullable();
            $table->decimal('longitude',10, 7)->nullable();
            $table->string('subscription_date')->nullable();
            $table->string('subscription_expiry')->nullable();
            $table->string('slogan')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company');
    }
};
