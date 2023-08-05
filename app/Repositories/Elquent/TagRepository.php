<?php
namespace App\Repositories\Elquent;

use App\Repositories\Contracts\ITag;
use Cviebrock\EloquentTaggable\Models\Tag;

class TagRepository extends BaseRepository implements ITag{

    public function model(){
        return Tag::class;
    }

}
