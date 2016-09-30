@extends('partials.featured', ['classes' => '', 'id' => ''])

@section('featuredTitle', $currentPage->featuredTitle)

@section('featuredImage')
  <div class="ft__imgct ft__imgct--fullheight" data-src="/content/files/images/schaltkreis.jpg" data-classes="ft__imgct__img"></div>
@endsection

@section('featuredContent')
@endsection
