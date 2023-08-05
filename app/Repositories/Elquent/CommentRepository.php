<?php
namespace App\Repositories\Elquent;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Repositories\Contracts\IComment;
use App\Traits\ResponseTrait;

class CommentRepository extends BaseRepository implements IComment
{
    use ResponseTrait;

    public function create($data){
        $user=['user_id'=>$this->user()->id];
        parent::create(array_merge($data, $user));
        return $this->responseData("success create",201);
    }
    
     public function delete($data){

        parent::delete($data);
        return $this->responseData("success delete",201);

    }

    public function deleteComment($data){

        $this->delete($data);
        return $this->responseData("success delete",201);

    }

    public function model(){
        return Comment::class;
    }

}
