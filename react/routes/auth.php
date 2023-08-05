<?php

use App\Http\Controllers\Admin\CheckController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
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

// Route group for authenticated guest only
/**check type api */
Route::get('check/admin', [CheckController::class, 'admin']);
Route::get('check/user', [CheckController::class, 'user']);
Route::post('verification/resend', [VerificationController::class, 'resend']);
Route::post('verification/verify/{user}', [VerificationController::class, 'verify'])->name("verification.verify");

Route::group(['middleware' => ['guest:api']], function () {
    Route::post('register', [RegisterController::class, 'registered']);
    Route::post('login', [LoginController::class, 'login']);
    Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('password/reset', [ResetPasswordController::class, 'reset']);
});
