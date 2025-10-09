<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'company_id',
        'guest_name',
        'guest_phone',
        'guest_email',
        'number_of_guests',
        'check_in',
        'check_out',
        'rate_type',
        'status',
        'estimated_amount',
        'total_amount'
    ];

    protected $dates = [
        'check_in',
        'check_out',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function services()
    {
        return $this->hasMany(BookingService::class, 'room_booking_id');
    }
    
}
