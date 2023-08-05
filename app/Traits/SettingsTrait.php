<?php
namespace App\Traits;

trait SettingsTrait
{

    use ResponseTrait, UserTrait;

    /* update profile without password  */
    public function updateUserFacade($request)
    {

        $user = $this->me();
        $user->update(
            $request->validated()
        );
        return $this->responseData("success update user information", 200);

    }

    /* update password  */
    public function updatePasswordFacade($request)
    {
        $user = $this->me();
        $password = $request->only(['password']);
        $user->update(
            [
                'password' => bcrypt($password['password']),
            ]
        );
        return $this->responseData("success update password", 200);
    }

}
