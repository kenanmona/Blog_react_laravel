<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagRequest;
use App\Http\Resources\TagResource;
use App\Repositories\Contracts\ITag;
use App\Traits\ResponseTrait;
use Cviebrock\EloquentTaggable\Models\Tag;

class TagController extends Controller
{
    use ResponseTrait;

    protected $tagRepo;
    public function __construct(ITag $tagRepo){
        $this->tagRepo=$tagRepo;

    }

    public function createTag(TagRequest $request){

        $tag=$this->tagRepo->create($request->validated());
        return new TagResource($tag);

    }

    public function showTag(){

        $tags=$this->tagRepo->all();
        return TagResource::collection($tags);

    }
    public function showTagPaginate(){

        $tags=$this->tagRepo->paginate();
        return TagResource::collection($tags);

    }
    
    public function FindTagById(Tag $tag){
        return new TagResource($tag);

    }

    public function updateTag(Tag $tag,TagRequest $request){

        $this->tagRepo->update($tag,$request->validated());
        return $this->responseData('success update tag',200);

    }
}
