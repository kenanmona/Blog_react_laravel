<?php
namespace App\Repositories\Contracts;

interface IBase{
    public function get();
    public function all();
    public function allwithDeleted();
    public function find($model);
    public function findWhere($column , $value);
    public function findWhereWithMultiCondition(array $data);
    public function findWhereFirst($column , $value);
    public function paginate($perPage=10);
    public function paginateWithDeleted($perPage=10);
    public function create(array $data);
    public function update($model,array $data);
    public function delete($model);
    public function findFirst();
    public function findLatest();
    public function findLatestFirst();
    public function orderBy($coloum,$type='desc');
}
