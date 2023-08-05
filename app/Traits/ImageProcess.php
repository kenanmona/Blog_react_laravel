<?php
namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

Trait ImageProcess
{
    use ImageUploadTrait,UserTrait,ResponseTrait;

    /* update image */
     public function updateImageFacade(array $data){
        try {
           $user = $this->user();
           return $this->restore($data,$user);


            } catch (\Exception $th){
                //throw $th;
             return $this->responseError($th->getMessage(),500);

            }

     }
     /*delete image */
     public function deleteImageFacade(){
        try {
            $user = $this->user();
            $this->deleteImage($user);
            $this->successStoreImage($user);
            return $this->responseData('success delete your image',200);

             } catch (\Exception $th){
                 //throw $th;
              return $this->responseError($th->getMessage(),500);

             }


     }


}
