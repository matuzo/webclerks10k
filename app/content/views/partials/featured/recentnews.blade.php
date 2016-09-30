@extends('partials.featured', ['classes' => '', 'id' => ''])

@section('featuredTitle', $currentPage->featuredTitle)

@section('featuredImage')
  <?php
    $featuredImage = getArticleImage($featurednews, array('image285', 'image435', 'full'));
    $src = explode(' ', $featuredImage['src'][0])[0];
    $srcset = implode(",", $featuredImage['src']);
  ?>
  <div class="ft__imgct ft__imgct--{{ $_SESSION['events_view'] }}" data-src="{{ $src }}" data-srcset="{{ $srcset }}" data-classes="ft__img" data-alt="{{$featuredImage['alt']}}">
  </div>
@endsection

@section('featuredContent')
  <h4 class="ft__ct__hl">{{ $featurednews->title->rendered }}</h4>

  {!! $featurednews->content->rendered !!}

  <a href="/news/{{$categoryslug}}" class="btn btn--round btn--small ft__btn ft__btn--close">
    <span class="svg-close icon--close icon ft__btn__icon">
      <span class="btn__text">
        Close
      </span>
    </span>
  </a>

@endsection
