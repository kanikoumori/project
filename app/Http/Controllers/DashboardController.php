<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $sites = Site::where('user_id', auth()->id())
            ->latest()
            ->get();

        return view('dashboard.index', compact('sites'));
    }
}