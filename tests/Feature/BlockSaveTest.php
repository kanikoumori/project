<?php

namespace Tests\Feature;

use App\Models\Block;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlockSaveTest extends TestCase
{
    use RefreshDatabase;

    public function test_bulk_save_preserves_existing_block_id(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'テストサイト',
            'slug' => 'test-site',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'test-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $block = Block::create([
            'page_id' => $page->id,
            'type' => 'heading',
            'data' => ['text' => '変更前の見出し'],
            'sort_order' => 0,
        ]);

        $originalId = $block->id;

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'id' => $originalId,
                        'type' => 'heading',
                        'data' => [
                            'text' => '更新後の見出し',
                        ],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        $response->assertOk();

        $this->assertSame(1, $page->blocks()->count());

        $savedBlock = $page->blocks()->first();

        $this->assertSame($originalId, $savedBlock->id);
        $this->assertSame(
            '更新後の見出し',
            $savedBlock->data['text']
        );
    }

public function test_deleted_block_can_be_created_again(): void
{
    $owner = User::factory()->create();

    $site = Site::create([
        'user_id' => $owner->id,
        'title' => 'テストサイト',
        'slug' => 'test-site',
        'status' => 'draft',
    ]);

    $page = Page::create([
        'site_id' => $site->id,
        'title' => 'テストページ',
        'slug' => 'test-page',
        'sort_order' => 0,
        'is_home' => true,
        'status' => 'draft',
    ]);

    $block = Block::create([
        'page_id' => $page->id,
        'type' => 'heading',
        'data' => ['content' => '見出し'],
        'sort_order' => 0,
    ]);

    $originalId = $block->id;

    // ブロックを削除して保存
    $this->actingAs($owner)
        ->postJson("/pages/{$page->id}/blocks/bulk", [
            'blocks' => [],
        ])
        ->assertOk();

    $this->assertDatabaseMissing('blocks', [
        'id' => $originalId,
    ]);

    // Undoで復元した状態を想定し、IDなしで再登録
    $response = $this->actingAs($owner)
        ->postJson("/pages/{$page->id}/blocks/bulk", [
            'blocks' => [
                [
                    'type' => 'heading',
                    'data' => ['content' => '見出し'],
                    'sortOrder' => 0,
                ],
            ],
        ]);

    $response->assertOk();

    $newId = $response->json('blockIds.0');

    $this->assertNotEquals($originalId, $newId);
    $this->assertSame(1, $page->blocks()->count());

    $this->assertDatabaseHas('blocks', [
        'id' => $newId,
        'page_id' => $page->id,
        'type' => 'heading',
    ]);
}

    public function test_bulk_save_rejects_other_page_block_and_rolls_back(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'テストサイト',
            'slug' => 'test-site',
            'status' => 'draft',
        ]);

        $pageA = Page::create([
            'site_id' => $site->id,
            'title' => 'ページA',
            'slug' => 'page-a',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $pageB = Page::create([
            'site_id' => $site->id,
            'title' => 'ページB',
            'slug' => 'page-b',
            'sort_order' => 1,
            'is_home' => false,
            'status' => 'draft',
        ]);

        $blockA = Block::create([
            'page_id' => $pageA->id,
            'type' => 'heading',
            'data' => ['content' => '変更前A'],
            'sort_order' => 0,
        ]);

        $blockB = Block::create([
            'page_id' => $pageB->id,
            'type' => 'heading',
            'data' => ['content' => '変更前B'],
            'sort_order' => 0,
        ]);

        // ページAの更新に、ページBのブロックIDを混入させる
        $response = $this->actingAs($owner)->postJson(
            "/pages/{$pageA->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'id' => $blockA->id,
                        'type' => 'heading',
                        'data' => ['content' => '変更後A'],
                        'sortOrder' => 0,
                    ],
                    [
                        'id' => $blockB->id,
                        'type' => 'heading',
                        'data' => ['content' => '不正な変更'],
                        'sortOrder' => 1,
                    ],
                ],
            ]
        );

        // 別ページのIDを指定した保存は失敗する
        $response->assertNotFound();

        // 途中で行われたページAの更新も取り消される
        $this->assertSame(
            '変更前A',
            $blockA->fresh()->data['content']
        );

        // ページBのデータも変更されない
        $this->assertSame(
            '変更前B',
            $blockB->fresh()->data['content']
        );

        // ブロックが消失・増加していない
        $this->assertSame(2, Block::count());
    }


}
