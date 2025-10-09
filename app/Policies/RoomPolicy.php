<?php

namespace App\Policies;

use App\Models\Room;
use App\Models\User;

class RoomPolicy
{
    public function update(User $user, Room $room): bool
    {
        return $user->company_id === $room->company_id && 
               in_array($user->position, ['owner', 'admin']);
    }

    public function book(User $user, Room $room): bool
    {
        return $user->company_id === $room->company_id && 
               in_array($user->position, ['owner', 'admin', 'dispenser']);
    }
}
