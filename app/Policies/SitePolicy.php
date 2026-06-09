<?php

namespace App\Policies;

use App\Models\Site;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SitePolicy
{
    public function view(User $user, Site $site): bool
    {
        return $site->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Site $site): bool
    {
        return $site->user_id === $user->id;
    }

    public function delete(User $user, Site $site): bool
    {
        return $site->user_id === $user->id;
    }
}