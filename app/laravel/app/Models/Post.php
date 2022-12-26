<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}