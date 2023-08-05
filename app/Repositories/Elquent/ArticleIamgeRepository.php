<?php
namespace App\Repositories\Elquent;

use App\Models\Image;
use App\Repositories\Contracts\IImage;
use App\Traits\ImageMultiUploadTrait;
use App\Traits\ResponseTrait;

class ArticleIamgeRepository extends BaseRepository implements IImage
{
   use ImageMultiUploadTrait,ResponseTrait;


    public function create($data){

      return  $this->store('uploads/article_image',$data,config('site.upload_disk'));

    }

    public function update($model,$data){
       if ($model->article_id != $data['article_id']) {
        return $this->responseError(['message'=>'Not allowed update this image'],500);
       }
       return $this->restore($data,$model);

    }

    public function delete($model){
        $this->deleteImage($model);
        $model->delete();

    }

    public function model(){


        return Image::class;

    }

}
