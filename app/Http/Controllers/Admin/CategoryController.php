<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResourse;
use App\Http\Resources\CategoryWithArticleResource;
use App\Models\Category;
use App\Repositories\Contracts\ICategory;
use App\Traits\ResponseTrait;

class CategoryController extends Controller
{
    use ResponseTrait;
    protected $categoryRepo;

    public function __construct(ICategory $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function createCategory(CategoryRequest $request)
    {
        $category = $this->categoryRepo->create($request->validated());
        return new CategoryResourse($category);
    }

    public function updateCategory(Category $category, CategoryRequest $request)
    {
        $category = $this->categoryRepo->update($category, $request->validated());
        return $this->responseData("success update category", 200);

    }

    public function deleteCategory(Category $category)
    {
        if ($category->articles_count == 0) {
            $this->categoryRepo->delete($category);
            return $this->responseData('success delete category', 200);
        }
        return $this->responseData(' cannot delete this category', 500);

    }

    public function showAllCategory()
    {
        $categories = $this->categoryRepo->all();
        return CategoryResourse::collection($categories);
    }

    public function FindCategoryById(Category $category)
    {
        return new CategoryResourse($category);

    }

    public function showCategoryWithArticle()
    {
        $categories = $this->categoryRepo->showCategoryWithArticle();
        return CategoryWithArticleResource::collection($categories);

    }

}
