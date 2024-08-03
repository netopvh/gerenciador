<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    
    public function index()
    {
        $suppliers = Supplier::orderBy('id', 'desc')
                            ->search(request('search'))            
                            ->paginate(10);

        $request = request()->all(['search']);
        $request['search'] = (is_null($request['search']) ? "" : $request['search']);

        return Inertia::render('Supplier/SupplierIndex', [
            'suppliers' =>  $suppliers,
            'queryParams' => $request
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|email'
        ]);
        
        $data = strip_empty_custom($request->all());

        if(isset($data['cpf_cnpj'])){
            $data['cpf_cnpj'] = preg_replace('/[^0-9]/','', $data['cpf_cnpj']);
        }

        if(isset($data['mobile'])){
            $data['mobile'] = preg_replace('/[^0-9]/','', $data['mobile']);
        }

        Supplier::create($data);

        return redirect()->back()->with('success', 'Registro inserido com sucesso!');
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $data = strip_empty_custom($request->except(['id','created_at','updated_at']));

        $supplier->update($data);

        return redirect()->back()->with('success', 'Registro atualizado com sucesso!');
    }

}
