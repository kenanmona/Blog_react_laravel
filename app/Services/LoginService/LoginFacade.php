<?php
namespace App\Services\LoginService;

use Illuminate\Http\Request;

class LoginFacade{

    public $user;
    public $token;

    public function __construct()
    {
       $this->user=new User();
       $this->token=new Token();
    }

    public  function attemptLoginUser(Request $request){

       $token= $this->token->getToken($request);
       if (! $this->token->checkToken($token)) {
           return false;
        }


        $user=$this->user->getUser();
       if (! $this->user->checkUserVerify($user)) {
          return false;
       }

       $this->token->setToken($token);
       return true;



    }
}
