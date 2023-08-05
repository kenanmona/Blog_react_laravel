<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Http\Resources\ArticleImageResource;
use App\Models\Article;
use App\Models\Image;
use App\Repositories\Contracts\IArticle;
use App\Repositories\Contracts\IImage;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ArticleImageController extends Controller
{
    use ResponseTrait;
    protected $imageRepo;
    public function __construct(IImage $imageRepo)
    {
       $this->imageRepo=$imageRepo;
    }
    //

    public function createImage(ImageRequest $request){
         $message = $this->imageRepo->create($request->validated());
         return "jbjbjbk";

    }

    public function updateImage(Image $image,ImageRequest $request){
         $message = $this->imageRepo->update($image,$request->validated());
         return $message;

    }

    public function deleteImage(Image $image){
         $this->imageRepo->delete($image);
         return $this->responseData('success delete image',200);

    }

}
