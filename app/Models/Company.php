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
        'plan',
        'slogan',
        'status',
    ];
    public function category(){
        return $this->belongsTo(BusinessCategory::class,'category_id','id');
    }

    public function owner(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function employees(){
        return $this->hasMany(Employee::class, 'company_id', 'id');
    }

    public function users(){
        return $this->belongsToMany(User::class, 'employees', 'company_id', 'user_id')
            ->withPivot('position')
            ->withTimestamps();
    }

    // public function scopeNearest($query, $latitude, $longitude, $limit = 4)
    // {
    //     return $query->selectRaw("*, ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) as distance", [
    //             $longitude, $latitude
    //         ])
    //         ->orderBy('distance')
    //         ->limit($limit);
    // }
}

