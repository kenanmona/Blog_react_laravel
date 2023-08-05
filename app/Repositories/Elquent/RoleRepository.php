<?php
namespace App\Repositories\Elquent;

use App\Models\User;
use App\Repositories\Contracts\IRole;
use App\Traits\ResponseTrait;

class RoleRepository implements IRole{
    use ResponseTrait;

    public function addRoleAdmin(User $user,string $role='user'){

        if (!$user->hasRole($role)) {
            $user->assignRole($role);
        }
        return $this->responseData('success add role',200);
    }

    public function removeRoleAdmin(User $user,string $role='user'){
        if ($user->hasRole($role)) {
            $user->removeRole($role);
        }
        return $this->responseData('success remove role',200);

    }




}
