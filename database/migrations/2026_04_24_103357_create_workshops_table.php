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
        Schema::create('workshops', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('price');

            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->string('badge')->nullable();

            $table->date('date');
            $table->string('time');
            $table->string('location');

            $table->integer('spots_total')->default(0);
            $table->integer('spots_left')->default(0);

            $table->float('rating')->default(0);
            $table->integer('reviews')->default(0);

            $table->string('difficulty')->default('Pemula');
            $table->json('includes')->nullable();

            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshops');
    }
};
