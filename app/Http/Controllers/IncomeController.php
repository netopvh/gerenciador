<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Income;
use App\Models\PaymentMethod;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index()
    {
        $incomes = Income::with(['customer','transactions.payment_method','category'])
                            ->month(request('month'))
                            ->search(request('term'))
                            ->list(request('list'))
                            ->orderBy('due_date', 'asc')
                            ->paginate(10);

        $sumTotal = Income::selectRaw('SUM(receive) as total')
                            ->month(request('month'))
                            ->search(request('term'))
                            ->list(request('list'))
                            ->get()
                            ->first()->total;

        $months = Income::selectRaw('distinct DATE_FORMAT(due_date, "%m-%Y") as value, DATE_FORMAT(due_date, "%M %Y") as label')
                        ->orderByDesc('value')
                        ->get()->map(function($item){
                            return [
                                'value' => $item->value,
                                'label' => translate_month($item->label)
                            ];
                        })->values();

        $sumTotalReceived = Transaction::selectRaw('SUM(received) as total')->whereHas('income', function ($q) {
            $q->month(request('month'));
            $q->search(request('term'));
            $q->list(request('list'));
            $q->whereNotNull('income_id');
        })->get()->first()->total;

        $months->prepend(['value' => '', 'label' => 'Por Data']);

        $request = request()->all(['month','term','list']);
        $request['month'] = (is_null($request['month']) ? "" : $request['month']);
        $request['term'] = (is_null($request['term']) ? "" : $request['term']);
        $request['list'] = (is_null($request['list']) ? "" : $request['list']);
                        
        return Inertia::render('Income/IncomeIndex', [
            'incomes' => $incomes,
            'total' => $sumTotal,
            'months' => $months,
            'queryParams' => $request,
            'received' => $sumTotalReceived,
        ]);
    }

    public function create()
    {
        $categories = $this->getCategoriesSelect();
        $customers = $this->getCustomerSelect();


        return Inertia::render('Income/IncomeAdd', [
            'categories' => $categories,
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'category_id' => 'required',
            'due_date' => 'required|date',
            'parcels' => 'required',
            'receive' => 'required'
        ], [
            'customer_id.required' => 'Cliente é obrigatório',
            'category_id.required' => 'Centro de custo é obrigatório',
            'due_date.required' => 'Vencimento é obrigatório',
            'parcels.required' => 'É necessário informar ao menos uma parcela',
            'receive.required' => 'É necessário informar o valor a receber',
        ]);

        $qtParcelas = (int) $request->parcels;
        $dataAr = strip_empty_custom($request->all());

        $dataAr['receive'] = string_to_decimal($dataAr['receive']);

        if($qtParcelas == 1){
            Income::create($dataAr);
        } else {

            $primeiraParcela = $dataAr['due_date'];

            for($i=0;$i < $qtParcelas;$i++){

                $dataAr['due_date'] = Carbon::createFromFormat('Y-m-d', $primeiraParcela)->addMonths($i)->toDateString();

                Income::create($dataAr);
            }
        }

        return redirect()->route('income.index')->withSuccess("Registro inserido com sucesso");
    }

    public function show($id)
    {

        $income = Income::with(['customer','transactions.payment_method','category','receipt'])->findOrFail($id);
        $transactionsReceived = Transaction::selectRaw('SUM(received) as total')->where('income_id', $id)->get()->first()->total;
        $paymentMethods = PaymentMethod::orderByDesc('id')
                                        ->get()
                                        ->map(function($payment){
                                            return [
                                                            'value' => $payment->id,
                                                            'label' => $payment->name
                                                        ];
                                        })->unique('value')->values();   

        $request = request()->all(['month','term','list']);
        $request['month'] = (is_null($request['month']) ? "" : $request['month']);
        $request['term'] = (is_null($request['term']) ? "" : $request['term']);                                                                  
        $request['list'] = (is_null($request['list']) ? "" : $request['list']);

        return Inertia::render('Income/IncomeShow',[
            'income' => $income,
            'paymentMethods' => $paymentMethods,
            'transactionReceived' => $transactionsReceived,
            'queryParams' => $request,
        ]);
    }

    public function edit($id)
    {
        $income = Income::with(['customer','category'])->findOrFail($id);
        $categories = $this->getCategoriesSelect();
        $customers = $this->getCustomerSelect();

        return Inertia::render('Income/IncomeEdit',[
            'income' => $income,
            'categories' => $categories,
            'customers' => $customers
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'category_id' => 'required',
            'due_date' => 'required|date',
            'receive' => 'required'
        ], [
            'customer_id.required' => 'Cliente é obrigatório',
            'category_id.required' => 'Centro de custo é obrigatório',
            'due_date.required' => 'Vencimento é obrigatório',
            'receive.required' => 'É necessário informar o valor a receber',
        ]);

        $data = strip_empty_custom($request->all());

        $data['receive'] = str_replace(',', '.', $data['receive']);

        $income = Income::findOrFail($id);
        $incomeId = $income->id;

        $income->update($data);

        return redirect()->route('income.show',['id' => $incomeId])->withSuccess("Registro alterado com sucesso!");
    }

    public function destroy($id)
    {
        $income = Income::findOrFail(($id));

        $income->delete();

        if($income) {
            return redirect()->route('income.index')->with('success', 'Registro removido com sucesso!');
        }

    }

    private function getCustomerSelect()
    {
        return Customer::orderBy('id', 'asc')->get()->map(function($customer) {
            return [
                'value' => $customer->id,
                'label' => $customer->cod . ' - ' . $customer->name
            ];
        })->unique('value')->values();
    }

    private function getCategoriesSelect()
    {
        return Category::where('type','I')->get()->map(function($category) {
            return [
                'value' => $category->id,
                'label' => $category->title
            ];
        })->unique('value')->values();
    }
}
