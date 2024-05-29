<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineCategory extends Model
{
    use HasFactory;

    protected $table = 'online_category';

    protected $fillable = [
        'name',
        'company_id',
        'added_by'
    ];

    public function product(){
        return $this->hasMany(OnlineProduct::class,'id','category_id');
    }
}
