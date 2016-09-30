@extends('master', ['order' => 'featuredFirst'])

@section('title', $currentPage->title)

@section('featured')
  @include('partials.featured.imprint')
@endsection

@section('content')
  Eine GRAFIK???
@endsection 