<?php
namespace App\Traits;

use Illuminate\Http\Request;

Trait LoginTrait
{

    public function getTokenForUser(Request $request){
        $token =$this->guard()->attempt($this->credentials($request));
        return $token ;
    }


}
