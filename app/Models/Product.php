<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Product
 *
 * @property int $id
 * @property string|null $reference
 * @property string $description
 * @property string $type
 * @property string $price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ProductFactory factory(...$parameters)
 * @method static Builder|Product newModelQuery()
 * @method static Builder|Product newQuery()
 * @method static Builder|Product query()
 * @method static Builder|Product search($term)
 * @method static Builder|Product whereCreatedAt($value)
 * @method static Builder|Product whereDescription($value)
 * @method static Builder|Product whereId($value)
 * @method static Builder|Product wherePrice($value)
 * @method static Builder|Product whereReference($value)
 * @method static Builder|Product whereType($value)
 * @method static Builder|Product whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = ['reference','description','type','type'];

    public function scopeSearch(Builder $builder, $term)  
    {
        if(!is_null($term)){
            $term = mb_strtoupper($term);
            $builder->where("description","LIKE","%{$term}%");
        }

        return $builder;
    }
}
