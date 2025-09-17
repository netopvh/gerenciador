<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Income;
use App\Models\PaymentMethod;
use App\Models\Receipt;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptController extends Controller
{
    public function index()
    {
        $receipts = Receipt::with('customer')->search(request('term'))->paginate(10);

        $request = request()->all(['term']);
        $request['term'] = (is_null($request['term']) ? "" : $request['term']);

        return Inertia::render('Receipt/ReceiptIndex', [
            'receipts' => $receipts,
            'queryParams' => $request
        ]);
    }

    public function create()
    {
        $customers = $this->getCustomerSelect();

        return Inertia::render('Receipt/ReceiptCreate',[
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'receipt_date' => 'required|date'
        ]);

        $data = strip_empty_custom($request->all());
        // dd($data);
        $receipt = Receipt::create($data);

        return redirect()->route('receipt.show',['id' => $receipt->id]);
    }

    public function show($id, $type)
    {

        if($type == 'income'){
            $model = Income::with(['customer','transactions.payment_method','category'])->findOrFail($id);
            $totalTransaction = Transaction::selectRaw('SUM(received) as total')->where('income_id', $id)->get()->first()->total;
            $dateReceipt = Income::selectRaw('DATE_FORMAT(due_date, "%d %M %Y") as label')
                                        ->where('id', $id)
                                        ->get()->first(); 
            $paymentMethods = PaymentMethod::orderByDesc('id')
                                        ->get()
                                        ->map(function($payment){
                                            return [
                                                            'value' => $payment->id,
                                                            'label' => $payment->name
                                                        ];
                                        })->unique('value')->values();

            $receipt = Receipt::where('income_id', $model->id)->get()->first();
            if(is_null($receipt)){
                $receipt = Receipt::create([
                    'income_id' => $model->id,
                    'observations' => request('observations')
                ]);
            }
            
            return Inertia::render('Receipt/ReceiptShow',[
                'income' => $model,
                'paymentMethods' => $paymentMethods,
                'transactionReceived' => $totalTransaction,
                'receipt' => $receipt,
                'dateReceipt' => date_extenso($dateReceipt->label)
            ]);
        } else {

        }

        return;
    }

    public function pdf($id)
    {
        $income = Income::with(['customer','transactions.payment_method','category'])->findOrFail($id);
        $totalTransaction = Transaction::selectRaw('SUM(received) as total')->where('income_id', $id)->get()->first()->total ?? 0;
        $dateReceipt = Income::selectRaw('DATE_FORMAT(due_date, "%d %M %Y") as label')
                                    ->where('id', $id)
                                    ->get()->first(); 
        
        $receipt = Receipt::where('income_id', $income->id)->get()->first();
        if(is_null($receipt)){
            $receipt = Receipt::create([
                'income_id' => $income->id,
                'observations' => ''
            ]);
        }

        $data = [
            'income' => $income,
            'transactionReceived' => $totalTransaction,
            'receipt' => $receipt,
            'dateReceipt' => date_extenso($dateReceipt->label ?? ''),
            'formattedData' => [
                'formattedReceive' => 'R$ ' . number_format($income->receive, 2, ',', '.'),
                'formattedReceived' => 'R$ ' . number_format($totalTransaction, 2, ',', '.'),
                'formattedPending' => 'R$ ' . number_format($income->receive - $totalTransaction, 2, ',', '.'),
                'formattedCpfCnpj' => $this->mascaraDoc($income->customer->cpfcnpj ?? ''),
                'formattedDate' => date('d/m/Y'),
                'formattedDueDate' => date('d/m/Y', strtotime($income->due_date)),
            ]
        ];

        $pdf = Pdf::loadView('receipts.pdf', $data);
        $pdf->setPaper('A4', 'portrait');
        
        $filename = 'recibo-' . $income->customer->name . '-' . date('Y-m-d') . '.pdf';
        
        return $pdf->download($filename);
    }

    /**
     * Métodos Privados
     */

    private function getCustomerSelect()
    {
        return Customer::orderBy('id', 'asc')->get()->map(function($customer) {
            return [
                'value' => $customer->id,
                'label' => $customer->cod . ' - ' . $customer->name
            ];
        })->unique('value')->values();
    }

    private function mascaraDoc($valor)
    {
        if (empty($valor)) return '';
        if (strlen($valor) > 11) {
            return preg_replace('/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/', '$1.$2.$3/$4-$5', $valor);
        } else {
            return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $valor);
        }
    }
}
