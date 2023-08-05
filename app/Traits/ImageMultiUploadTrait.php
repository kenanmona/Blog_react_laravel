<?php
namespace App\Traits;

use App\Exceptions\FileNumberException;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

Trait ImageMultiUploadTrait
{
    use ImageUploadTrait;

    public function store(string $url,$data,string $disk){

         if (count($data['image'])<5) {

             foreach ($this->getFile($data) as $image) {

                 $tmp =$image->storeAs($url , $this->renameFile($image),$disk);

                 $item=Image::create([
                    'image'=>$this->renameFile($image),
                    'disk'=>config('site.upload_disk'),
                    'upload_successful'=>true,
                    'article_id'=>$data['article_id'],
                ]);
             }

           return $this->responseData('success create images',200);

         }else{

           throw new FileNumberException();
         }



    }

    public function storeWithoutCreate(string $url,$data,string $disk){

        if (count($data['image'])<3) {

            foreach ($this->getFile($data) as $image) {

                $tmp =$image->storeAs($url , $this->renameFile($image),$disk);

            }

          return $this->responseData('success create images',200);

        }else{

          throw new FileNumberException();
        }



   }

   public function successStoreImage($user,array $data=[]){

    $user->update([
        'upload_successful'=>true,
        'image'=>$this->renameFile($data['image'][0])
    ]);

}

    public function restore(array $data,$user){
        if ( count($data['image'])>0 && count($data['image'])<2) {

            $this->deleteImage($user);
            $this->storeWithoutCreate('uploads/article_image',$data ,$user->disk);
            $this->successStoreImage($user,$data);

            return $this->responseData("success update image",200);

        }else{

            return $this->responseError(['message'=>"old image remians the same ...try again if you want "],500);

        }

    }

    public function renameFile($data=[]){
            $fileName = time()."_".preg_replace('/\s+/','_',strtolower($this->getNameFile($data)));
            return $fileName;
    }

    public function getNameFile($data){

        return $data->getClientOriginalName();

     }

     public function deleteImage($user){

        if (Storage::disk($user->disk)->exists('uploads/article_image/'.$user->image)) {

            Storage::disk($user->disk)->delete('uploads/article_image/'.$user->image);
        }

    }


}
