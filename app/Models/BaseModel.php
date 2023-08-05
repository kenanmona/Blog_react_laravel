<?php

namespace App\Models;

use App\Scopes\GlobalScope\DeleteScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    use SoftDeletes,HasFactory;

}


