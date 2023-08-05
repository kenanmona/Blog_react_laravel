<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class EagerLoadWhereHas implements ICriterion{

    protected $relations;
    protected $clousre;

    public function __construct( $relations,$clousre)
    {
         $this->relations =$relations;
         $this->clousre =$clousre;
    }

    public function apply($model){
      return $model->whereHas($this->relations,$this->clousre);
    }

}
