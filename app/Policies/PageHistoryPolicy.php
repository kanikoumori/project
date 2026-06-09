<?php

namespace App\Policies;

use App\Models\PageHistory;
use App\Models\User;

class PageHistoryPolicy
{
    public function view(User $user, PageHistory $history): bool
    {
        return $history->page->site->user_id === $user->id;
    }

    public function restore(User $user, PageHistory $history): bool
    {
        return $history->page->site->user_id === $user->id;
    }
}