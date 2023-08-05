<?php
namespace App\Services\LoginService;

use App\Traits\LoginTrait;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class Token{

    use AuthenticatesUsers,LoginTrait;

    public function getToken(Request $request){
      return $this->getTokenForUser($request);
    }

    public function setToken(string $token){
        $this->guard()->setToken($token);
    }

    public function checkToken(string $token){
        if (! $token) {
            return false;
        };
        return true;
    }


}
