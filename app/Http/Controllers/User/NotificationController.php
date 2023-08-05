<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function getNotification()
    {
        $date = auth()->user()->created_at;
        // return $date;
        $results = Notification::where('created_at', '>', $date)->latest()->limit(20)->get();
        return NotificationResource::collection($results);
    }
}
