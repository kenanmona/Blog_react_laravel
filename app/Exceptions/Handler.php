<?php

namespace App\Exceptions;

use App\Traits\ResponseTrait;
use Error;
use ErrorException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use InvalidArgumentException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ResponseTrait;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (ModelNotFound $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError('model function not found',500);
            }
        });
        $this->renderable(function (UserBlockException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['success'=>false,'message'=>'User Blocked'],500);
            }
        });
        $this->renderable(function (AdminException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['success'=>false,'message'=>'Not Admin'],500);
            }
        });
        $this->renderable(function (TokenException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['success'=>false,'message'=>'not logged in'],500);
            }
        });
        $this->renderable(function (NotFoundHttpException $e,$request) {
            if ($request->wantsJson()) {
                return $this->responseError(['message'=>'Not found Try again'],404);
            }
        });

        $this->renderable(function (FileNumberException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['message'=>'The number of files is large...Try again'],500);
            }
        });

        $this->renderable(function (InvalidArgumentException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['message'=>'Try again with new name or new value because it is invalid'],500);
            }
        });

        $this->renderable(function (VerifyEmailException $e,$request) {
            if ($request->wantsJson()) {
               return $this->responseError(['success'=>false,'message'=>'You need verify your email'],500);
            }
        });
        // $this->renderable(function (Error $e,$request) {
        //     if ($request->wantsJson()) {
        //         return $this->responseError(['message'=>'Try again....'],500);
        //     }
        // });

        // $this->renderable(function (UnauthorizedException $e,$request) {
        //     if ($request->wantsJson()) {
        //       return $this->responseError(['message'=>'User does not have the right roles...Try again'],500);
        //     }
        // });
        // $this->renderable(function (HttpException $e,$request) {
        //     if ($request->wantsJson()) {
        //         return $this->responseError(['message'=>'Email not verified...Try again'],500);
        //     }
        // });
        // $this->renderable(function (QueryException $e,$request) {
        //     if ($request->wantsJson()) {
        //         return $this->responseError(['message'=>' something  wrong try again with correct value'],500);
        //     }
        // });
        // $this->renderable(function (ErrorException $e,$request) {
        //     if ($request->wantsJson()) {
        //         return $this->responseError(['message'=>'something  wrong try again with correct value'],500);
        //     }
        // });
    }
}
