@extends('master', ['order' => 'contentFirst'])

@section('title', $currentPage->title)

@section('featured')
  @include('partials.featured.newsletter')
@endsection

@section('content')
<p class="main-content__paragraph">
  You have something to talk about? You recently discovered a cool technique you want to share with others? You have an interesting use case you want to show us?
</p>
<ul class="main-content__links">
  <li class="link__item">
    <a href="#">
      <span data-inlinesvg="twitter" class="btn btn--pink">
        <span class="visually-hidden">
          view twitter page
        </span>
      </span>
      Twitter
    </a>
  </li>


  <li  class="link__item">
    <a href="#">
      <span data-inlinesvg="facebook" class="btn btn--pink">
        <span class="visually-hidden">
          view facebook page
        </span>
      </span>
      Facebook
    </a>
  </li>

  <li class="link__item">
    <a href="mailto:info&commat;webclerks.at">
      <span data-inlinesvg="email" class="btn btn--pink">
        <span class="visually-hidden">
          write an email
        </span>
      </span>
      Email
    </a>
  </li>
</ul>

<div class="main-content__c">
  <h4 class="main-content__subhl subhl-part--margin">
    <span class="subhl-part">Call for</span>
    speakers
  </h4>

  <p class="main-content__p">
    You have something to talk about? You recently discovered a cool technique you want to share with others? You have an interesting use case you want to show us? Don’t be shy, even if you are a beginner, we want to support you and offer you a stage to share your knowledge. Contact us with your talk proposal!
  </p>
</div>

<div class="main-content__c">
  <h4 class="main-content__subhl subhl-part--margin">
    <span class="subhl-part">Call for</span>
    sponsors
  </h4>

  <p class="main-content__p">We love to provide our attendees with drinks, food and of course, a venue for our events. But these things cost money and that’s where you come in: We need your help!</p>
  <p class="main-content__p">In exchange we provide links to your website and/or service on our site, Facebook, Twitter and newsletters with your logo and a short text. </p>
  <p class="main-content__p">If you are looking to hire we are happy to help you spread the news among our attendees and newsletter recipients. We also invite our sponsors onto our stage for a couple of minutes during the events to talk about job offers or their services. </p>
  <p class="main-content__p">Please don’t hesitate to contact us, if you have any questions or want to help us out!</p>
</div>
@endsection
