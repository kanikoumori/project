<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $sites = Site::where('user_id', auth()->id())
            ->with(['pages' => function ($query) {
                $query->withCount('blocks')
                    ->orderBy('sort_order');
            }])
            ->latest('updated_at')
            ->get();

        $recentSites = $sites->take(3);

        $totalSteps = 4;

        $siteProgresses = $sites->mapWithKeys(function ($site) {
            $hasSite = true;

            $hasPage = $site->pages->isNotEmpty();

            $hasEditedDesign = $site->pages->contains(function ($page) {
                return $page->blocks_count > 0;
            });

            $completedSteps = 0;

            if ($hasSite) {
                $completedSteps++;
            }

            if ($hasPage) {
                $completedSteps++;
            }

            if ($hasEditedDesign) {
                $completedSteps++;
            }

            return [
                $site->id => [
                    'completedSteps' => $completedSteps,
                    'hasSite' => $hasSite,
                    'hasPage' => $hasPage,
                    'hasEditedDesign' => $hasEditedDesign,
                ],
            ];
        })->toArray();

        $completedSteps = $sites->isNotEmpty()
            ? $siteProgresses[$sites->first()->id]['completedSteps']
            : 0;

        $sitePages = $sites->mapWithKeys(function ($site) {
            return [
                $site->id => $site->pages->map(function ($page) {
                    return [
                        'id' => $page->id,
                        'title' => $page->title,
                        'url' => route('editor.show', $page),
                    ];
                })->values()->all(),
            ];
        })->toArray();

        return view('dashboard.index', compact(
            'sites',
            'recentSites',
            'completedSteps',
            'totalSteps',
            'sitePages',
            'siteProgresses'
        ));
    }
}