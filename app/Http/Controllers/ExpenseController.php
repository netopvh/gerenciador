<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use App\Models\PaymentMethod;
use App\Models\Supplier;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {

        $expenses = Expense::with(['supplier','transactions.payment_method','category'])
                            ->month(request('month'))
                            ->search(request('term'))
                            ->list(request('list'))
                            ->orderBy('due_date', 'asc')
                            ->paginate(10);

        $sumTotalPayable = Expense::selectRaw('SUM(payable) as total')
                            ->month(request('month'))
                            ->search(request('term'))
                            ->list(request('list'))
                            ->get()
                            ->first()->total;

        $sumTotalPaid = Transaction::selectRaw('SUM(received) as total')->whereHas('expense', function ($q) {
            $q->month(request('month'));
            $q->search(request('term'));
            $q->list(request('list'));
            $q->whereNotNull('expense_id');
        })->get()->first()->total;

        $months = Expense::selectRaw('distinct DATE_FORMAT(due_date, "%m-%Y") as value, DATE_FORMAT(due_date, "%M %Y") as label')
                        ->orderByDesc('value')
                        ->get()->map(function($item){
                            return [
                                'value' => $item->value,
                                'label' => translate_month($item->label)
                            ];
                        })->values();

        $months->prepend(['value' => '', 'label' => 'Por Data']);

        $request = request()->all(['month','term','list']);
        $request['month'] = (is_null($request['month']) ? "" : $request['month']);
        $request['term'] = (is_null($request['term']) ? "" : $request['term']);
        $request['list'] = (is_null($request['list']) ? "" : $request['list']);

        return Inertia::render('Expense/ExpenseIndex', [
            'expenses' => $expenses,
            'total' => $sumTotalPayable,
            'paid' => $sumTotalPaid,
            'months' => $months,
            'queryParams' => $request
        ]);
    }

    public function create()
    {
        $categories = $this->getCategoriesSelect();
        $suppliers = $this->getSupplierSelect();

        return Inertia::render('Expense/ExpenseAdd', [
            'categories' => $categories,
            'suppliers' => $suppliers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'category_id' => 'required|exists:categories,id',
            'due_date' => 'required|date',
            'payable' => 'required',
            'qtd' => 'required'
        ], [
            'supplier_id.required' => 'Fornecedor é obrigatório',
            'category_id.required' => 'Centro de custo é obrigatório',
            'due_date.required' => 'Vencimento é obrigatório',
            'payable.required' => 'Valor a pagar é obrigatório',
            'qtd.required' => 'Informe ao menos uma parcela',
        ]);

        $data = strip_empty_custom($request->all());

        $data['payable'] = string_to_decimal($data['payable']);
        $data['parcel'] = 1;

        $qtParcelas = (int) $data['qtd'];
        
        if(!isset($data['doc'])){
            $qtParcelas > 1 ? $data['doc'] = generate_expense_code():null;
        }

        if($qtParcelas == 1){
            Expense::create($data);
        } else {

            $primeiraParcela = $data['due_date'];

            for($i = 0;$i < $qtParcelas; $i++){
                    
                    $data['due_date'] = Carbon::createFromFormat('Y-m-d', $primeiraParcela)->addMonths($i)->toDateString();
                    $i < 1?:$data['parcel'] += 1;

                    Expense::create($data);
            }

            
        }

        return redirect()->route('expense.index')->with('success', 'Registro inserido com sucesso');
    }

    public function show($id)
    {
        $expense = Expense::with(['supplier', 'transactions.payment_method', 'category'])->findOrFail($id);
        $transactionsPaid = Transaction::selectRaw('SUM(received) as total')->where('expense_id', $id)->get()->first()->total;
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

        if($expense->doc != ""){
            $parcels = Expense::where('doc', '=', $expense->doc)->whereNotIn('id',[$expense->id])->get(['id','parcel','due_date','qtd','payable','status']);
        } else {
            $parcels = null;
        }

        return Inertia::render('Expense/ExpenseShow', [
            'expense' => $expense,
            'parcels' => $parcels,
            'transactionPaid' => $transactionsPaid,
            'paymentMethods' => $paymentMethods,
            'queryParams' => $request,
        ]);
    }

    public function edit($id)
    {
        $expense = Expense::with(['supplier', 'category'])->findOrFail($id);
        $categories = $this->getCategoriesSelect();
        $suppliers = $this->getSupplierSelect();

        return Inertia::render('Expense/ExpenseEdit', [
            'expense' => $expense,
            'categories' => $categories,
            'suppliers' => $suppliers
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'category_id' => 'required|exists:categories,id',
            'due_date' => 'required|date',
            'payable' => 'required',
        ], [
            'supplier_id.required' => 'Fornecedor é obrigatório',
            'category_id.required' => 'Centro de custo é obrigatório',
            'due_date.required' => 'Vencimento é obrigatório',
            'payable.required' => 'Valor a pagar é obrigatório',
        ]);

        $expense = Expense::findOrFail($id);
        $expenseId = $expense->id;

        $data = strip_empty_custom($request->all());

        $data['payable'] = str_replace(',', '.', $data['payable']);
        
        $expense->update($data);

        return redirect()->route('expense.show', ['id' => $expenseId])
                        ->withSuccess("Registro alterado com sucesso!");
    }

    public function destroy($id)
    {
        Expense::findOrFail($id)->delete();

        return redirect()->route('expense.index')->withSuccess("Registro removido com sucesso!");
    }

    public function parcels(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $data = strip_empty_custom($request->all());

        if($expense->qtd == 1){
            
            $qtParcels = (int) $data['qtd'];

            if($qtParcels > 1){

                $data['doc'] = generate_expense_code();

                $expense->update($data);

                $expenseData = Expense::findOrFail($id, ['supplier_id','category_id','doc','due_date','qtd','parcel','payable','status'])->toArray();

                $primeiraParcela = $expenseData['due_date'];

                for($i = 1;$i < $qtParcels; $i++){
                    
                    $expenseData['due_date'] = Carbon::createFromFormat('Y-m-d', $primeiraParcela)->addMonths($i)->toDateString();
                    $i < 1?:$expenseData['parcel'] += 1;

                    Expense::create($expenseData);
                }
            }
        }

        return redirect()->back()->with('success', 'Parcelas inseridas com sucesso!');
    }

    private function getSupplierSelect()
    {
        return Supplier::orderBy('id', 'asc')->get()->map(function($supplier) {
            return [
                'value' => $supplier->id,
                'label' => $supplier->name
            ];
        })->unique('value')->values();
    }

    private function getCategoriesSelect()
    {
        return Category::where('type','E')->get()->map(function($category) {
            return [
                'value' => $category->id,
                'label' => $category->title
            ];
        })->unique('value')->values();
    }
}
