<?php

namespace App\Http\Controllers\User;

use App\Events\MessageTest;
use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use App\Traits\UserTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MeController extends Controller
{

  use UserTrait,ResponseTrait;

    public function getMe(){
      return $this->responseData($this->me(),200);
    }

    //create storage link
    public function storage(){
      Artisan::call('storage:link');
      return $this->responseData("success",200);
    }

    // public function pusher(){
    //   MessageTest::dispatch('ibrahim alia king programmer',1);
    //   return $this->responseData('success',200);
    // }
}
