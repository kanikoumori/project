<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $fillable = [
        'page_id',
        'parent_id',
        'type',
        'data',
        'settings',
        'sort_order',
    ];

    protected $casts = [
        'data' => 'array',
        'settings' => 'array',
    ];

    // ブロックが所属するページ
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    // 親コンテナ
    public function parent()
    {
        return $this->belongsTo(Block::class, 'parent_id');
    }

    // コンテナ内の子ブロック
    public function children()
    {
        return $this->hasMany(Block::class, 'parent_id')
            ->orderBy('sort_order');
    }
}
