<?php

namespace App\Api\V1\Controllers;

use App\Actor;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ActorController extends Controller
{
	use Helpers;

		/**
		 * Display a listing of the resource.
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function index()
		{
			$actors = Actor::all();
			foreach ($actors as $actor) {
				$actor->videos = Actor::find($id)->videos()->get();
			}
			return $actors;
		}

		/**
		 * Show the form for creating a new resource.
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function create()
		{
				//
		}

		/**
		 * Store a newly created resource in storage.
		 *
		 * @param  \Illuminate\Http\Request  $request
		 * @return \Illuminate\Http\Response
		 */
		public function store(Request $request)
		{
			$actor = new Actor;

			$actor->name = $request->get('name');
			$actor->picture = $request->get('picture');

			if ($actor->save())
				return $actor;
			else
				return $this->response->error('could_not_create_actor', 500);
		}

		/**
		 * Display the specified resource.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function show($id)
		{
			$actor = Actor::find($id);
			if (!$actor)
				throw new NotFoundHttpException;

			$actor->videos = Actor::find($id)->videos()->get();
			return $actor;
		}

		/**
		 * Show the form for editing the specified resource.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function edit($id)
		{
				//
		}

		/**
		 * Update the specified resource in storage.
		 *
		 * @param  \Illuminate\Http\Request  $request
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function update(Request $request, $id)
		{
			$actor = Actor::find($id);
			if (!$actor)
				throw new NotFoundHttpException;
			$actor->fill($request->all());
			if($actor->save())
				return $actor;
			else
				return $this->response->error('could_not_update_actor', 500);
		}

		/**
		 * Remove the specified resource from storage.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function destroy($id)
		{
			$actor = Actor::find($id);
			if (!$actor)
				throw new NotFoundHttpException;
			if ($actor->delete())
				return $this->response->noContent();
			else
				return $this->response->error('could_not_delete_actor', 500);
		}
}

