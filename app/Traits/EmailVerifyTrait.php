<?php
namespace App\Traits;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

Trait EmailVerifyTrait
{

 public function checkValid(Request $request){
    if(!URL::hasValidSignature($request)){
        return false;
       };
    return true;
 }

 public function checkVerify(User $user){
    if ($user->hasVerifiedEmail()) {
        return false;
     }
     return true;
 }


}
