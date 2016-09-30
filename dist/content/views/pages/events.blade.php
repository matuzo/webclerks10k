@extends('master', ['order' => 'featuredFirst'])

@section('title', $currentPage->title)

@section('featured')

@each('partials.featured.event', $eventsByPage, 'event')
  
  @if($_SESSION['events_view'] === 'list')
    @include ('partials.pagination')
  @else
    @section('featuredNav')
      @include('partials.featured_nav', ['slug' => 'id', 'all' => array_values($events), 'url' => $eventUrl, 'prevString' => 'Vorheriges Events', 'nextString' => 'Nächstes Event'])
    @endsection
  @endif
@endsection

@section('content')
  @if(isset($error))
    error :(
  @else
    @include('partials.cityfilter')

    @include('partials.event_view_nav')

    @include('partials.calendar')
  @endif
@endsection