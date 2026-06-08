<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'site_id',
        'title',
        'slug',
        'sort_order',
        'is_home',
        'status',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }
}