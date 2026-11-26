<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;
use App\Models\Block;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlockController extends Controller
{
    /**
     * ブロック一覧取得
     */
    public function index(Page $page)
    {

        $this->authorize('view', $page);
        return response()->json(
        $page->blocks()->orderBy('sort_order')->get()
    );
    }
    /**
     * ブロック作成
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'page_id' => ['required', 'exists:pages,id'],
            'type' => ['required', 'string', 'max:50'],
            'data' => ['nullable', 'array'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $page = Page::findOrFail($validated['page_id']);

        $this->authorize('update', $page);

        $block = Block::create([
            'page_id' => $validated['page_id'],
            'type' => $validated['type'],
            'data' => $validated['data'] ?? [],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return response()->json($block, 201);
    }
    /**
     * ブロック更新
     */

    public function bulkSave(Request $request, Page $page)
    {
        $this->authorize('update', $page);

        $validated = $request->validate([
            'blocks' => ['present', 'array'],
            'blocks.*.id' => ['sometimes', 'required', 'integer', 'distinct'],
            'blocks.*.clientKey' => ['sometimes', 'required', 'string', 'distinct'],
            'blocks.*.parentClientKey' => ['sometimes', 'nullable', 'string'],
            'blocks.*.type' => ['required', 'string'],
            'blocks.*.data' => ['present', 'array'],
            'blocks.*.settings' => ['sometimes', 'array'],
            'blocks.*.sortOrder' => ['required', 'integer'],
        ]);

        $blocks = $validated['blocks'];

        // clientKeyから保存データの位置を特定できるようにする
        $indicesByKey = [];

        foreach ($blocks as $index => $blockData) {
            if (isset($blockData['clientKey'])) {
                $indicesByKey[$blockData['clientKey']] = $index;
            }
        }

        // 親コンテナの存在・種類・循環参照を事前に検証
        foreach ($blocks as $index => $blockData) {
            $parentKey = $blockData['parentClientKey'] ?? null;
            $visited = [];

            while ($parentKey !== null) {
                if (isset($visited[$parentKey])) {
                    throw ValidationException::withMessages([
                        "blocks.{$index}.parentClientKey"
                            => 'コンテナの親子関係が循環しています。',
                    ]);
                }

                $visited[$parentKey] = true;

                if (!isset($indicesByKey[$parentKey])) {
                    throw ValidationException::withMessages([
                        "blocks.{$index}.parentClientKey"
                            => '親コンテナが保存対象に存在しません。',
                    ]);
                }

                $parentIndex = $indicesByKey[$parentKey];
                $parentData = $blocks[$parentIndex];

                if ($parentData['type'] !== 'container') {
                    throw ValidationException::withMessages([
                        "blocks.{$index}.parentClientKey"
                            => '親にはコンテナを指定してください。',
                    ]);
                }

                $parentKey = $parentData['parentClientKey'] ?? null;
            }
        }

        $savedIds = DB::transaction(function () use ($blocks, $page) {
            $savedIds = [];
            $idsByClientKey = [];

            // 第1段階：IDを確定する
            foreach ($blocks as $blockData) {
                $attributes = [
                    'type' => $blockData['type'],
                    'data' => $blockData['data'],
                    'sort_order' => $blockData['sortOrder'],

                    // 親子関係は第2段階で設定
                    'parent_id' => null,
                ];

                if (array_key_exists('settings', $blockData)) {
                    $attributes['settings'] = $blockData['settings'];
                }

                if (isset($blockData['id'])) {
                    // 別ページのブロックIDは更新できない
                    $block = $page->blocks()
                        ->findOrFail($blockData['id']);

                    $block->update($attributes);
                } else {
                    $block = $page->blocks()->create($attributes);
                }

                $savedIds[] = $block->id;

                if (isset($blockData['clientKey'])) {
                    $idsByClientKey[$blockData['clientKey']] = $block->id;
                }
            }

            // 第2段階：確定したIDで親子関係を設定
            foreach ($blocks as $index => $blockData) {
                $parentKey = $blockData['parentClientKey'] ?? null;

                if ($parentKey === null) {
                    continue;
                }

                $page->blocks()
                    ->whereKey($savedIds[$index])
                    ->update([
                        'parent_id' => $idsByClientKey[$parentKey],
                    ]);
            }

            // 保存対象から外れたブロックのみ削除
            $page->blocks()
                ->whereNotIn('id', $savedIds)
                ->delete();

            return $savedIds;
        });

        return response()->json([
            'success' => true,
            'blockIds' => $savedIds,
        ]);
    }

    /**
     * ブロック削除
     */
    public function destroy(Block $block)
    {
        $this->authorize('delete', $block);

        $block->delete();

        return response()->json([
            'message' => 'Block deleted successfully'
        ]);
    }
    /**
     * ブロック並び替え
     */
    public function reorder(Request $request, Page $page)
    {
        $this->authorize('update', $page);

        $validated = $request->validate([
            'blocks' => ['required', 'array'],
            'blocks.*.id' => ['required', 'exists:blocks,id'],
            'blocks.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated, $page) {

            foreach ($validated['blocks'] as $blockData) {

                $page->blocks()
                    ->where('id', $blockData['id'])
                    ->update([
                        'sort_order' => $blockData['sort_order']
                    ]);
            }
        });

        return response()->json([
            'message' => 'Blocks reordered successfully'
        ]);
    }

    // データ削除
    public function clear(Page $page)
    {
        $this->authorize('update', $page);

        $page->blocks()->delete();

        return response()->json([
            'message' => 'cleared'
        ]);
    }
}