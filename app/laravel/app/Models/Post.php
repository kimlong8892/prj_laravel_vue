<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static find($id)
 */
class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = ['name', 'content'];

    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
