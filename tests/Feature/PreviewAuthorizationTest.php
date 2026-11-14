<?php
namespace Tests\Feature;

use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PreviewAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private function createPage(User $owner): Page
    {
        $site = Site::create([
            'user_id' => $owner->id,
            'title' => 'テストサイト',
            'slug' => 'test-site',
            'status' => 'draft',
        ]);

        return Page::create([
            'site_id' => $site->id,
            'title' => 'テストページ',
            'slug' => 'test-page',
            'sort_order' => 0,
            'is_home' => true,
            'status' => 'draft',
        ]);
    }

    public function test_guest_is_redirected_to_login(): void
    {
        $owner = User::factory()->create();
        $page = $this->createPage($owner);

        $response = $this->get("/preview/{$page->id}");

        $response->assertRedirect(route('login'));
    }

    public function test_owner_can_view_preview(): void
    {
        $owner = User::factory()->create();
        $page = $this->createPage($owner);

        $response = $this->actingAs($owner)
            ->get("/preview/{$page->id}");

        $response->assertOk();
    }

    public function test_other_user_cannot_view_preview(): void
    {
        $owner = User::factory()->create();
        $page = $this->createPage($owner);

        $otherUser = User::factory()->create();

        $response = $this->actingAs($otherUser)
            ->get("/preview/{$page->id}");

        $response->assertForbidden();
    }
}
