<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavouriteBusiness extends Model
{
    use HasFactory;

    protected $table = 'favourite_business';

    protected $fillable = [
        'user_id',
        'company_id'
    ];

    public function company(){
        return $this->belongsTo(Company::class,'company_id','id');
    }
}
