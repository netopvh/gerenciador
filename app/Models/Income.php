<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Income
 *
 * @property int $id
 * @property int $customer_id
 * @property int $category_id
 * @property int|null $payment_method_id
 * @property string $due_date
 * @property string $receive
 * @property string|null $status
 * @property int|null $parcels
 * @property string|null $received
 * @property string|null $obs
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Customer $customer
 * @property-read \App\Models\PaymentMethod|null $payment_method
 * @property-read \App\Models\Receipt|null $receipt
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Transaction[] $transactions
 * @property-read int|null $transactions_count
 * @method static \Database\Factories\IncomeFactory factory(...$parameters)
 * @method static Builder|Income list($list)
 * @method static Builder|Income month($month)
 * @method static Builder|Income newModelQuery()
 * @method static Builder|Income newQuery()
 * @method static Builder|Income query()
 * @method static Builder|Income search($term)
 * @method static Builder|Income whereCategoryId($value)
 * @method static Builder|Income whereCreatedAt($value)
 * @method static Builder|Income whereCustomerId($value)
 * @method static Builder|Income whereDueDate($value)
 * @method static Builder|Income whereId($value)
 * @method static Builder|Income whereObs($value)
 * @method static Builder|Income whereParcels($value)
 * @method static Builder|Income wherePaymentMethodId($value)
 * @method static Builder|Income whereReceive($value)
 * @method static Builder|Income whereReceived($value)
 * @method static Builder|Income whereStatus($value)
 * @method static Builder|Income whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Income extends Model
{
    use HasFactory;

    protected $fillable= [
        'due_date','customer_id','category_id','payment_method_id','receive','status','parcels','received','date_payment','obs'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function receipt()
    {
        return $this->hasOne(Receipt::class, 'income_id');
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'income_id');
    }

    public function scopeMonth(Builder $builder, $month)
    {
        if(!is_null($month)){
            $builder->whereBetween('due_date', [
                Carbon::createFromFormat('m-Y', $month)->startOfMonth(),
                Carbon::createFromFormat('m-Y', $month)->endOfMonth(),
            ]);
        }
    }

    public function scopeSearch(Builder $builder, $term)  
    {
        if(!is_null($term)){
            $term = mb_strtoupper($term);
            $builder->whereHas('customer', function($q) use ($term) {
                $q->where("cod", "LIKE", "%{$term}%")->orWhere("name", "LIKE", "%{$term}%");
                $q->orderBy("cod", "desc");
            });
        }

        return $builder;
    }

    public function scopeList(Builder $builder, $list)  
    {
        if(!is_null($list)){
            if($list == "received"){
                $builder->where('status','=','T');
            } else if ($list == "receive"){
                $builder->whereNull('status');
            } else if ($list == "partial"){
                $builder->where('status','=','P');
            }
        }

        return $builder;
    }
}
