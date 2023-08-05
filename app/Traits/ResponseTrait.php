<?php
namespace App\Traits;

Trait ResponseTrait{
     /*response success data */
     public function responseData($data,$code){
         return response()->json(['data'=>$data],$code);
        }
     /*response error */
    public function responseError($data,$code){
         return response()->json(['error'=>$data],$code);
    }

}
