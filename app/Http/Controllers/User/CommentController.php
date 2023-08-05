<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Repositories\Contracts\IComment;

class CommentController extends Controller
{
    protected $commentRepo;

    public function __construct(IComment $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function createComment(CommentRequest $request)
    {

        return $this->commentRepo->create($request->validated());

    }
    public function deleteComment(Comment $comment)
    {

        return $this->commentRepo->delete($comment);

    }

    public function deleteCommentByUser(Comment $comment)
    {

        $this->authorize('delete', $comment);

        return $this->commentRepo->deleteComment($comment);

    }

    public function countComment()
    {
        return Comment::get();
    }
}
