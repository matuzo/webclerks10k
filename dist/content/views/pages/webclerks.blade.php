@extends('master', ['order' => 'contentFirst'])

@section('title', $currentPage->title)

@section('featured')


  @each('partials.featured.webclerk', $webclerks, 'webclerk')
@endsection

@section('featuredNav')

  @include('partials.featured_nav', ['slug' => 'slug', 'all' => json_decode(json_encode($webclerks), true), 'url' => '/webclerks/', 'prevString' => 'Vorherige(r) webclerk', 'nextString' => ' Nächste(r) webclerk'])
@endsection

@section('content')
  <p>You are interested in the everything concerning websites? Cool, so are we! That’s the reason we founded web clerks: to get together with great people that work in the different fields of the web industry. </p>

  <strong>This meetup is for:</strong>

  <ul class="list">
    <li class="list__it"><span class="list__txt">Front- and Backend Developers</span></li>
    <li class="list__it"><span class="list__txt">UX/UI Designers</span></li>
    <li class="list__it"><span class="list__txt">sability, Accessibility, Marketing & SEO specialists</span></li>
    <li class="list__it"><span class="list__txt">and everyone interested in one of the above fields!</span></li>
  </ul>

  <h3 class="main-content__hl">How does this work?</h3>

  <p>We meet up once every 1,5 months to listen to talks, eat snacks, get to know each other and socialise. Everyone  is welcome, no matter your skill level, design tool of choice or programming language. We are looking forward to great events and interesting people!</p>

  <section class="team">
    <p class="team__lbl">
      <strong>The team</strong>
    </p>

    <ul class="image-list">
      @foreach ($webclerks as $webclerk)
        <li class="image-list__it">
          <a class="image-list__a" href="/webclerks/{{ $webclerk->slug }}#{{ $webclerk->slug }}">
            <div class="image-list__img" data-src="{{ getUserImage($webclerk->acf->twitterhandle, '', '') }}" data-classes="d"></div>
            <span class="visually-hidden">
              {{ $webclerk->title->rendered }}
            </span>
          </a>
        </li>
      @endforeach
    </ul>
  </section>
@endsection