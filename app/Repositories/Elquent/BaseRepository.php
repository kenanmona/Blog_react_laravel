<?php
namespace App\Repositories\Elquent;

use App\Exceptions\ModelNotFound;
use App\Repositories\Contracts\IBase;
use App\Repositories\Criteria\ICriteria;
use App\Traits\UserTrait;
use Illuminate\Support\Arr;

class BaseRepository implements IBase,ICriteria{

    use UserTrait;
    protected $model;

    public function __construct()
    {
        $this->model= $this->getModelClass();
    }

    public function withCriteria(...$criteria){
        $criteria = Arr::flatten($criteria);
        foreach ($criteria as $criterion) {
            $this->model = $criterion->apply($this->model);
        }
        return $this;
    }

    public function all(){
       $data = $this->model->lazy();
        return $data ;
    }

    public function get(){
       $data = $this->model->get();
        return $data ;
    }

    public function orderBy($coloum,$type='desc'){
       $data = $this->model->orderBy($coloum, $type)->lazy();
        return $data ;
    }

    public function allwithDeleted(){
       $data = $this->model->withTrashed()->lazy();
        return $data ;
    }

    public function find($model){
        return $model;
    }

    public function findFirst(){
        return $this->model->firstOrFail();
    }

    public function findLatest($num=4){
      return $this->model->latest()->take($num)->get();
    }

    public function findLatestFirst(){
      return $this->model->latest()->firstOrFail();
    }

    public function findWhere($column , $value){
        return $this->model->where($column , $value)->lazy();
    }

    public function findWhereWithMultiCondition($data){

        return $this->model->where($data)->lazy();

    }

    public function findWhereFirst($column , $value){

        return $this->model->where($column , $value)->firstOrFail();

    }

    public function paginate($perPage=10){

        return $this->model->paginate($perPage);

    }

    public function paginateWithDeleted($perPage=10){

        return $this->model->withTrashed()->paginate($perPage);

    }
    public function create($data){

        return $this->model->create($data);

    }
    public function update($model,$data){

        return $model->update($data);

    }

    public function delete($model){
        $model->delete();

    }

    public function getModelClass(){
        if (! method_exists($this,'model')) {
             throw new  ModelNotFound();
        }

         return app()->make($this->model());

    }

}
