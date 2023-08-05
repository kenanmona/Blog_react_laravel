<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model

{

    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'image',
        'article_id',
        'disk',
        'upload_successful'
    ];


    //Accessors

    public function getImageUrlAttribute()
    {
        return Storage::disk($this->disk)->url('uploads/article_image/'.$this->image);
    }


    // Relations

    public function article()
    {
        return $this->belongsTo(Article::class,'article_id','id');
    }

}
