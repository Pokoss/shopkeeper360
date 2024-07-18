<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WholesaleProduct extends Model
{
    use HasFactory;

    protected $table = 'wholesale_product';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category_id',
        'image',
        'price',
        'measurement',
        'supplier_id',
        'views'
    ];

    public function measurement(){
        return $this->hasOne(Measurement::class,'id','measurement');
    }

    public function supplier(){
        return $this->belongsTo(WholesaleSupplier::class,'supplier_id','id');
    }
    public function category(){
        return $this->belongsTo(WholesaleSupplier::class,'category_id','id');
    }
}
