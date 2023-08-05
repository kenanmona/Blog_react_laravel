<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Models\User;
use App\Repositories\Contracts\IRole;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    use ResponseTrait;
    protected $roleRepo;
    public function __construct(IRole $roleRepo)
    {
       $this->roleRepo=$roleRepo;
    }

    // create role
    // public function createRole(RoleRequest $request){
    //     Role::create(['name'=>$request->role]);
    //     return $this->responseData('create role success',200);
    // }

    /** add admin role for user to become admin */
    public function updateRoleToAdmin(User $user){
        return $this->roleRepo->addRoleAdmin($user,'admin');


    }

    /** remove admin role for user to become user */
    public function RemoveRoleAdminFromUser(User $user){
        return $this->roleRepo->removeRoleAdmin($user,'admin');

    }


}
