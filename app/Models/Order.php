<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'order_id',
        'user_id',
        'company_id',
        'order_total',
        'status',
        'location',
        'contact',
    ];

    public function items(){
        return $this->hasMany(OrderItem::class,'order_id','order_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
