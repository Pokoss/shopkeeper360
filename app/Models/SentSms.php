<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SentSms extends Model
{
    use HasFactory;

    protected $table = 'sent_smses';

    protected $fillable = [
        'company_id',
        'sent_by',
        'message',
        'recipients',
        'total_sent',
        'total_failed',
        'status',
    ];

    protected $casts = [
        'recipients' => 'array',
        'total_sent' => 'integer',
        'total_failed' => 'integer',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sent_by');
    }
}
