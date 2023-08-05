<?php
namespace App\Repositories\Elquent\Criteria;

use App\Repositories\Criteria\ICriterion;

class LoadById implements ICriterion{

    protected $column;
    protected $value;
    public function __construct( $column,$value)
    {
         $this->column =$column;
         $this->value =$value;
    }

    public function apply($model){
      return $model->where($this->column,$this->value);
    }
}
