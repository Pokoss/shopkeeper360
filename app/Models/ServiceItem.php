<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    protected $table = 'service_items';

    protected $fillable = [
        'product_id',
        'user_id',
        'company_id',
        'quantity',
    ];

    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
}
