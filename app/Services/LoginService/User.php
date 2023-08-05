<?php
namespace App\Services\LoginService;

use App\Traits\LoginTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class User{
    use LoginTrait,AuthenticatesUsers;

    public function getUser(){
        return $this->guard()->user();
    }

    public function checkUserVerify( $user){
        if ($user instanceof MustVerifyEmail && ! $user->hasVerifiedEmail()) {
            return false;
        }
        return true;
    }
}
