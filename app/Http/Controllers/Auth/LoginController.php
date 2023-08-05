<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserTokenResource;
use App\Providers\RouteServiceProvider;
use App\Services\LoginService\LoginFacade;
use App\Traits\LoginTrait;
use App\Traits\ResponseTrait;
use App\Traits\UserTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationData;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers,LoginTrait,ResponseTrait,UserTrait;

    private $loginFacade;

    public function __construct()
    {
       $this->loginFacade= new LoginFacade();
    }

    // override
    protected function attemptLogin(Request $request){
       return $this->loginFacade->attemptLoginUser($request);

      }

    // override
      protected function sendLoginResponse(Request $request){

        $this->clearLoginAttempts($request);
        /* get user auth */
        $user = $this->getUserAuthWithToken();

        return $this->responseData(new UserTokenResource($user),200);

      }

      //override
      protected function sendFailedLoginResponse(Request $request)
      {

        $user = $this->loginFacade->user->getUser();

        if (! $this->loginFacade->user->checkUserVerify($user)) {
           return $this->responseError('you need to verify email account',422);
        }

         throw ValidationException::withMessages([
           'user'=>"Authinticated faild"
         ]);

      }

      //logout
      public function logout(){
        $this->guard()->logout();
        return $this->responseData('logged out successfuly',200);
      }


}
