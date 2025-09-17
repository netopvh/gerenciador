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
    public function index(Request $request)
    {
        // Filtros de período - padrão é o mês atual
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->endOfMonth()->format('Y-m-d'));
        
        $latestCustomers = Customer::orderBy('id','desc')->take(5)->get();
        $totalCustomers = Customer::count();
        
        // Totais do período selecionado
        $totalIncome = Income::whereBetween('due_date', [$startDate, $endDate])
                            ->selectRaw("SUM(receive) AS total")
                            ->first();
        $totalIncome = $totalIncome ? $totalIncome->total : 0;
                            
        $totalExpenses = Expense::whereBetween('due_date', [$startDate, $endDate])
                              ->selectRaw("SUM(payable) AS total")
                              ->first();
        $totalExpenses = $totalExpenses ? $totalExpenses->total : 0;

        // Dados para gráficos - receitas por dia
        $incomeChartData = Income::selectRaw('DATE(due_date) as date, SUM(receive) as total')
            ->whereBetween('due_date', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Dados para gráficos - despesas por dia
        $expenseChartData = Expense::selectRaw('DATE(due_date) as date, SUM(payable) as total')
            ->whereBetween('due_date', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Dados para gráfico de comparação mensal
        $monthlyComparison = [];
        $currentMonth = Carbon::parse($startDate)->format('Y-m');
        $lastMonth = Carbon::parse($startDate)->subMonth()->format('Y-m');
        
        // Receitas do mês atual
        $currentMonthIncome = Income::whereBetween('due_date', [
            Carbon::parse($startDate)->startOfMonth(),
            Carbon::parse($endDate)->endOfMonth()
        ])->sum('receive');
        
        // Receitas do mês anterior
        $lastMonthIncome = Income::whereBetween('due_date', [
            Carbon::parse($startDate)->subMonth()->startOfMonth(),
            Carbon::parse($startDate)->subMonth()->endOfMonth()
        ])->sum('receive');
        
        // Despesas do mês atual
        $currentMonthExpense = Expense::whereBetween('due_date', [
            Carbon::parse($startDate)->startOfMonth(),
            Carbon::parse($endDate)->endOfMonth()
        ])->sum('payable');
        
        // Despesas do mês anterior
        $lastMonthExpense = Expense::whereBetween('due_date', [
            Carbon::parse($startDate)->subMonth()->startOfMonth(),
            Carbon::parse($startDate)->subMonth()->endOfMonth()
        ])->sum('payable');

        $monthlyComparison = [
            'current_month' => [
                'income' => $currentMonthIncome,
                'expense' => $currentMonthExpense,
                'period' => $currentMonth
            ],
            'last_month' => [
                'income' => $lastMonthIncome,
                'expense' => $lastMonthExpense,
                'period' => $lastMonth
            ]
        ];

        return Inertia::render('Dashboard',[
            'customers' => $latestCustomers,
            'totalCustomers' => $totalCustomers,
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpenses,
            'incomeLabel' => [],
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'chartData' => [
                'income' => $incomeChartData,
                'expense' => $expenseChartData,
                'monthly_comparison' => $monthlyComparison
            ]
        ]);
    }
}
