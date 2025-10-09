<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';

    // Fillable fields for mass assignment
    protected $fillable = [
        'product_id',        // nullable for rooms
        'room_booking_id',   // nullable, only for room sales
        'quantity',
        'sale_price',
        'cost_price',
        'sale_id',           // links to receipt
        'sold_by',           // user id
        'company_id',
        'type',              // 'product' or 'room'
    ];

    /**
     * Link the sale to its receipt
     */
    public function receipt()
    {
        return $this->belongsTo(Receipt::class, 'sale_id', 'sale_id');
    }

    /**
     * Link the sale to the product (if type = 'product')
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    /**
     * Optionally, link the sale to a room booking (if type = 'room')
     */
    public function roomBooking()
    {
        return $this->belongsTo(RoomBooking::class, 'room_booking_id', 'id');
    }
}
