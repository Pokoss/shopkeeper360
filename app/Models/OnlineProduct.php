<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineProduct extends Model
{
    use HasFactory;

    protected $table = 'online_product';

    protected $fillable = [
        'product_id',
        'slug',
        'category_id',
        'image',
        'company_id',
        'added_by',
        'description',
    ];

    public function product(){
        return $this->belongsTo(Product::class,'product_id','id');
    }
    public function category(){
        return $this->belongsTo(OnlineCategory::class,'category_id','id');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id','id');
    }
}
