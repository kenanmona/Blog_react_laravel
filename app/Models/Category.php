<?php

namespace App\Models;

use Staudenmeir\EloquentEagerLimit\HasEagerLimit;

class Category extends BaseModel
{
    use HasEagerLimit;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'id',
        'name',
    ];

    //Relations
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

}
