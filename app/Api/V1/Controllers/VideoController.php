<?php

namespace App\Api\V1\Controllers;

use App\Video;
use App\Site;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class VideoController extends Controller
{
	use Helpers;

		/**
		 * Display a listing of the resource.
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function index()
		{
			$videos = Video::all();
			foreach ($videos as $video) {
				$video->actors = Video::find($video->id)->actors()->get();
			}
			return $videos;
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
			$video = new Video;

			$video->title = $request->get('title');
			$video->rating = $request->get('rating');

			//Save le site
			$site = Site::find($request->get('site_id'));
			$video->site()->associate($site);

			if ($video->save()) {
				//Save les acteurs
				$actors = json_decode($request->get('actors'));
				foreach ($actors->ids as $id) {
					$video->actors()->attach($id);
				}

				$video->site = $site;
				$video->actors = $video->actors()->get();
				return $video;
			}
			else
				return $this->response->error('could_not_create_video', 500);
		}

		/**
		 * Display the specified resource.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function show($id)
		{
			$video = Video::find($id);
			if (!$video)
				throw new NotFoundHttpException;

			$video->site = Video::find($id)->site()->get();
			$video->actors = Video::find($id)->actors()->get();
			return $video;
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
			$video = Video::find($id);
			if (!$video)
				throw new NotFoundHttpException;
			$video->fill($request->all());
			if($video->save())
				return $video;
			else
				return $this->response->error('could_not_update_video', 500);
		}

		/**
		 * Remove the specified resource from storage.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function destroy($id)
		{
			$video = Video::find($id);
			if (!$video)
				throw new NotFoundHttpException;
			if ($video->delete())
				return $this->response->noContent();
			else
				return $this->response->error('could_not_delete_video', 500);
		}
}

