<?php

namespace App\Http\Controllers;

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
            'blocks.*.type' => ['required', 'string'],
            'blocks.*.data' => ['required', 'array'],
            'blocks.*.sortOrder' => ['required', 'integer'],
        ]);

        $savedIds = DB::transaction(function () use ($validated, $page) {
            $savedIds = [];

            foreach ($validated['blocks'] as $blockData) {
                $attributes = [
                    'type' => $blockData['type'],
                    'data' => $blockData['data'],
                    'sort_order' => $blockData['sortOrder'],
                ];

                if (isset($blockData['id'])) {
                    // このページに属する既存ブロックだけを更新
                    $block = $page->blocks()->findOrFail($blockData['id']);
                    $block->update($attributes);
                } else {
                    // IDのないブロックだけを新規作成
                    $block = $page->blocks()->create($attributes);
                }

                $savedIds[] = $block->id;
            }

            // 今回の保存データから除外されたブロックだけを削除
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