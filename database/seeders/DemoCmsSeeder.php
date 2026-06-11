<?php

namespace Database\Seeders;

use App\Models\Block;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoCmsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        $site = Site::create([
            'user_id' => $user->id,
            'title' => 'Demo Site',
            'description' => 'CMS動作確認用サイト',
            'slug' => 'demo-site',
            'status' => 'draft',
        ]);

        $homePage = Page::create([
            'site_id' => $site->id,
            'title' => 'Home',
            'slug' => 'home',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'published',
        ]);

        $aboutPage = Page::create([
            'site_id' => $site->id,
            'title' => 'About',
            'slug' => 'about',
            'sort_order' => 1,
            'is_home' => false,
            'status' => 'published',
        ]);

        Block::create([
            'page_id' => $homePage->id,
            'type' => 'heading',
            'data' => [
                'text' => 'ようこそ Demo Site へ',
            ],
            'sort_order' => 0,
        ]);

        Block::create([
            'page_id' => $homePage->id,
            'type' => 'text',
            'data' => [
                'content' => 'これはSeederで生成されたサンプルテキストです。',
            ],
            'sort_order' => 1,
        ]);

        Block::create([
            'page_id' => $homePage->id,
            'type' => 'image',
            'data' => [
                'url' => '/images/sample.jpg',
                'alt' => 'sample image',
            ],
            'sort_order' => 2,
        ]);

        Block::create([
            'page_id' => $aboutPage->id,
            'type' => 'text',
            'data' => [
                'content' => 'Aboutページです。',
            ],
            'sort_order' => 0,
        ]);
    }
}