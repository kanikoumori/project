<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageHistory extends Model
{
    protected $fillable = [
        'page_id',
        'version_number',
        'snapshot',
    ];

    protected $casts = [
        'snapshot' => 'array',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}