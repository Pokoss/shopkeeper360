<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';
    protected $fillable = [
        'product_id',
        'sale_price',
        'cost_price',
        'sale_id',
        'quantity',
        'sold_by',
        'company_id',
    ];

    public function receipt(){
        return $this->belongsTo(Receipt::class,'sale_id','sale_id');
    }
    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
}
