<?php
namespace App\Repositories\Elquent;

use App\Models\Article;
use App\Repositories\Contracts\IArticle;
use App\Repositories\Elquent\Criteria\CountEagerLoad;
use App\Repositories\Elquent\Criteria\EagerLoad;
use App\Repositories\Elquent\Criteria\EagerLoadClousr;
use App\Repositories\Elquent\Criteria\EagerLoadUserColumn;
use App\Repositories\Elquent\Criteria\EagerLoadWhereHas;
use App\Repositories\Elquent\Criteria\EagerLoadWithClousre;
use App\Repositories\Elquent\Criteria\LoadById;
use App\Repositories\Elquent\Criteria\LoadByIdInCollection;
use App\Repositories\Elquent\Criteria\TopEagerLoadResult;

class ArticleRepository extends BaseRepository implements IArticle
{


    public function create($data){
        $user=['user_id'=>$this->user()->id];
        $article = parent::create(array_merge($data, $user));
        $article->tag($data['tag']);
        return $article;
    }

    public function update($model,$data){

        parent::update($model,$data);
        if (count($data['tag'])!=0){
           $model->retag($data['tag']);
        }

    }
    public function findWhereFirst($column , $value){

        $article = $this->withCriteria([new LoadById($column,$value),new EagerLoad(['images','comments']),new EagerLoadWithClousre('user',function ($query) {
            $query->select('id','name','image','disk');
        }),new CountEagerLoad('likes')]);

         return $article->findFirst();
    }

    public function showArticlePaginate($pag=10){

        $articles=$this->withCriteria([
            new EagerLoad('images'),
            new EagerLoadWithClousre('user',function ($query) {
                $query->select('id','name','image','disk');
            })]);
            return $articles->paginate($pag);
    }

    public function showLatestArticle($num=4){

           $articles=$this->withCriteria([
            new EagerLoad('images'),
            new EagerLoadWithClousre('user',function ($query) {
                $query->select('id','name','image','disk');
            })]);
            return $articles->findLatest($num);

    }

    public function showArticlesByCategory($column,$value,$num=10){

           $articles=$this->withCriteria([
            new LoadById($column,$value)
            ,
            new EagerLoad('images'),
            new EagerLoadWithClousre('user',function ($query) {
                $query->select('id','name','image','disk');
            })]);
            return $articles->paginate($num);

    }

    public function showArticlesByTag($tag_name,$num=10){

           $articles=$this->withCriteria([
            new EagerLoadWhereHas('tags',function($query)use($tag_name){
                $query->where('name',$tag_name);
            })
            ,
            new EagerLoad('images'),
            new EagerLoadWithClousre('user',function ($query) {
                $query->select('id','name','image','disk');
            })]);
            return $articles->paginate($num);

    }

    public function popularArticle(){

           $articles=$this->withCriteria([
            new CountEagerLoad('likes')
            ,
            new TopEagerLoadResult(3,'desc','likes_count')
            ,
            new EagerLoad('images'),
            new EagerLoadWithClousre('user',function ($query) {
                $query->select('id','name','image','disk');
            })]);
            return $articles->get();

    }


    public function model(){

        return Article::class;
     }
}
