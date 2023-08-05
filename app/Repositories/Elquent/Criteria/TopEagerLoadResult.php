<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class TopEagerLoadResult implements ICriterion{

    protected $num;
    protected $type;
    protected $coloum;
    public function __construct($num,$type,$coloum)
    {
         $this->num =$num;
         $this->type =$type;
         $this->coloum =$coloum;
    }

    public function apply($model){
      return $model->orderBy($this->coloum,$this->type)->take($this->num);
    }
}
