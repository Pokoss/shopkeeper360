<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';
    
    protected $fillable = [
        'name',
        'brand',
        'measurement',
        'cost_price',
        'retail_price',
        'wholesale_price',
        'barcode',
        'available',
        'created_by',
        'company_id',
    ];

    public function measurement(){
        return $this->hasOne(Measurement::class,'id','measurement');
    }
}
