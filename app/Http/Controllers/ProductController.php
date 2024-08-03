<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->search(request('term'))->paginate(10);

        $request = request()->all(['term']);
        $request['term'] = (is_null($request['term']) ? "" : $request['term']);

        return Inertia::render('Product/ProductIndex', [
            'products' => $products,
            'queryParams' => $request,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'type' => 'required',
            'price' => 'required'
        ]);

        $data = strip_empty_custom($request->all());
        $data['price'] = string_to_decimal($data['price']);

        Product::create($data);

        return redirect()->back()->with('success', 'Registro inserido com sucesso!'); 
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'required',
            'type' => 'required',
            'price' => 'required'
        ]);

        $data = strip_empty_custom($request->all());
        $data['price'] = string_to_decimal($data['price']);

        Product::find($id)->update($data);

        return redirect()->back()->with('success', 'Registro alterado com sucesso!'); 
    }
}
