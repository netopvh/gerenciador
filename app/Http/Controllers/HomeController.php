<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Expense;
use App\Models\Income;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestCustomers = Customer::orderBy('id','desc')->take(5)->get();
        $totalCustomers = Customer::count();
        $totalIncome = Income::selectRaw("SUM(receive) AS total")->first()->total;
        $totalExpenses = Expense::selectRaw("SUM(payable) AS total")->first()->total;

        $incomeGraphLabel = Income::selectRaw('distinct DATE_FORMAT(due_date, "%m-%Y") as value, DATE_FORMAT(due_date, "%M %Y") as label')
                        ->orderBy('value','desc')
                        ->limit(6)
                        ->get()->map(function($item){
                            return translate_month($item->label);
                        })->values();

        return Inertia::render('Dashboard',[
            'customers' => $latestCustomers,
            'totalCustomers' => $totalCustomers,
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpenses,
            'incomeLabel' => $incomeGraphLabel
        ]);
    }
}
