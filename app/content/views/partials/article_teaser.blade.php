<?php
  $featuredImage = getArticleImage($article, array('thumb_small'));
  $src = explode(' ', $featuredImage['src'][0])[0];
  
  $containerClasses = 'art__imgct';

  if(strpos($src, 'webclerks_logo.svg')) {
    $containerClasses = 'art__imgct art__imgct--webclerks';
  }
?>

<a href="{{ $url }}" class="art__link js-article-link">
  
  <div class="{{ $containerClasses }}" data-src="{{ $src }}" data-classes="art__img" data-alt="{{$featuredImage['alt']}}">
  </div>  

  <h4 class="art__hl">
      {{ $article->title->rendered }}
  </h4>

  <p class="art__meta">
    <time datetime="{{ formatDate($article->date)->format("Y-m-d") }}">
      von webclerks am {{ formatDate($article->date)->format("d.F.Y") }}
    </time>
  </p>

  @if($article->acf->gesponsered)
    <p class="art__sponsored">
      <span class="visually-hidden">Dieser Artikel wurde </span>gesponsert
    </p>
  @endif
</a>