@extends('master', ['order' => 'contentFirst'])

@section('title', $currentPage->title)

@section('featured')
  @include('partials.featured.404')
@endsection

@section('content')
<p>Sorry, the page you are looking for doesn't exist. Take a run around the block or return to  <a href="news">the news</a> page</p>
@endsection
