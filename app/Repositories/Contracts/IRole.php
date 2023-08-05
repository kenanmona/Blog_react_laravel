<?php
namespace App\Repositories\Contracts;

use App\Models\User;

interface IRole{

    public function addRoleAdmin(User $user,string $role);

    public function removeRoleAdmin(User $user,string $role);

}
