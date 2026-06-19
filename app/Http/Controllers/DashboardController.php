<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
{
    $sites = Site::where('user_id', auth()->id())
        ->latest('updated_at')
        ->get();

    $recentSites = $sites->take(3);

    $hasSite = $sites->isNotEmpty();

    $hasPage = $sites
        ->load('pages')
        ->pluck('pages')
        ->flatten()
        ->isNotEmpty();

    $completedSteps = 0;

    if ($hasSite) {
        $completedSteps++;
    }

    if ($hasPage) {
        $completedSteps++;
    }

    $totalSteps = 4;

    return view('dashboard.index', compact(
        'sites',
        'recentSites',
        'completedSteps',
        'totalSteps'
    ));
}
}