<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\UpdateProfile;
use App\Traits\ImageProcess;
use App\Traits\ResponseTrait;
use App\Traits\SettingsTrait;
use App\Traits\UserTrait;

class SettingsController extends Controller
{
    use SettingsTrait , ImageProcess;

    /* update profile user */
    public function updateProfile(UpdateProfile $request)
    {

      return $this->updateUserFacade($request);

    }

    /* update password user */
    public function updatePassword(PasswordRequest $request){

      return $this->updatePasswordFacade($request);

    }

    /* update image */
    public function updateImageUser(ImageRequest $request){

        return $this->updateImageFacade($request->validated());

      }


    /* delete image */
    public function deleteImageUser(){

        return $this->deleteImageFacade();

      }



}
