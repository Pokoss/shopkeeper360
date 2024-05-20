<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    use HasFactory;

    protected $table = 'stock';

    protected $fillable = [
        'product_id',
        'quantity',
        'batch',
        'expiry_date',
        'created_by',
        'company_id',
    ];

    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
}
