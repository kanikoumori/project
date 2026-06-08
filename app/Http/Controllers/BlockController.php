<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Page;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    /**
     * ブロック一覧取得
     */
    public function index(Page $page)
    {
        return $page->blocks()
            ->orderBy('sort_order')
            ->get();
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

        $block = Block::create([
            'page_id' => $validated['page_id'],
            'type' => $validated['type'],
            'data' => $validated['data'] ?? [],
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return response()->json($block, 201);
    }
}