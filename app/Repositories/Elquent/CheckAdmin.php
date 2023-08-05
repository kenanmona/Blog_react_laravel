<?php
namespace App\Repositories\Elquent;

use App\Repositories\Contracts\ICheck;
use App\Traits\ResponseTrait;
use App\Traits\UserTrait;

class CheckAdmin implements ICheck{

    use UserTrait,ResponseTrait;

    public function check(){


        $this->checkToken();

        $this->checkBlocked($this->user());

        $this->checkVerifyEmail($this->user());

        $this->checkHasRoleAdmin($this->user());

          return $this->responseData(['success'=>true,"message"=>'success check'],200);



    }

}
