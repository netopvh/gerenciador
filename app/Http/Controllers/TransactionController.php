<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'date_payment' => 'required',
            'payment_method_id' => 'required',
            'received' => 'required',
        ]);

        $data = $request->all();
        $checkTotal = 0;
        $checkParcial = 0;
        $receiveOrPay = 0;
        if($data['type'] == "I"){
            $model = Income::with('transactions')->findOrFail($data['income_id']);
            $receiveOrPay = $model->receive;
        } else {
            $model = Expense::with('transactions')->findOrFail($data['expense_id']);
            $receiveOrPay = $model->payable;
        }

        $data['received'] = string_to_decimal($data['received']);

        if ($model->transactions->count() <= 0){
            $checkTotal = $data['received'];
        } else {
            $checkParcial = $data['received'] + $model->transactions->sum('received');
        }

        if ($checkTotal > $receiveOrPay){
            $model->payable = $checkTotal;
        }

        if ($receiveOrPay == $checkTotal || $checkTotal > $receiveOrPay || $checkParcial == $receiveOrPay){
            $model->status = "T";
        } else {
            $model->status = "P";
        }

        Transaction::create($data);
        $model->save();

        return redirect()->back()->with('success', 'Baixa realizada com sucesso');
    }

    public function destroy($id)
    {
        Transaction::findOrFail($id)->delete();

        return redirect()->back()->withSuccess("Transação removida com sucesso!");
    }
}
