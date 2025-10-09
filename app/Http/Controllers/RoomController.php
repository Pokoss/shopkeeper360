<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomBooking;
use App\Models\BookingService;
use App\Models\Employee;
use App\Models\Receipt;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Validate and parse check-in/check-out datetimes from request.
     * Returns array: [Carbon $checkIn, Carbon $checkOut]
     * Throws ValidationException if invalid.
     */
    private function validateCheckInOut(Request $request)
    {
        $checkIn = $request->input('check_in');
        $checkOut = $request->input('check_out');
        if (!$checkIn || !$checkOut) {
            throw ValidationException::withMessages([
                'check_in' => ['Check-in and check-out times are required.'],
            ]);
        }
        try {
            $checkIn = Carbon::parse($checkIn);
            $checkOut = Carbon::parse($checkOut);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'check_in' => ['Invalid date/time format.'],
            ]);
        }
        if ($checkOut <= $checkIn) {
            throw ValidationException::withMessages([
                'check_out' => ['Check-out must be after check-in.'],
            ]);
        }
        return [$checkIn, $checkOut];
    }
    public function index($company, Request $request)
    {
        $comp = $this->getCompanyContext($company);

        $rooms = Room::where('company_id', $comp->company_id)
            ->when($request->type, function($query, $type) {
                return $query->where('type', $type);
            })
            ->when($request->status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->paginate(10);

        return Inertia::render('RoomManagement/IndexScreen', [
            'rooms' => $rooms,
            'company' => $comp
        ]);
    }

     public function store($company, Request $request)
    {
        $comp = $this->getCompanyContext($company);

        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'nightly_rate' => 'nullable|numeric|min:0',
            'daily_rate' => 'nullable|numeric|min:0',
            'weekly_rate' => 'nullable|numeric|min:0',
            'monthly_rate' => 'nullable|numeric|min:0',
        ]);

        Room::create([
            ...$request->only(['name','type','description','hourly_rate','nightly_rate','daily_rate','weekly_rate','monthly_rate']),
            'company_id' => $comp->company_id,
            'status' => 'available'
        ]);

        return redirect()->back()->with('message', 'Room created successfully');
    }

    public function update($company, Request $request, Room $room)
    {
        $comp = $this->getCompanyContext($company);

        if ($room->company_id !== $comp->company_id) {
            abort(404);
        }

        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'nightly_rate' => 'nullable|numeric|min:0',
            'daily_rate' => 'nullable|numeric|min:0',
            'weekly_rate' => 'nullable|numeric|min:0',
            'monthly_rate' => 'nullable|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance'
        ]);

        $room->update($request->all());

        return redirect()->back()->with('message', 'Room updated successfully');
    }

    public function book($company, Request $request, Room $room)
{
    $comp = $this->getCompanyContext($company);

    [$checkIn, $checkOut] = $this->validateCheckInOut($request);

    $request->validate([
        'guest_name' => 'required|string|max:255',
        'guest_phone' => 'required|string|max:255',
        'guest_email' => 'nullable|email|max:255',
        'number_of_guests' => 'required|integer|min:1',
        'rate_type' => 'required|in:hourly,nightly,daily,weekly,monthly'
    ]);

    // Prevent booking if room is under maintenance
    if ($room->status === 'maintenance') {
        throw ValidationException::withMessages([
            'room' => ['This room is currently under maintenance and cannot be booked.'],
        ]);
    }

    // Overlap check
    $overlap = RoomBooking::where('room_id', $room->id)
        ->where(function($q) use ($checkIn, $checkOut) {
            $q->whereBetween('check_in', [$checkIn, $checkOut])
              ->orWhereBetween('check_out', [$checkIn, $checkOut])
              ->orWhere(function($q2) use ($checkIn, $checkOut) {
                  $q2->where('check_in', '<=', $checkIn)
                     ->where('check_out', '>=', $checkOut);
              });
        })
        ->exists();

    if ($overlap) {
        throw ValidationException::withMessages([
            'check_in' => ['This room is already booked for the selected dates.'],
        ]);
    }

    $estimated = $this->calculateAmountByRateType($room, $checkIn, $checkOut, $request->rate_type);

    $booking = RoomBooking::create([
        'room_id' => $room->id,
        'check_in' => $checkIn,
        'check_out' => $checkOut,
        'guest_name' => $request->guest_name,
        'guest_phone' => $request->guest_phone,
        'guest_email' => $request->guest_email,
        'number_of_guests' => $request->number_of_guests,
        'company_id' => $comp->company_id,
        'status' => 'confirmed',
        'rate_type' => $request->rate_type,
        'estimated_amount' => $estimated,
        'total_amount' => null
    ]);

    return redirect()->back()->with('message', 'Room booked successfully');
}


    public function checkin($company, RoomBooking $booking)
    {
        $comp = $this->getCompanyContext($company);

        if ($booking->company_id !== $comp->company_id) {
            abort(403, 'Unauthorized action.');
        }

        if ($booking->status !== 'confirmed') {
            return redirect()->back()->with('error', 'This booking cannot be checked in.');
        }

        // Mark booking as checked in and set room status to occupied
        $booking->update([
            'status' => 'checked_in'
        ]);

        $booking->room->update(['status' => 'occupied']);

        return redirect()->back()->with('message', 'Guest checked in successfully');
    }

    public function checkout($company, Request $request, RoomBooking $booking)
{
    $comp = $this->getCompanyContext($company);

    if ($booking->company_id !== $comp->company_id) {
        abort(403, 'Unauthorized action.');
    }

    if ($booking->status !== 'checked_in') {
        return redirect()->back()->with('error', 'This booking cannot be checked out.');
    }

    $checkIn = Carbon::parse($booking->check_in);
    $actualCheckOut = Carbon::now(); // actual checkout time

    // Calculate final room cost based on booking.rate_type and actual duration
    $roomCost = $this->calculateAmountByRateType($booking->room, $checkIn, $actualCheckOut, $booking->rate_type);

    // Additional services cost
    $servicesCost = BookingService::where('room_booking_id', $booking->id)
        ->sum(DB::raw('price * quantity'));

    $totalAmount = $roomCost + $servicesCost;

    try {
        DB::beginTransaction();

        // Generate a unique sale ID
        $transaction_id = mt_rand(1000, 9999) . Carbon::now()->format('ymdHis');

        // Create receipt
        $receipt = Receipt::create([
            'sale_id' => $transaction_id,
            'sale_total' => $totalAmount,
            'discount' => $request->discount ?? 0,
            'sold_by' => Auth::id(),
            'company_id' => $comp->company_id
        ]);

        // Record the room sale
        Sale::create([
            'product_id' => null, // no product, it's a room
            'room_booking_id' => $booking->id,
            'quantity' => 1,
            'sale_price' => $roomCost,
            'cost_price' => 0, // optional, rooms may not have cost
            'sale_id' => $transaction_id,
            'sold_by' => Auth::id(),
            'company_id' => $comp->company_id,
            'type' => 'room'
        ]);

        // Update booking
        $booking->update([
            'status' => 'checked_out',
            'total_amount' => $totalAmount,
            'check_out' => $actualCheckOut,
        ]);

        // Set room to available if there are no other current checked-in bookings overlapping now
        $room = $booking->room;
        if (!$room->isCurrentlyOccupied()) {
            $room->update(['status' => 'available']);
        }

        DB::commit();
        return redirect()->back()->with('message', 'Checkout completed successfully');
    } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->back()->with('error', 'Error during checkout: ' . $e->getMessage());
    }
}


    public function cancel($company, RoomBooking $booking)
    {
        $comp = $this->getCompanyContext($company);

        if ($booking->company_id !== $comp->company_id) {
            abort(403, 'Unauthorized action.');
        }

        if (!in_array($booking->status, ['confirmed', 'checked_in'])) {
            return redirect()->back()->with('error', 'This booking cannot be cancelled.');
        }

        try {
            DB::beginTransaction();

            $booking->update(['status' => 'cancelled']);

            // if they were checked_in, free the room
            if ($booking->status === 'cancelled' && $booking->room) {
                if (! $booking->room->isCurrentlyOccupied()) {
                    $booking->room->update(['status' => 'available']);
                }
            }

            DB::commit();
            return redirect()->back()->with('message', 'Booking cancelled successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Error cancelling booking: ' . $e->getMessage());
        }
    }

    public function bookings($company, Request $request)
    {
        $comp = $this->getCompanyContext($company);

        $bookings = RoomBooking::where('company_id', $comp->company_id)
            ->with('room')
            ->when($request->status, function($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->date_from, function($query) use ($request) {
                return $query->where('check_in', '>=', $request->date_from);
            })
            ->when($request->date_to, function($query) use ($request) {
                return $query->where('check_out', '<=', $request->date_to);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('RoomManagement/BookingsScreen', [
            'bookings' => $bookings,
            'company' => $comp
        ]);
    }

    public function addService($company, Request $request, RoomBooking $booking)
    {
        $comp = $this->getCompanyContext($company);

        if ($booking->company_id !== $comp->company_id) {
            abort(404);
        }

        $request->validate([
            'service_id' => 'required|exists:services,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'required|numeric|min:0'
        ]);

        BookingService::create([
            'room_booking_id' => $booking->id,
            'service_id' => $request->service_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'cost_price' => $request->cost_price,
            'company_id' => $comp->company_id
        ]);

        return redirect()->back()->with('message', 'Service added successfully');
    }

    /* ---------- Helpers ---------- */

    private function getCompanyContext($company)
    {
        $comp = Employee::whereHas('company', function ($query) use ($company) {
            $query->where('slug', $company);
        })->with('company', 'user')->where('user_id', Auth::user()->id)->first();

        if (!$comp) {
            abort(404);
        }

        return $comp;
    }

    private function calculateAmountByRateType(Room $room, Carbon $checkIn, Carbon $checkOut, string $rateType): float
    {
        $durationHours = max(1, $checkIn->diffInHours($checkOut)); // at least 1 hour
        $durationDays = ceil($durationHours / 24);
        $durationWeeks = ceil($durationDays / 7);
        $durationMonths = ceil($durationDays / 30);

        switch ($rateType) {
            case 'hourly':
                $hours = ceil($durationHours);
                return ($room->hourly_rate ?? 0) * $hours;
            case 'nightly':
                // Calculate number of nights based on date boundaries:
                // If check_in and check_out cross nights, use ceil of nights
                $nights = max(1, ceil($durationHours / 24));
                return ($room->nightly_rate ?? 0) * $nights;
            case 'daily':
                $days = max(1, $durationDays);
                return ($room->daily_rate ?? 0) * $days;
            case 'weekly':
                $weeks = max(1, $durationWeeks);
                return ($room->weekly_rate ?? 0) * $weeks;
            case 'monthly':
                $months = max(1, $durationMonths);
                return ($room->monthly_rate ?? 0) * $months;
            default:
                return 0;
        }
    }
}
