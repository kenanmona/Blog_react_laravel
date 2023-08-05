<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'content'=>$this->subject,
            'author'=>new UserForArticleResource($this->user),
            'dates'=>[
                'created_at'=>$this->created_at->diffForHumans(),
                'updated_at'=>$this->updated_at->diffForHumans(),
            ],
            'replay'=>ReplyResource::collection($this->replies)
        ];
    }
}
