<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'type',
        'description',
        'hourly_rate',
        'nightly_rate',
        'daily_rate',
        'weekly_rate',
        'monthly_rate',
        'status'
    ];

    public function bookings()
    {
        return $this->hasMany(RoomBooking::class);
    }

    /**
     * Check if room is available between two datetimes.
     * A room is unavailable if there exists a booking (not cancelled) that overlaps the requested period.
     */
    public function isAvailable(\DateTimeInterface $start, \DateTimeInterface $end): bool
    {
        // treat $start inclusive, $end exclusive
        return !$this->bookings()
            ->whereIn('status', ['confirmed', 'checked_in'])
            ->where(function ($q) use ($start, $end) {
                // overlap condition: booking.check_in < requested_end AND booking.check_out > requested_start
                $q->where('check_in', '<', $end)
                  ->where('check_out', '>', $start);
            })
            ->exists();
    }

    /**
     * Convenience to determine if the room is currently occupied (someone checked_in now).
     */
    public function isCurrentlyOccupied(): bool
    {
        return $this->bookings()
            ->where('status', 'checked_in')
            ->where('check_in', '<=', now())
            ->where('check_out', '>=', now())
            ->exists();
    }
}



