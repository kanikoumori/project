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
        Schema::table('page_histories', function (Blueprint $table) {
            $table->unique(['page_id', 'version_number']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_histories', function (Blueprint $table) {
            $table->dropUnique(['page_id', 'version_number']);
        });
    }
};
