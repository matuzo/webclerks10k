<main class="site__ct js-site-content page__ct clearfix" id="hauptinhalt" role="main">
  <h2 class="page__hl">
    @yield('title')
  </h2>

  @yield('tabs')

  @if($order === 'featuredFirst')
    @include('partials.featured_content')
  @endif

  <section class="site__ct__main main-content js-site-content-section js-site-content-main">
    <div class="site__ct__main__inner">
      <h3 class="main-content__hl">{{ $currentPage->contentTitle }}</h3>
      @yield('content')
    </div>
  </section>
  @if($order !== 'featuredFirst')
    @include('partials.featured_content')
  @endif
</main>