<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    /**
     * ページ一覧取得
     */
    public function index(Site $site)
    {
        $this->authorize('view', $site);

        return $site->pages()
            ->orderBy('sort_order')
            ->get();
    }

    /**
     * ページ作成
     */
    public function store(Request $request, Site $site)
    {
        $this->authorize('update', $site);
        $validated = $request->validate(
            [
                'title' => ['required', 'string', 'max:255'],
                'slug' => ['required','string','max:255',Rule::unique('pages', 'slug')->where(fn ($query) =>$query->where('site_id', $site->id)),],
            ],
            [
                'slug.unique' => 'このslugは既に使用されています。',
            ]
        );
 

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
        $this->authorize('view', $page);

        return response()->json($page);
    }
    /**
     * ページ更新
     */
    public function update(Request $request, Page $page)
    {
        $this->authorize('update', $page);
        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes','string','max:255',Rule::unique('pages', 'slug')->where(fn ($query) =>$query->where('site_id', $page->site_id))->ignore($page->id),], 
            'sort_order' => ['sometimes', 'integer'],
            'is_home' => ['sometimes', 'boolean'],
            'status' => ['sometimes', 'string', 'max:50'],
        ]);

        $page->update($validated);

        return response()->json($page);
    }

    /**
     * ページ削除
     */
    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);
        $page->delete();

        return response()->json([
            'message' => 'Page deleted successfully'
        ]);
    }

    public function manage(Site $site)
    {
        $this->authorize('view', $site);

        $pages = $site->pages()
            ->orderBy('sort_order')
            ->get();

        return view('pages.index', compact('site', 'pages'));
    }
}