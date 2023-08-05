<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class LoadByIdInCollection implements ICriterion{

    protected $column;
    protected $value;
    public function __construct( $column,$value)
    {
         $this->column =$column;
         $this->value =$value;
    }

    public function apply($model){
      return $model->whereIn($this->column,$this->value);
    }
}
