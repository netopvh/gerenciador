<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Receipt
 *
 * @property int $id
 * @property int|null $income_id
 * @property int|null $expense_id
 * @property string|null $observations
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|Receipt newModelQuery()
 * @method static Builder|Receipt newQuery()
 * @method static Builder|Receipt query()
 * @method static Builder|Receipt search($term)
 * @method static Builder|Receipt whereCreatedAt($value)
 * @method static Builder|Receipt whereExpenseId($value)
 * @method static Builder|Receipt whereId($value)
 * @method static Builder|Receipt whereIncomeId($value)
 * @method static Builder|Receipt whereObservations($value)
 * @method static Builder|Receipt whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Receipt extends Model
{
    use HasFactory;

    protected $fillable = ['income_id','expense_id','observations'];

    public function scopeSearch(Builder $builder, $term)  
    {
        if(!is_null($term)){
            $term = mb_strtoupper($term);
            $builder->where("description","LIKE","%{$term}%");
        }

        return $builder;
    }
}
