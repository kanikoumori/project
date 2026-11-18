<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('background_color', 7)
                ->default('#ffffff');

            $table->string('background_image')
                ->nullable();

            $table->string('background_size', 20)
                ->default('cover');

            $table->string('background_position', 20)
                ->default('center');

            $table->string('background_repeat', 20)
                ->default('no-repeat');
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn([
                'background_color',
                'background_image',
                'background_size',
                'background_position',
                'background_repeat',
            ]);
        });
    }
};