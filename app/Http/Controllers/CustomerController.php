<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Income;
use Exception;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('id','desc')
                            ->search(request('search'))
                            ->paginate(10);

        $request = request()->all(['search']);
        $request['search'] = (is_null($request['search']) ? "" : $request['search']);

        return Inertia::render('Customers/CustomerIndex',[
            'customers' => $customers,
            'queryParams' => $request
        ]);
    }

    public function create()
    {
        return Inertia::render('Customers/CustomerNew');
    }

    public function store(Request $request)
    {   
        $request->validate([
            'name' => 'required|min:5',
            'email' => 'nullable|email|unique:customers,email'
        ]);

        $data = $request->all();

        if($request->has('cpfcnpj')){
            $data['cpfcnpj'] = preg_replace('/[^0-9]/','', $request->cpfcnpj);
        }

        if($request->has('mobile')){
            $data['mobile'] = preg_replace('/[^0-9]/','', $request->mobile);
        }

        Customer::create($data);

        return redirect()->route('customer.index');
    }

    public function show(Customer $customer)
    {
        try{

            return Inertia::render('Customers/CustomerShow', [
                'customer' => $customer
            ]);
        } catch (Exception $e){
            return redirect()->back()->with('errors',$e->getMessage());
        }
    }

    public function update(Request $request)
    {   
        $this->rules['id'] = ['required', 'exists:customers,id'];
        $postData = $this->validate($request, $this->rules);

        $customerId = $postData['id'];

        $data = $request->all();

        if($request->has('cpfcnpj')){
            $data['cpfcnpj'] = preg_replace('/[^0-9]/','', $request->cpfcnpj);
        }

        if($request->has('mobile')){
            $data['mobile'] = preg_replace('/[^0-9]/','', $request->mobile);
        }

        Customer::where('id', $customerId)->update($data);

        return redirect()->back()->with('success', 'Registro atualizado com sucesso');
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        if(Income::where('customer_id',$customer->id)->count() > 0){
            return redirect()->back()->withError("O reguistro atual possui lançamentos no sistema, para remover este cliente é necessário excluir os registros.");
        }

        $customer->delete($id);

        return redirect()->route('customer.index')->withSuccess('Registro removido com sucesso!');
    }
}
