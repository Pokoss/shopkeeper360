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
        'contacts',
        'category_id',
        'location',
        'email',
        'latitude',
        'longitude',
        'subscription_date',
        'subscription_expiry',
        'slogan',
        'status',
    ];
    public function category(){
        return $this->belongsTo(BusinessCategory::class,'category_id','id');
    }
}

