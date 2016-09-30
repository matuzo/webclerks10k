@extends('master', ['order' => 'featuredFirst'])

@section('title', 'Meetups')

@section('tabs')
  @include ('partials.tabs', ['pages' => $tabs, 'menu' => 'meetup', 'label' => 'Aktuelle oder Vergangene Meetups'])
@endsection

@section('featured')
  @include ('partials.featured.pastmeetups')
@endsection

@section('content')
<section>
  <h4 class="main-content__subhl">webclerks Meetup #3</h4>

  <p class="main-content__meta">
    <span class="main-content__meta__date">15. Jun 2016 -</span>
    <a class="main-content__meta__place" href="http://www.stockwerk.co.at/">Stockwerk</a>
  </p>

  <div data-src="/content/files/images/meetup3.jpg" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>
  <a href="https://www.meetup.com/webclerks/photos/27068181/" class="main-content__link">Pictures of the event</a>

  <h5 class="list-img-info__subhl">Talks &amp; Vortragende</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('3x14159265', '', '') }}" data-alt="webclerks Meetup #3" data-classes="list-img-info__item__img"></div>

      <h6 class="list-img-info__item__talk">Clippy’s Revenge - chatbots are taking over</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">David Pichsenmeister</span>
        <a class="item__des__link" href="https://twitter.com/3x14159265">@3x14159265</a>
      </p>
    </li>

    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('meineartfeder', '', '') }}" data-alt="webclerks Meetup #3" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Webfont Performance</h6>

      <p  class="list-img-info__item__des">
        <span  class="item__des__name">Franziska Eder</span>
        <a class="item__des__link" href="https://twitter.com/meineartfeder">@meineartfeder</a>
      </p>
    </li>
    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('klappradla', '', '') }}" data-alt="webclerks Meetup #3" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">MINASWAN for everyone</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Max Mulatz</span>
        <a class="item__des__link" href="https://twitter.com/klappradla">@klappradla</a>
      </p>
    </li>
  </ul>

  <h5 class="list-img-info__subhl">Sponsoren</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="/content/files/images/pixelart.jpg" data-alt="Pixelart - webclerks Meetup #3 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
      <div data-src="/content/files/images/stockwerk_logo.png" data-alt="Stockwerkt - webclerks Meetup #3 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
    </li>
  </ul>
</section>

<section>
  <h4 class="main-content__subhl">webclerks Meetup #2</h4>

  <p class="main-content__meta">
    <span class="main-content__meta__date">25. April 2016 -</span>
    <a class="main-content__meta__place" href="http://www.stockwerk.co.at/">Stockwerk</a>
  </p>

  <div data-src="/content/files/images/meetup2.jpg" data-alt="webclerks Meetup #2" data-classes="main-content__img"></div>
  <a href="http://www.meetup.com/webclerks/photos/26922978/" class="main-content__link">Pictures of the event</a>

  <h5 class="list-img-info__subhl">Talks &amp; Vortragende</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('christophrumpel', '', '') }}" data-alt="Christopf Rumpel - webclerks Meetup #2 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Hello World, I’m Laravel </h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Christoph Rumpel</span>
        <a class="item__des__link" href="https://twitter.com/christophrumpel">@christophrumpel</a>
      </p>
    </li>

    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('thegrumpygirl', '', '') }}" data-alt="Andie Katschthaler - webclerks Meetup #2 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Non-Visual Branding: Deine Marke ist mehr als nur ein Logo </h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Andie Katschthaler</span>
        <a class="item__des__link" href="https://twitter.com/thegrumpygirl">@thegrumpygirl</a>
      </p>
    </li>
    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('mxbck', '', '') }}" data-alt="Max Böck - webclerks Meetup #2 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Learning to love BEM</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Max Böck</span>
        <a class="item__des__link" href="https://twitter.com/mxbck">@mxbck</a>
      </p>
    </li>
  </ul>

  <h5 class="list-img-info__subhl">Sponsoren</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="/content/files/images/simpleloop.png" data-alt="Simpleloop - webclerks Meetup #2 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
      <div data-src="/content/files/images/smartlabs.png" data-alt="Smartlabs - webclerks Meetup #2 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
      <div data-src="/content/files/images/stockwerk_logo.png" data-alt="Stockwerkt - webclerks Meetup #2 Sponsor" data-classes="main-content__img"></div>
    </li>
  </ul>
</section>

<section>
  <h4 class="main-content__subhl">webclerks Meetup #1</h4>

  <p class="main-content__meta">
    <span class="main-content__meta__date">17. Feb 2016 -</span>
    <a class="main-content__meta__place" href="http://www.stockwerk.co.at/">Stockwerk</a>
  </p>

  <div data-src="/content/files/images/meetup1.jpg" data-alt="webclerks Meetup #1" data-classes="main-content__img"></div>
  <a href="http://www.meetup.com/webclerks/photos/26860123/" class="main-content__link">Pictures of the event</a>

  <h5 class="list-img-info__subhl">Talks &amp; Vortragende</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('', '', 'office@martpage.at') }}" data-alt="Martin Funk - webclerks Meetup #1 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Webdesign & Prototyping mit Sketch und Invision</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Martin Funk</span>
        <a  class="item__des__link" href="http://www.martpage.at/">Website</a>
      </p>
    </li>

    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('mmatuzo', '', '') }}" data-alt="Manuel Matuzovic - webclerks Meetup #1 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">Cross Device Testing – Geht das auch weniger mühsam?</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Manuel Matuzovic</span>
        <a  class="item__des__link" href="https://twitter.com/mmatuzo">@mmatuzo</a>
      </p>
    </li>

    <li class="list-img-info__item">
      <div data-src="{{ getUserImage('', 'd4ny0', '') }}" data-alt="Daniel Holpfer - webclerks Meetup #1 Speaker" data-classes="list-img-info__item__img"></div>
      <h6 class="list-img-info__item__talk">yo! build your workflow</h6>

      <p class="list-img-info__item__des">
        <span class="item__des__name">Daniel Holpfer</span>
        <a  class="item__des__link" href="https://twitter.com/hdanyo">@hdanyo</a>
      </p>
    </li>
  </ul>

  <h5 class="list-img-info__subhl">Sponsoren</h5>
  <ul class="list-img-info">
    <li class="list-img-info__item">
      <div data-src="/content/files/images/easyname_logo.png" data-alt="Easyname - webclerks Meetup #1 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
      <div data-src="/content/files/images/stockwerk_logo.png" data-alt="Stockwerk - webclerks Meetup #1 Sponsor" data-classes="main-content__img"></div>
    </li>
    <li class="list-img-info__item">
    </li>
  </ul>
</section>
@endsection
