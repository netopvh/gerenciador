<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});


Route::middleware(['auth', 'verified'])->group(function(){

    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
    
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('customer.index');
        Route::get('/create', [CustomerController::class, 'create'])->name('customer.create');
        Route::post('/store', [CustomerController::class, 'store'])->name('customer.store');
        Route::get('/{customer}', [CustomerController::class, 'show'])->name('customer.show');
        Route::post('/update', [CustomerController::class, 'update'])->name('customer.update');
        Route::delete('/destroy/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');
    });

    Route::prefix('suppliers')->group(function () {
        Route::get('/', [SupplierController::class, 'index'])->name('supplier.index');
        Route::post('/store', [SupplierController::class, 'store'])->name('supplier.store');
        Route::put('/{id}', [SupplierController::class, 'update'])->name('supplier.update');
    });

    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::get('/create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('/', [CategoryController::class, 'store'])->name('category.store');
    });

    Route::prefix('expenses')->group(function () {
        Route::get('/', [ExpenseController::class, 'index'])->name('expense.index');
        Route::get('/create', [ExpenseController::class, 'create'])->name('expense.create');
        Route::post('/store', [ExpenseController::class, 'store'])->name('expense.store');
        Route::get('/show/{id}', [ExpenseController::class, 'show'])->name('expense.show');
        Route::get('/edit/{id}', [ExpenseController::class, 'edit'])->name('expense.edit');
        Route::put('/edit/{id}', [ExpenseController::class, 'update'])->name('expense.update');
        Route::post('/parcels/{id}', [ExpenseController::class, 'parcels'])->name('expense.parcels');
        Route::delete('/destroy/{id}', [ExpenseController::class, 'destroy'])->name('expense.destroy');
    });

    Route::prefix('incomes')->group(function () {
        Route::get('/', [IncomeController::class, 'index'])->name('income.index');
        Route::get('/create', [IncomeController::class, 'create'])->name('income.create');
        Route::post('/', [IncomeController::class, 'store'])->name('income.store');
        Route::get('/show/{id}', [IncomeController::class, 'show'])->name('income.show');
        Route::get('/edit/{id}', [IncomeController::class, 'edit'])->name('income.edit');
        Route::put('/{id}', [IncomeController::class, 'update'])->name('income.update');
        Route::delete('/destroy/{id}', [IncomeController::class, 'destroy'])->name('income.destroy');
    });

    Route::prefix('transactions')->name('transaction.')->group(function () {
        Route::post('/', [TransactionController::class, 'store'])->name('store');
        Route::delete('/{id}', [TransactionController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('products')->name('product.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::put('/{id}', [ProductController::class, 'update'])->name('update');
    });

    Route::prefix('receipts')->name('receipt.')->group(function(){
        Route::get('/', [ReceiptController::class, 'index'])->name('index');
        Route::get('/create', [ReceiptController::class, 'create'])->name('create');
        Route::post('/create', [ReceiptController::class, 'store'])->name('store');
        Route::post('/show/{id}/{type}', [ReceiptController::class, 'show'])->name('show');
    });

    Route::prefix('services')->group(function () {
        Route::get('/', [ServiceController::class, 'index'])->name('service.index');
    });
});

require __DIR__.'/auth.php';
