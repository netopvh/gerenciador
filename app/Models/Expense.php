<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Expense
 *
 * @property int $id
 * @property int $supplier_id
 * @property int $category_id
 * @property string|null $doc
 * @property string $due_date
 * @property string|null $qtd
 * @property int|null $parcel
 * @property string $payable
 * @property string|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Supplier $supplier
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Transaction[] $transactions
 * @property-read int|null $transactions_count
 * @method static \Database\Factories\ExpenseFactory factory(...$parameters)
 * @method static Builder|Expense list($list)
 * @method static Builder|Expense month($month)
 * @method static Builder|Expense newModelQuery()
 * @method static Builder|Expense newQuery()
 * @method static Builder|Expense query()
 * @method static Builder|Expense search($term)
 * @method static Builder|Expense whereCategoryId($value)
 * @method static Builder|Expense whereCreatedAt($value)
 * @method static Builder|Expense whereDoc($value)
 * @method static Builder|Expense whereDueDate($value)
 * @method static Builder|Expense whereId($value)
 * @method static Builder|Expense whereParcel($value)
 * @method static Builder|Expense wherePayable($value)
 * @method static Builder|Expense whereQtd($value)
 * @method static Builder|Expense whereStatus($value)
 * @method static Builder|Expense whereSupplierId($value)
 * @method static Builder|Expense whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'doc', 'supplier_id', 'category_id', 'due_date', 'qtd', 'parcel', 'payable', 'status'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'expense_id');
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
            $builder->whereHas('supplier', function($q) use ($term) {
                $q->where("name", "LIKE", "%{$term}%");
            })->orWhere("doc", "LIKE", "%{$term}%");
        }

        return $builder;
    }

    public function scopeList(Builder $builder, $list)  
    {
        if(!is_null($list)){
            if($list == "paid"){
                $builder->where('status','=','T');
            } else if ($list == "pay") {
                $builder->where('status','=','O');
            } else if ($list == "partial") {
                $builder->where('status','=','P');
            }
        }

        return $builder;
    }

    public function scopePeriod(Builder $builder, $startDate, $endDate)
    {
        if (!is_null($startDate) && !is_null($endDate)) {
            $builder->whereBetween('due_date', [
                Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay(),
                Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay(),
            ]);
        } elseif (!is_null($startDate)) {
            $builder->where('due_date', '>=', Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay());
        } elseif (!is_null($endDate)) {
            $builder->where('due_date', '<=', Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay());
        }

        return $builder;
    }

}
