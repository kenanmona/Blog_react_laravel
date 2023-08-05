<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\IUser;
use App\Repositories\Elquent\CheckAdmin;
use App\Repositories\Elquent\CheckUser;
use Illuminate\Http\Request;

class CheckController extends Controller
{
    protected $user;
    public function __construct(IUser $user)
    {

      $this->user = $user;

    }
    public function admin(){
        return $this->user->checkPerson(new CheckAdmin);
      }

      public function user(){
          return $this->user->checkPerson(new CheckUser);

      }

}
