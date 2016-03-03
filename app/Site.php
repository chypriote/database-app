<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
	protected $fillable = ['name', 'url'];

	public function videos() {
		return $this->hasMany('App\Video');
	}
}
