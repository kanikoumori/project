<?php
 
namespace App\Http\Controllers;
 
use App\Models\Page;
 
class EditorController extends Controller
{
    public function show(Page $page)
    {
        $this->authorize('view', $page);
 
        $page->load('blocks');
 
        return view('editor.index', compact('page'));
    }
}