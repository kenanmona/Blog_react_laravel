<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\LikeController;
use App\Http\Controllers\User\MeController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Broadcast::routes(['middleware'=>['auth:api']]);
// Route group for authenticated user only
// Route::get('/test', [MeController::class, 'pusher']);
Route::get('/storage', [MeController::class, 'storage']);


    Route::get('latest/article/show', [ArticleController::class, 'showLatestArticle']);
    Route::get('article/{article_id}/show', [ArticleController::class, 'showArticleById']);
    Route::get('user/category/show', [CategoryController::class, 'showAllCategory']);
    Route::get('user/tag/show', [TagController::class, 'showTag']);
    Route::get('category/article/show', [CategoryController::class, 'showCategoryWithArticle']);
    Route::get('category/{category_id}/article/show', [ArticleController::class, 'showArticlesByCategory']);
    Route::get('tag/{tag_name}/article/show', [ArticleController::class, 'showArticlesByTag']);
    Route::get('popular/article/show', [ArticleController::class, 'popularArticle']);
    Route::get('notifications/user', [NotificationController::class, 'getNotification']);

Route::group(['middleware'=>['jwtauth','verified','role:user']],function(){

    Route::get('me', [MeController::class, 'getMe']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::put('settings/profile', [SettingsController::class, 'updateProfile']);
    Route::put('settings/password', [SettingsController::class, 'updatePassword']);
    Route::post('settings/image', [SettingsController::class, 'updateImageUser']);
    Route::delete('settings/image', [SettingsController::class, 'deleteImageUser']);
    Route::post('add/comment', [CommentController::class, 'createComment']);
    Route::delete('comment/delete/{comment}', [CommentController::class, 'deleteCommentByUser']);
    Route::post('like', [LikeController::class, 'like']);
    Route::post('like/check', [LikeController::class, 'checklike']);

});

