<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int|null $income_id
 * @property int|null $expense_id
 * @property int $payment_method_id
 * @property string $received
 * @property string $date_payment
 * @property string|null $status
 * @property string|null $obs
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Expense|null $expense
 * @property-read \App\Models\Income|null $income
 * @property-read \App\Models\PaymentMethod $payment_method
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDatePayment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereExpenseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereIncomeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereObs($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction wherePaymentMethodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereReceived($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    use HasFactory;

     protected $fillable = ['income_id','expense_id','payment_method_id','received','date_payment','status','obs'];

     public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class, 'expense_id');
    }

    public function income()
    {
        return $this->belongsTo(Income::class, 'income_id');
    }
}
