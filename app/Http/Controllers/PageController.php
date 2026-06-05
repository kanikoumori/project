<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Site;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * ページ一覧取得
     */
    public function index(Site $site)
    {
        return $site->pages()
            ->orderBy('sort_order')
            ->get();
    }

    /**
     * ページ作成
     */
    public function store(Request $request, Site $site)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
        ]);

        $page = Page::create([
            'site_id' => $site->id,
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'sort_order' => 0,
            'is_home' => false,
            'status' => 'draft',
        ]);

        return response()->json($page, 201);
    }

    /**
     * ページ詳細取得
     */
    public function show(Page $page)
    {
        return response()->json($page);
    }
}