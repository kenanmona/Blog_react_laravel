<?php
namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

Trait ImageUploadTrait
{

    protected static $default= "default.jpg";

    public function store(string $url,$data,string $disk){
        if (array_key_exists("image",$data)) {
            $tmp =$this->getFile($data)->storeAs($url , $this->renameFile($data),$disk);
        }

    }

    public function successStore(User $user){

        $user->update([
            'upload_successful'=>true
        ]);

    }

    public function successStoreImage($user,array $data=[]){

        $user->update([
            'upload_successful'=>true,
            'image'=>$this->renameFile($data)
        ]);

    }

    public function renameFile($data=[]){
        if (array_key_exists("image",$data)) {
            $fileName = time()."_".preg_replace('/\s+/','_',strtolower($this->getNameFile($data)));
            return $fileName;
        }else{
            return static::$default;
        }
    }


    public function getPath($data){

       return $this->getFile($data)->getPathName();

    }

    public function getNameFile($data){

       return $this->getFile($data)->getClientOriginalName();

    }

    public function getFile($data){
            return $data['image'] ;

    }

    /* delete image */
    public function deleteImage($user){

        if (Storage::disk($user->disk)->exists('uploads/user_image/'.$user->image) && $user->image!=static::$default) {

            Storage::disk($user->disk)->delete('uploads/user_image/'.$user->image);
        }

    }

    /*restore image in file */
    public function restore(array $data,$user){
        if (!$data['image']) {

        return $this->responseData("your old image remians the same ",200);

        }else{

            $this->deleteImage($user);
            $this->store('uploads/user_image',$data ,$user->disk);
            $this->successStoreImage($user,$data);

            return $this->responseData("success update image",200);

        }

    }
}
