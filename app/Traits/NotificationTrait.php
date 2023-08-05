<?php
namespace App\Traits;

use App\Models\Notification;

Trait NotificationTrait
{
    
    public function createNotification($user,$id){
        Notification::create([
            'message'=>'New article Add to website By '.$user,
            'article_id'=>$id,
        ]);
    }

}
