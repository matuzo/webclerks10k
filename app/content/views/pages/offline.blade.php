@extends('master', ['order' => 'featuredFirst'])

@section('title', $currentPage->title)

@section('featured')
  @include('partials.featured.offline')
@endsection

@section('content')
<p>Oh, Oh… it looks like the connection was interrupted. Please connect to the internet to see this page or visit one of the available offline pages:</p>

<div class="js-offline-pages"></div>
@endsection
