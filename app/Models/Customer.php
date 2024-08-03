<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Log;

/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string|null $cod
 * @property string $name
 * @property string|null $email
 * @property string|null $mobile
 * @property string|null $cpfcnpj
 * @property string $status
 * @property string|null $address
 * @property string|null $number
 * @property string|null $district
 * @property string|null $complement
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\CustomerFactory factory(...$parameters)
 * @method static Builder|Customer newModelQuery()
 * @method static Builder|Customer newQuery()
 * @method static Builder|Customer query()
 * @method static Builder|Customer search($term)
 * @method static Builder|Customer whereAddress($value)
 * @method static Builder|Customer whereCod($value)
 * @method static Builder|Customer whereComplement($value)
 * @method static Builder|Customer whereCpfcnpj($value)
 * @method static Builder|Customer whereCreatedAt($value)
 * @method static Builder|Customer whereDistrict($value)
 * @method static Builder|Customer whereEmail($value)
 * @method static Builder|Customer whereId($value)
 * @method static Builder|Customer whereMobile($value)
 * @method static Builder|Customer whereName($value)
 * @method static Builder|Customer whereNumber($value)
 * @method static Builder|Customer whereStatus($value)
 * @method static Builder|Customer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['cod','name','email','mobile','cpfcnpj','address','number','district'];
    

    public function getCodAttribute($value)
    {
        return mb_strtoupper($value);
    }

    public function getNameAttribute($value)
    {
        return mb_strtoupper($value);
    }

    public function getCpfcnpjAttribute($value)
    {
        if(strlen($value) > 0){
            return $value;
        } else {
            return "";
        }

    }

    public function getMobileAttribute($value)
    {
        if(strlen($value) > 0){
            return $value;
        } else {
            return "";
        }
    }

    public function getEmailAttribute($value)
    {
        if(strlen($value) > 0){
            return $value;
        }
        return "";
    }

    public function getAddressAttribute($value)
    {
        if(is_null($value)){
            return "";
        }
        return $value;
    }

    public function getNumberAttribute($value)
    {
        if(is_null($value)){
            return "";
        }
        return $value;
    }

    public function getDistrictAttribute($value)
    {
        if(is_null($value)){
            return "";
        }
        return $value;
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
