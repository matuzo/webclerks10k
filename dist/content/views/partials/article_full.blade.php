<p><a href="/news/{{ $categoryslug }}">Zurück zur Übersicht</a></p>

<?php
  $featuredImage = getArticleImage($article, 'medium');
  $category = $article->_embedded->{'wp:term'}[0][0]->name;
  $tags = $article->_embedded->{'wp:term'}[1];
?>
          
<h3>
    {{ $article->title->rendered }}
</h3>

<p>
  <time datetime="{{ formatDate($article->date)->format("Y-m-d") }}">
    {{ formatDate($article->date)->format("d.m.Y") }}
  </time>
  
  @if($article->acf->gesponsered)
    gesponsered
  @endif
</p>

{!! $article->content->rendered !!}

<p>Kategorie: {{ $category }}</p>

@foreach ($tags as $tag)
  <?php
    $tag_link = str_replace('http://content.webclerks.at/', $siteUrl.'news/', $tag->link);;
  ?>
  <span>
    <a href="{{ $tag_link }}">
      {{ $tag->name }}
    </a>
  </span>
@endforeach

<div class="share">
  <a href="whatsapp://send?text={{ $url }}" data-action="share/whatsapp/share">Share via Whatsapp</a>

  <?php
    $twitterUrl = "https://twitter.com/intent/tweet?text=".$article->title->rendered."&url=".$url;
  ?>

  <a class="twitter-share-button" data-size="large" href="{{urlencode($twitterUrl)}}">Tweet</a>

  <div class="fb-share-button" data-href="{{ $url }}" data-layout="button"></div>
</div>

<p>
  <a href="/news/{{ $categoryslug }}">Zurück zur Übersicht</a>
</p>