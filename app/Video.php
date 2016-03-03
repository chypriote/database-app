<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
	protected $fillabel = ['title', 'rating'];

	public function actors() {
		return $this->belongsToMany('App\Actor', 'video_actor');
	}

	public function site() {
		return $this->belongsTo('App\Site');
	}
}
