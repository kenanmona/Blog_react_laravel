<?php
namespace App\Traits;

use App\Exceptions\AdminException;
use App\Exceptions\TokenException;
use App\Exceptions\UserBlockException;
use App\Exceptions\VerifyEmailException;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

Trait UserTrait{
    use ResponseTrait;

    public function getImage(){
       $image = auth()->user()->image;
       return $image;
    }

    /*all user filed */
    public function user(){
        $user = auth()->user();
        return $user;
    }


    /*specific user filed */
    public function me(){
      $user=auth()->user();
      return new UserResource($user);
    }

    public function getUserAuthWithToken(){

        $user= $this->me();
        /* get the token from the authintication guard */

        $token= (string)$this->guard()->getToken();

        /* add user */

        $user->token = $token;

        return $user;

    }

    public function get_user_by_id($id){

        $user = User::find($id);
        return $user;

    }

    public function checkToken(){
        try {
            JWTAuth::parseToken()->authenticate();
        } catch (\Exception $th) {
          throw new TokenException();
        }



    }

    public function checkBlocked($user){

        if ($user == null) {
            throw new UserBlockException();
        }

    }

    public function checkHasRoleAdmin( $user){

        if (! $user->hasRole('admin')) {
            throw new AdminException();
        }

    }

    public function checkVerifyEmail($user){

        if (! $user->email_verified_at) {
            throw new VerifyEmailException();
        }

    }



}
