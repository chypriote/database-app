<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideoActorTable extends Migration
{
		/**
		 * Run the migrations.
		 *
		 * @return void
		 */
		public function up()
		{
				Schema::create('video_actor', function (Blueprint $table) {
						$table->increments('id');

						$table->integer('video_id');
						$table->integer('actor_id');

						$table->timestamps();
				});
		}

		/**
		 * Reverse the migrations.
		 *
		 * @return void
		 */
		public function down()
		{
				Schema::drop('video_actor');
		}
}
