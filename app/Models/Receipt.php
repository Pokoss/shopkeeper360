<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $table = 'receipts';

    protected $fillable = [
        'sale_id',
        'sale_total',
        'sold_by',
        'discount',
        'company_id',
    ];

    public function sales(){
        return $this->hasMany(Sale::class,'sale_id','sale_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'sold_by','id');
    }
}
