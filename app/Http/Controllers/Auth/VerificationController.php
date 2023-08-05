<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResendEmail;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Traits\EmailVerifyTrait;
use App\Traits\ResponseTrait;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

// use Illuminate\Foundation\Auth\VerifiesEmails;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    // use VerifiesEmails;
       use ResponseTrait,EmailVerifyTrait;
    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    // protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /* verify email*/
    public function verify(Request $request , User $user){

         /* checked if the url is a valid sigend url*/
         if (!$this->checkValid($request)) {
            return $this->responseError('Invalid verification link ',422 );
         }
         /* checked if user has alredy verfied email*/
         if (!$this->checkVerify($user)) {
            return $this->responseError('Email address alredy verified ',422 );
         }
         $user->markEmailAsVerified();
         event(new Verified($user));

         return $this->responseData('Email success Verified',200);



    }

    /* resend email*/
    public function resend(ResendEmail $request){
        $user = User::where('email',$request->email)->first();
        if (! $user) {
           return $this->responseError('No user could be found with this email address',422);
        }

         /* checked if user has alredy verfied email*/
         if (!$this->checkVerify($user)) {
           return $this->responseError('Email address alredy verified ',422 );
         }

        $user->sendEmailVerificationNotification();

         return $this->responseData('verfiaction link resent',200);



    }

}
