<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'year',
        'image',
        'quantity',
        'category_id'
    ];

    public function category() {
        return $this-> belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleted(function (Vehicle $vehicle) {
            try {
                $image_name = explode('vehicles/', $vehicle['image']);
                Storage::disk('public')->delete('vehicles/'.$image_name[1]);
            } catch (Throwable) {
            }
        });
    }
}

