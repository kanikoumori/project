<?php

namespace App\Http\Controllers;

use App\Models\Page;

class PreviewController extends Controller
{
    public function show(Page $page)
    {
        $this->authorize('view', $page);

        $page->load([
            'site',
            'blocks' => function ($query) {
                $query->orderBy('sort_order');
            },
        ]);

        return view('preview.index', compact('page'));
    }
}
