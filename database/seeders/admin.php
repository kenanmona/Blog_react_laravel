<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ArticleImageController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CheckController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\CommentController;


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

Route::group(['middleware'=>['jwtauth','verified','role:admin']],function(){

    /**users api */
    Route::get('users', [UsersController::class, 'AllUsers']);
    Route::delete('block/{user}', [UsersController::class, 'BlockUser']);
    Route::get('unblock/{user}', [UsersController::class, 'UnBlockUser']);
    Route::get('role/add/{user}', [RoleController::class, 'updateRoleToAdmin']);
    Route::get('role/remove/{user}', [RoleController::class, 'RemoveRoleAdminFromUser']);
    /**category api */
    Route::post('category/create', [CategoryController::class, 'createCategory']);
    Route::delete('category/delete/{category}', [CategoryController::class, 'deleteCategory']);
    Route::get('category/show', [CategoryController::class, 'showAllCategory']);
    Route::put('category/update/{category}', [CategoryController::class, 'updateCategory']);
    Route::get('category/show/{category}', [CategoryController::class, 'FindCategoryById']);
    /**Tag api */
    Route::post('tag/create', [TagController::class, 'createTag']);
    Route::get('tag/show', [TagController::class, 'showTag']);
    Route::get('tag/show/paginate', [TagController::class, 'showTagPaginate']);
    Route::get('tag/show/{tag}', [TagController::class, 'FindTagById']);
    Route::put('tag/update/{tag}', [TagController::class, 'updateTag']);
    /**Article api */
    Route::post('article/create', [ArticleController::class, 'createArticle']);
    Route::get('article/show', [ArticleController::class, 'showArticle']);
    Route::get('article/show/paginate', [ArticleController::class, 'showArticlePaginate']);
    Route::put('article/update/{article}', [ArticleController::class, 'updateArticle']);
    Route::delete('article/delete/{article}', [ArticleController::class, 'deleteArticle']);
    Route::post('article/image/create', [ArticleImageController::class, 'createImage']);
    Route::get('article/{article_relation}/image/show', [ArticleController::class, 'showImagesArticleById']);
    Route::put('article/image/{image}/update', [ArticleImageController::class, 'updateImage']);
    Route::delete('article/image/{image}/delete', [ArticleImageController::class, 'deleteImage']);
    Route::get('article/show/{article}', [ArticleController::class, 'articleById']);
    Route::get('comments/show/article/{article}', [ArticleController::class, 'showCommentsArticleById']);
    Route::delete('comments/delete/{comment}', [CommentController::class, 'deleteComment']);


});


