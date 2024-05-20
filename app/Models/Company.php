<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'company';

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'contact',
        'location',
        'email',
    ];
    // public function events(){
    //     return $this->hasMany(Event::class);
    // }
}

