@extends('partials.featured', ['classes' => 'ft__card--no-headline', 'id' => $webclerk->slug])

@section('featuredImage')
  <div class="ft__imgct ft__imgct--fullheight" data-src="{{ getUserImage($webclerk->acf->twitterhandle, '', '', 600, false) }}" data-classes="ft__imgct__img"></div>
@overwrite

@section('featuredContent')

  <h3 class="ft__ct__hl ft__ct__hl--card">{{ $webclerk->title->rendered }}</h3>
  
  <p>
    {{ $webclerk->acf->aufgaben }}
  </p>
  
  {!! $webclerk->content->rendered !!}
  {!! $webclerk->acf->links !!}

 <a href="https://www.twitter.com/{{ $webclerk->acf->twitterhandle }}" class="btn--round btn ft__btn">
    <span data-inlinesvg="twitter" class="btn btn__icon">
      <span class="btn__text">
        view twitter page
      </span>
    </span>
  </a>

@overwrite
