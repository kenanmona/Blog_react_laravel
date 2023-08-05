<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
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
            'likes'=>$this->likes_count,
            'tag'=>$this->tagArray,
            'user'=>new UserForArticleResource($this->user),
            'images'=> ArticleImageResource::collection(count($this->images)==0?[]:[$this->images[0]]),
            'dates'=>[
                'created_at'=>$this->created_at->diffForHumans(),
                'updated_at'=>$this->updated_at->diffForHumans(),
            ]
        ];

    }
}
