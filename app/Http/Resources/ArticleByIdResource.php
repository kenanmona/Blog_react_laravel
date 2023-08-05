<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleByIdResource extends JsonResource
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
            'title'=>$this->title,
            'description'=>$this->description,
            'tag'=>$this->tagArray,
            'likes'=>$this->likes_count,
            'user'=>new UserForArticleResource($this->user),
            'images'=> ArticleImageResource::collection($this->images),
            'comments'=>CommentResource::collection($this->comments),
            'dates'=>[
                'created_at'=>$this->created_at->diffForHumans(),
                'updated_at'=>$this->updated_at->diffForHumans(),
            ]
        ];
    }
}
