<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('id','desc')->paginate(10);

        return Inertia::render('Category/CategoryIndex',[
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Category/CategoryAdd');
    }

    public function store(Request $request)
    {       
        $request->validate([
            'title' => 'required|min:3|string',
            'type' => 'required|in:E,I'
        ]);

        Category::create($request->all());

        return redirect()->route('category.index')->with('success','Categoria criada com sucesso');
    }
}
