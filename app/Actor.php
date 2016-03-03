<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
   protected $fillable = ['name', 'picture'];

   public function videos() {
   	return $this->belongsToMany('App\Video', 'video_actor');
   }
}
