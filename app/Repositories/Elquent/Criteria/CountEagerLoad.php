<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class CountEagerLoad implements ICriterion{

    protected $relations;
    public function __construct( $relations)
    {
         $this->relations =$relations;
    }

    public function apply($model){
      return $model->withCount($this->relations);
    }

}
