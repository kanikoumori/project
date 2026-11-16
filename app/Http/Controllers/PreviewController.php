<?php

namespace App\Http\Controllers;

use App\Models\Page;

class PreviewController extends Controller
{
    public function show(Page $page)
    {
        $this->authorize('view', $page);

        $page->load('site');

        return view('preview.index', compact('page'));
    }
}
