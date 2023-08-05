<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class EagerLoadWithClousre implements ICriterion{

    protected $relations;
    protected $clousre;
    public function __construct($relations,$clousre)
    {
         $this->relations =$relations;
         $this->clousre =$clousre;
    }

    public function apply($model){
      return $model->with([$this->relations => $this->clousre]);
    }

}

