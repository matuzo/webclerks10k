@extends('master', ['order' => 'featuredFirst', 'id' => ''])

@section('title', $currentPage->title)

@section('tabs')
  @include ('partials.tabs', ['pages' => $tabs, 'menu' => 'news', 'label' => 'Art der Neuigkeiten wählen'])
@endsection

@section('featured')
  @include('partials.featured.recentnews')
@endsection

@section('content')  
  @foreach ($news as $article)

    @php
      $articleClasses = 'art';

      if($article->acf->gesponsered) {
        $articleClasses .= ' art--sponsored';
      }
    @endphp

    <article class="{{$articleClasses}}" id="{{ $article->slug }}" role="article">
      
      <?php $url = $siteUrl.'news/'.$categoryslug.'/'.$article->slug; ?>
      
      @include ('partials.article_teaser')

    </article>
  @endforeach
@endsection