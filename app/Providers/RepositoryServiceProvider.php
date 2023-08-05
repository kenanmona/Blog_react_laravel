<?php

namespace App\Providers;

use App\Repositories\Contracts\IArticle;
use App\Repositories\Contracts\ICategory;
use App\Repositories\Contracts\IComment;
use App\Repositories\Contracts\IImage;
use App\Repositories\Contracts\ILike;
use App\Repositories\Contracts\IRole;
use App\Repositories\Contracts\ITag;
use App\Repositories\Contracts\IUser;
use App\Repositories\Elquent\ArticleIamgeRepository;
use App\Repositories\Elquent\ArticleRepository;
use App\Repositories\Elquent\CategoryRepository;
use App\Repositories\Elquent\CommentRepository;
use App\Repositories\Elquent\LikeRepository;
use App\Repositories\Elquent\RoleRepository;
use App\Repositories\Elquent\TagRepository;
use App\Repositories\Elquent\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(IUser::class,UserRepository::class);
        $this->app->bind(IRole::class,RoleRepository::class);
        $this->app->bind(ICategory::class,CategoryRepository::class);
        $this->app->bind(IArticle::class,ArticleRepository::class);
        $this->app->bind(ITag::class,TagRepository::class);
        $this->app->bind(IImage::class,ArticleIamgeRepository::class);
        $this->app->bind(IComment::class,CommentRepository::class);
        $this->app->bind(ILike::class,LikeRepository::class);
    }
}
