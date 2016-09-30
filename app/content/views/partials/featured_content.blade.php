  @php
    $featuredClasses = 'site__ct__ft ft js-site-content-featured';
  @endphp

@if(isset($tabs))
  <section class="{{ $featuredClasses }}" role="tabpanel">
@else
  <section class="{{ $featuredClasses }}">
@endif
    <div class="ft__cards">
      <div class="ft__cards__inner js-featured-cards-inner">
        @if($currentPage->featuredTitle !== '')
          @if(isset($tabs))
            <h3 class="ft__hl" tabindes="0">{{ $currentPage->featuredTitle }}</h3>
          @else
            <h3 class="ft__hl">{{ $currentPage->featuredTitle }}</h3>
          @endif
        @endif
        @yield('featured')
      </div> 
    </div> 
    @yield('featuredNav')
  </section>