<?php

namespace App\Api\V1\Controllers;

use App\Site;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SiteController extends Controller
{
	use Helpers;

		/**
		 * Display a listing of the resource.
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function index()
		{
			$sites = Site::all();
			foreach ($sites as $site) {
				$site->videos = Site::find($id)->videos()->get();
			}
			return $sites;
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
			$site = new Site;

			$site->name = $request->get('name');
			$site->url = $request->get('url');

			if ($site->save())
				return $site;
			else
				return $this->response->error('could_not_create_site', 500);
		}

		/**
		 * Display the specified resource.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function show($id)
		{
			$site = Site::find($id);
			if (!$site)
				throw new NotFoundHttpException;
			$site->videos = Site::find($id)->videos()->get();
			return $site;
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
			$site = Site::find($id);
			if (!$site)
				throw new NotFoundHttpException;
			$site->fill($request->all());
			if($site->save())
				return $site;
			else
				return $this->response->error('could_not_update_site', 500);
		}

		/**
		 * Remove the specified resource from storage.
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function destroy($id)
		{
			$site = Site::find($id);
			if (!$site)
				throw new NotFoundHttpException;
			if ($site->delete())
				return $this->response->noContent();
			else
				return $this->response->error('could_not_delete_site', 500);
		}
}
