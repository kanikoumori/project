<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SiteController extends Controller
{
    /**
     * サイト一覧取得
     */
    public function index()
    {
        $sites = auth()->user()
            ->sites()
            ->latest()
            ->get();

        return view('dashboard.sites', compact('sites'));
    }

    /**
     * サイト作成
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'title' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'slug' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('sites', 'slug')
                        ->where(fn ($query) =>
                            $query->where('user_id', auth()->id())
                        ),
                ],
            ],
            [
                'slug.unique' => 'このURL(slug)は既に使用されています。',
            ]
        );

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