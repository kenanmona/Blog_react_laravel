<?php
namespace App\Repositories\Contracts;

interface IArticle{
    public function showArticlePaginate($pag=10);
    public function showLatestArticle();
}
