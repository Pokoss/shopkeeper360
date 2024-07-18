<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WholesaleCategory extends Model
{
    use HasFactory;

    protected $table = 'wholesale_category';

    protected $fillable = [
        'name',
        'slug',
    ];
}
