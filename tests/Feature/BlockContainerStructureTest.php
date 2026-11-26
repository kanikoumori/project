<?php

namespace Tests\Feature;

use App\Models\Block;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlockContainerStructureTest extends TestCase
{
    use RefreshDatabase;

    public function test_nested_blocks_can_be_saved_and_deleted(): void
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

        // ページ直下のコンテナ
        $outer = Block::create([
            'page_id' => $page->id,
            'parent_id' => null,
            'type' => 'container',
            'data' => [],
            'settings' => [
                'direction' => 'row',
                'gap' => 16,
            ],
            'sort_order' => 0,
        ]);

        // コンテナ内の子コンテナ
        $inner = Block::create([
            'page_id' => $page->id,
            'parent_id' => $outer->id,
            'type' => 'container',
            'data' => [],
            'settings' => ['direction' => 'column'],
            'sort_order' => 0,
        ]);

        // 子コンテナ内のテキスト
        $text = Block::create([
            'page_id' => $page->id,
            'parent_id' => $inner->id,
            'type' => 'text',
            'data' => ['content' => '入れ子テスト'],
            'sort_order' => 0,
        ]);

        // 親子関係と設定を確認
        $this->assertNull($outer->parent_id);
        $this->assertTrue($inner->parent->is($outer));
        $this->assertTrue($text->parent->is($inner));

        $this->assertSame(
            [$inner->id],
            $outer->children->pluck('id')->all()
        );

        $this->assertSame(
            ['direction' => 'row', 'gap' => 16],
            $outer->fresh()->settings
        );

        // 親コンテナ削除時の子孫ブロック削除を確認
        $outer->delete();

        $this->assertDatabaseMissing('blocks', ['id' => $outer->id]);
        $this->assertDatabaseMissing('blocks', ['id' => $inner->id]);
        $this->assertDatabaseMissing('blocks', ['id' => $text->id]);
    }

    public function test_bulk_save_creates_container_with_child(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'テストサイト',
            'slug' => 'container-save-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'container-save-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'clientKey' => 'container-a',
                        'type' => 'container',
                        'data' => [],
                        'settings' => [
                            'direction' => 'row',
                            'gap' => 16,
                        ],
                        'sortOrder' => 0,
                    ],
                    [
                        'clientKey' => 'text-a',
                        'parentClientKey' => 'container-a',
                        'type' => 'text',
                        'data' => [
                            'content' => 'コンテナ内の文章',
                        ],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        $response->assertOk();

        $containerId = $response->json('blockIds.0');
        $textId = $response->json('blockIds.1');

        // 子ブロックがコンテナに所属している
        $this->assertDatabaseHas('blocks', [
            'id' => $textId,
            'page_id' => $page->id,
            'parent_id' => $containerId,
        ]);

        // コンテナ設定が保存されている
        $this->assertSame(
            ['direction' => 'row', 'gap' => 16],
            Block::findOrFail($containerId)->settings
        );

        // ページ直下のコンテナである
        $this->assertNull(
            Block::findOrFail($containerId)->parent_id
        );
    }

    public function test_bulk_save_rejects_circular_containers(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => '循環参照テスト',
            'slug' => 'cycle-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'cycle-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'clientKey' => 'container-a',
                        'parentClientKey' => 'container-b',
                        'type' => 'container',
                        'data' => [],
                        'sortOrder' => 0,
                    ],
                    [
                        'clientKey' => 'container-b',
                        'parentClientKey' => 'container-a',
                        'type' => 'container',
                        'data' => [],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        // 循環する親子関係を拒否する
        $response->assertUnprocessable();

        // 不正な構造がDBに保存されていない
        $this->assertSame(0, $page->blocks()->count());
    }

    public function test_bulk_save_rejects_unknown_parent(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => '親コンテナ検証',
            'slug' => 'parent-validation-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'parent-validation-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $existingBlock = Block::create([
            'page_id' => $page->id,
            'type' => 'text',
            'data' => ['content' => '変更前'],
            'sort_order' => 0,
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'id' => $existingBlock->id,
                        'clientKey' => 'text-a',
                        'parentClientKey' => 'unknown-container',
                        'type' => 'text',
                        'data' => ['content' => '変更後'],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        // 保存対象に存在しない親コンテナを拒否
        $response->assertUnprocessable();

        // 既存ブロックの内容が変更されない
        $this->assertSame(
            '変更前',
            $existingBlock->fresh()->data['content']
        );

        // 親子関係も変更されない
        $this->assertNull(
            $existingBlock->fresh()->parent_id
        );

        // ブロック数も変わらない
        $this->assertSame(1, $page->blocks()->count());
    }

    public function test_bulk_save_rejects_non_container_parent(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => '親ブロック検証',
            'slug' => 'non-container-parent-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'non-container-parent-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'clientKey' => 'text-a',
                        'type' => 'text',
                        'data' => ['content' => '親にできないブロック'],
                        'sortOrder' => 0,
                    ],
                    [
                        'clientKey' => 'text-b',
                        'parentClientKey' => 'text-a',
                        'type' => 'text',
                        'data' => ['content' => '子ブロック'],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        // コンテナ以外を親に指定した場合は拒否
        $response->assertUnprocessable();

        // 不正なブロックが保存されていない
        $this->assertSame(0, $page->blocks()->count());
    }

    public function test_bulk_save_preserves_existing_container_and_child_ids(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'コンテナ更新テスト',
            'slug' => 'container-update-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'container-update-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $container = Block::create([
            'page_id' => $page->id,
            'type' => 'container',
            'data' => [],
            'settings' => ['direction' => 'column'],
            'sort_order' => 0,
        ]);

        $text = Block::create([
            'page_id' => $page->id,
            'parent_id' => $container->id,
            'type' => 'text',
            'data' => ['content' => '変更前'],
            'sort_order' => 0,
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'id' => $container->id,
                        'clientKey' => 'container-a',
                        'type' => 'container',
                        'data' => [],
                        'settings' => [
                            'direction' => 'row',
                            'gap' => 16,
                        ],
                        'sortOrder' => 0,
                    ],
                    [
                        'id' => $text->id,
                        'clientKey' => 'text-a',
                        'parentClientKey' => 'container-a',
                        'type' => 'text',
                        'data' => ['content' => '変更後'],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        $response->assertOk();

        // 保存後もIDが変更されない
        $this->assertSame(
            [$container->id, $text->id],
            $response->json('blockIds')
        );

        // 子ブロックの親子関係が維持される
        $this->assertSame(
            $container->id,
            $text->fresh()->parent_id
        );

        // 編集した内容が保存される
        $this->assertSame(
            '変更後',
            $text->fresh()->data['content']
        );

        // コンテナ設定が更新される
        $this->assertSame(
            ['direction' => 'row', 'gap' => 16],
            $container->fresh()->settings
        );

        // 不要なブロックが増加しない
        $this->assertSame(2, $page->blocks()->count());
    }

    public function test_bulk_save_accepts_child_before_parent(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => '保存順序テスト',
            'slug' => 'block-order-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'block-order-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    // 子ブロックを先に送信
                    [
                        'clientKey' => 'text-a',
                        'parentClientKey' => 'container-a',
                        'type' => 'text',
                        'data' => [
                            'content' => '先に送信したテキスト',
                        ],
                        'sortOrder' => 0,
                    ],
                    // 親コンテナを後から送信
                    [
                        'clientKey' => 'container-a',
                        'type' => 'container',
                        'data' => [],
                        'settings' => [
                            'direction' => 'row',
                            'gap' => 16,
                        ],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        $response->assertOk();

        $textId = $response->json('blockIds.0');
        $containerId = $response->json('blockIds.1');

        // 子ブロックの親IDが正しい
        $this->assertSame(
            $containerId,
            Block::findOrFail($textId)->parent_id
        );

        // 親コンテナはページ直下
        $this->assertNull(
            Block::findOrFail($containerId)->parent_id
        );

        // ブロックが重複していない
        $this->assertSame(2, $page->blocks()->count());

        // 親から子ブロックを取得できる
        $this->assertSame(
            [$textId],
            Block::findOrFail($containerId)
                ->children
                ->pluck('id')
                ->all()
        );
    }

    public function test_bulk_save_moves_block_between_containers(): void
    {
        $owner = User::factory()->create();

        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'コンテナ移動テスト',
            'slug' => 'container-move-test',
            'status' => 'draft',
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'container-move-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);

        $containerA = Block::create([
            'page_id' => $page->id,
            'type' => 'container',
            'data' => [],
            'sort_order' => 0,
        ]);

        $containerB = Block::create([
            'page_id' => $page->id,
            'type' => 'container',
            'data' => [],
            'sort_order' => 1,
        ]);

        $text = Block::create([
            'page_id' => $page->id,
            'parent_id' => $containerA->id,
            'type' => 'text',
            'data' => ['content' => '移動するテキスト'],
            'sort_order' => 0,
        ]);

        $response = $this->actingAs($owner)->postJson(
            "/pages/{$page->id}/blocks/bulk",
            [
                'blocks' => [
                    [
                        'id' => $containerA->id,
                        'clientKey' => 'container-a',
                        'type' => 'container',
                        'data' => [],
                        'sortOrder' => 0,
                    ],
                    [
                        'id' => $containerB->id,
                        'clientKey' => 'container-b',
                        'type' => 'container',
                        'data' => [],
                        'sortOrder' => 1,
                    ],
                    [
                        'id' => $text->id,
                        'clientKey' => 'text-a',
                        'parentClientKey' => 'container-b',
                        'type' => 'text',
                        'data' => ['content' => '移動するテキスト'],
                        'sortOrder' => 0,
                    ],
                ],
            ]
        );

        $response->assertOk();

        // 移動しても既存IDを維持する
        $this->assertSame(
            [$containerA->id, $containerB->id, $text->id],
            $response->json('blockIds')
        );

        // テキストの親がコンテナBに変更される
        $this->assertSame(
            $containerB->id,
            $text->fresh()->parent_id
        );

        // コンテナAには子ブロックが残らない
        $this->assertSame(
            0,
            $containerA->children()->count()
        );

        // コンテナBからテキストを取得できる
        $this->assertSame(
            [$text->id],
            $containerB->children()->pluck('id')->all()
        );

        // テキスト内容とブロック数を維持する
        $this->assertSame(
            '移動するテキスト',
            $text->fresh()->data['content']
        );

        $this->assertSame(3, $page->blocks()->count());
    }
}
