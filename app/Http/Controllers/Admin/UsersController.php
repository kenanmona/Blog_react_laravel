<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Like;
use App\Models\User;
use App\Repositories\Contracts\IUser;
use App\Repositories\Elquent\Criteria\EagerLoad;
use App\Traits\ResponseTrait;

class UsersController extends Controller
{
    use ResponseTrait;
    protected $user;
    public function __construct(IUser $user)
    {
        $this->user = $user;

    }

    public function AllUsers()
    {
        $user = $this->user->withCriteria([
            new EagerLoad(['roles']),
        ])->allwithDeleted();
        return UserResource::collection($user);
    }

    /*Block user in website */
    public function BlockUser(User $user)
    {
        $this->user->delete($user);
        return $this->responseData("success Block user", 200);
    }

    /* UnBlock user in website */
    public function UnBlockUser(int $id)
    {

        $this->user->removeBlock($id);
        return $this->responseData("success Remove Block user", 200);

    }

    public function countUser()
    {
        return User::get();
    }
    public function countLike()
    {
        return Like::get();
    }
}
