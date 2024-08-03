<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Supplier
 *
 * @property int $id
 * @property string $name
 * @property string|null $cpf_cnpj
 * @property string|null $email
 * @property string|null $mobile
 * @property string|null $address
 * @property string|null $number
 * @property string|null $district
 * @property string|null $complement
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|Supplier newModelQuery()
 * @method static Builder|Supplier newQuery()
 * @method static Builder|Supplier query()
 * @method static Builder|Supplier search($term)
 * @method static Builder|Supplier whereAddress($value)
 * @method static Builder|Supplier whereComplement($value)
 * @method static Builder|Supplier whereCpfCnpj($value)
 * @method static Builder|Supplier whereCreatedAt($value)
 * @method static Builder|Supplier whereDistrict($value)
 * @method static Builder|Supplier whereEmail($value)
 * @method static Builder|Supplier whereId($value)
 * @method static Builder|Supplier whereMobile($value)
 * @method static Builder|Supplier whereName($value)
 * @method static Builder|Supplier whereNumber($value)
 * @method static Builder|Supplier whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'cpf_cnpj', 'email', 'mobile', 'address', 'number', 'district', 'complement'
    ];

    public function getNameAttribute($value)
    {
        return mb_strtoupper($value);
    }

    public function scopeSearch(Builder $builder, $term)  
    {
        if(!is_null($term)){
            $term = mb_strtoupper($term);
            $builder->Where("name", "LIKE", "%{$term}%");
        }

        return $builder;
    }
}
