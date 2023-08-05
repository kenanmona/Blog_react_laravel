<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'subject',
        'user_id',
        'article_id',
        'comment_id',
    ];
    //Relations
    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function article()
    {
        return $this->belongsTo(Article::class,'article_id','id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class,'comment_id','id');
    }

}
