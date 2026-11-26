
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blocks', function (Blueprint $table) {
            // 親コンテナのブロックID
            // NULLの場合はページ直下のブロック
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('blocks')
                ->cascadeOnDelete();

            // コンテナの配置方法や装飾設定
            $table->json('settings')
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn(['parent_id', 'settings']);
        });
    }
};
