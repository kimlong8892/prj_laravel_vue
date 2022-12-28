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

    protected $fillable = ['name', 'content', 'admin_id', 'image'];

    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function getImage(): string {
        if (!empty($this->image) && is_file(public_path($this->image))) {
            return asset($this->image);
        }

        return asset('images/not_found.png');
    }
}
