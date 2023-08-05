<?php

namespace App\Models;

use Cviebrock\EloquentTaggable\Taggable;
use Staudenmeir\EloquentEagerLimit\HasEagerLimit;

class Article extends BaseModel
{
    use Taggable, HasEagerLimit;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'id',
        'title',
        'description',
        'user_id',
        'category_id',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withTrashed();
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function replies()
    {
        return $this->belongsTo(Comment::class, 'comment_id', 'id');
    }

}
