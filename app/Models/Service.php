<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';
    
    protected $fillable = [
        'service_id',
        'name',
        'status',
        'company_id',
        'employee',
        
    ];

    public function employee(){
        return $this->belongsTo(User::class,'employee','id');
    }
    public function service_items(){
        return $this->hasMany(ServiceItem::class,'service_id','service_id');
    }
}
