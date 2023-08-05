<?php
namespace App\Repositories\Elquent;

use App\Models\User;
use App\Repositories\Contracts\ICheck;
use App\Repositories\Contracts\IUser;
use Exception;

class UserRepository extends BaseRepository implements IUser{

 public function checkPerson(ICheck $type){

       if($type instanceof ICheck){
           return $type->check();
       }
       throw new Exception('parameter should be not null');


 }

 public function removeBlock(int $id){

    
    if (User::onlyTrashed()->find($id)) {
        User::onlyTrashed()->find($id)->restore();
    }


 }

 public function model(){

    return User::class;

 }

}
