<?php
namespace App\Repositories\Elquent;

use App\Models\Category;
use App\Repositories\Contracts\ICategory;
use App\Repositories\Elquent\Criteria\EagerLoadWithClousre;
use Illuminate\Database\Eloquent\Builder;

class CategoryRepository extends BaseRepository implements ICategory{


    public function showCategoryWithArticle($num=6){
       
        $categories=$this->withCriteria([
            new EagerLoadWithClousre('articles',function ($article) use($num){
                $article->latest()->limit($num)->lazy();
            })
        ]);
        return $categories->all();
       

    }

    public function model(){

        return Category::class;
     }


}
