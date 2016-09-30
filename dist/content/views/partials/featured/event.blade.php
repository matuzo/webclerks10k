<!-- htmlmin:ignore -->
@php
  $classes = 'ft__card--floated';
  $classes = '';

  if($event['date'] < time()) {
    $classes .= ' ft__card--past';
  }
  
  $imagePath = '/assets/images/webclerks_logo.svg';

  if(!empty($event['photo'])) {
    $imagePath = $event['photo'];
  }
@endphp
<!-- htmlmin:ignore -->

@extends('partials.featured', ['classes' => $classes, 'id' => "e{$event['slug']}-{$event['id']}"])

@if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal')
  @section('featuredImage')
    <div class="ft__imgct" data-src="{{ $imagePath }}" data-classes="event__img" data-alt=""></div>
  @overwrite
@endif

@section('featuredContent')

@if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal')
  <h4 class="ft__ct__hl">{{ $event['name'] }}</h4>
  @if(!empty($event['description']))
    {{ $event['description'] }}...
  @endif
@else
  <time class="ft__ct__date" datetime="{{ date('Y-m-d', $event['date']) }}">
    {{ date('d.m.Y, H:i', $event['date']) }}
  </time>
  <h4 class="ft__ct__hl">
    <a href="{{ $event['url'] }}" target="_blank" class="ft__ct__hl__l">
    {{ $event['name'] }}
    </a>
  </h4>
@endif

@if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal')
  <ul class="event__meta">
    <li class="event__meta__item"> {{ date('d.m.Y, H:i', $event['date']) }}</li>

      @if(!empty($event['venue']))
        <li class="event__meta__item"> {{ $event['venue'] }} </li>
      @endif

      @if(!empty($event['city']))
        <li class="event__meta__item"> {{ $event['city'] }} </li>
      @endif
  </ul>
@endif

  <a href="{{ $event['url'] }}" class="btn--round btn ft__btn">
    <span data-inlinesvg="more" class="btn__icon">
      <span class="btn__text">
        View event on meetup.com
      </span>
    </span>
  </a>

@if(!isset($error))
@endif
@overwrite