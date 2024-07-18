<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WholesaleSupplier extends Model
{
    use HasFactory;

    protected $table = 'wholesale_supplier';

    protected $fillable = [
        'name',
        'location',
        'contact',
        'address',
        'email'
    ];

}
