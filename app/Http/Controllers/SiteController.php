<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    /**
     * サイト一覧取得
     */
    public function index()
    {
        return auth()->user()
            ->sites()
            ->latest()
            ->get();
    }

    /**
     * サイト作成
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'slug' => ['required', 'string', 'max:255'],
        ]);

        $site = Site::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'slug' => $validated['slug'],
            'status' => 'draft',
        ]);

        return response()->json($site, 201);
    }
}