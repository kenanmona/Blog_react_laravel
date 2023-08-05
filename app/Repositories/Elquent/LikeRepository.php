<?php
namespace App\Repositories\Elquent;

use App\Models\Like;
use App\Models\User;
use App\Repositories\Contracts\ILike;
use App\Traits\ResponseTrait;
use App\Traits\UserTrait;

class LikeRepository extends BaseRepository implements ILike
{
    use UserTrait,ResponseTrait;

    public function createLike(array $data){
        if(!$this->checkLike($data)){

            $user=['user_id'=>$this->user()->id];
            $this->create(array_merge($data, $user));
            return $this->responseData('success like',200);

        }else{
            $this->delete($this->getLike($data));
            return $this->responseData('success dislike',200);
        }

    }

    public function checkLike($data){

        $like= $this->model::where([
            ['user_id',$this->user()->id],
            ['article_id',$data['article_id']],
           ])->exists();
        return $like;
    }

    public function getLike($data){

       $like= $this->model::where([
        ['user_id',$this->user()->id],
        ['article_id',$data['article_id']],
       ])->firstOrFail();
       return $like;

    }



    public function model(){
        return Like::class;
    }
}
