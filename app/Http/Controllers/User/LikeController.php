<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\LikeRequest;
use App\Models\Like;
use App\Repositories\Contracts\ILike;
use App\Traits\ResponseTrait;

class LikeController extends Controller
{
    use ResponseTrait;
    //
    protected $likeRepo;
    public function __construct(ILike $likeRepo)
    {
        $this->likeRepo = $likeRepo;
    }

    public function like(LikeRequest $request)
    {
        return $this->likeRepo->createLike($request->validated());
    }

    public function checklike(LikeRequest $request)
    {
        $result = $this->likeRepo->checkLike($request->validated());
        return $this->responseData(['check' => $result], 200);
    }

}
