<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageHistory;
use App\Models\Block;
use Illuminate\Support\Facades\DB;

class PageHistoryController extends Controller
{
    /**
     * オートセーブ
     */
    public function autosave(Page $page)
    {
        $snapshot = [
            'page' => $page->toArray(),

            'blocks' => $page->blocks()
                ->orderBy('sort_order')
                ->get()
                ->toArray(),
        ];

        $history = PageHistory::create([
            'page_id' => $page->id,
            'snapshot' => $snapshot,
        ]);

        return response()->json([
            'message' => 'Autosaved successfully',
            'history_id' => $history->id,
        ]);
    }
    /**
     * 履歴一覧取得
     */
    public function index(Page $page)
    {
        return response()->json(
            $page->histories()
                ->latest()
                ->get()
        );
    }
    /**
     * 履歴復元
     */
    public function restore(PageHistory $history)
    {
        DB::transaction(function () use ($history) {

            $snapshot = $history->snapshot;

            $page = $history->page;

            /*
            * Page復元
            */
            $page->update([
                'title' => $snapshot['page']['title'],
                'slug' => $snapshot['page']['slug'],
                'sort_order' => $snapshot['page']['sort_order'],
                'is_home' => $snapshot['page']['is_home'],
                'status' => $snapshot['page']['status'],
            ]);

            /*
            * Block復元
            */
            $page->blocks()->delete();

            foreach ($snapshot['blocks'] as $blockData) {

                Block::create([
                    'page_id' => $page->id,
                    'type' => $blockData['type'],
                    'data' => $blockData['data'],
                    'sort_order' => $blockData['sort_order'],
                ]);
            }
        });

        return response()->json([
            'message' => 'History restored successfully'
        ]);
    }
}