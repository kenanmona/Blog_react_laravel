<?php

namespace App\Http\Controllers\Admin;

use App\Events\MessageTest;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleByIdResource;
use App\Http\Resources\ArticleIdForUpdate;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleWithImageResource;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Notification;
use App\Repositories\Contracts\IArticle;
use App\Repositories\Elquent\Criteria\EagerLoad;
use App\Traits\NotificationTrait;
use App\Traits\UserTrait;

class ArticleController extends Controller
{
    use UserTrait, NotificationTrait;
    protected $articleRepo;
    public function __construct(IArticle $articleRepo)
    {
        $this->articleRepo = $articleRepo;

    }

    public function createArticle(ArticleRequest $request)
    {
        $article = $this->articleRepo->create($request->validated());
        $this->createNotification($article->user->name, $article->id);
        MessageTest::dispatch('New article Add to website By ' . $article->user->name, $article->id, $article->user->id);
        return new ArticleResource($article);

    }

    public function showArticle()
    {

        $articles = $this->articleRepo->withCriteria([new EagerLoad(['user', 'images'])])->all();
        return ArticleResource::collection($articles);

    }

    public function showArticlePaginate()
    {

        $articles = $this->articleRepo->showArticlePaginate();
        return ArticleResource::collection($articles);

    }

    public function articleById(Article $article)
    {

        $articles = $this->articleRepo->find($article);
        return new ArticleIdForUpdate($articles);

    }

    public function showLatestArticle()
    {

        $articles = $this->articleRepo->showLatestArticle();
        return ArticleResource::collection($articles);

    }

    public function updateArticle(Article $article, ArticleRequest $request)
    {

        $this->articleRepo->update($article, $request->validated());
        return $this->responseData('success update article', 200);
    }

    public function deleteArticle(Article $article)
    {

        $this->articleRepo->delete($article);
        Notification::where('article_id', $article->id)->delete();
        return $this->responseData('success delete article', 200);
    }

    public function showArticleById(int $article_id)
    {
        $article = $this->articleRepo->findWhereFirst('id', $article_id);
        return new ArticleByIdResource($article);
    }

    public function showImagesArticleById(Article $article_relation)
    {
        return new ArticleWithImageResource($article_relation);
    }

    public function showCommentsArticleById(Article $article)
    {
        return CommentResource::collection($article->comments);
    }

    public function showArticlesByCategory(int $category_id)
    {
        $result = $this->articleRepo->showArticlesByCategory('category_id', $category_id);
        return ArticleResource::collection($result);
    }

    public function showArticlesByTag(string $tag_name)
    {

        $result = $this->articleRepo->showArticlesByTag($tag_name);
        return ArticleResource::collection($result);

    }

    public function popularArticle()
    {

        $result = $this->articleRepo->popularArticle();
        return ArticleResource::collection($result);

    }

    public function countArticles()
    {
        return Article::get();
    }

    public function likesOnArtilces()
    {
        $likes = [];
        $articles = Article::get();

        foreach ($articles as $article) {
            array_push($likes, $article->likes);
        }

        //return $articles[0]->likes;
        return $likes;
    }

}
