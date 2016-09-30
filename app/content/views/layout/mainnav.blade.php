<nav class="nav__main js-nav-main offcanvas offcanvas--hidden js-offcanvas" role="navigation" id="mainnav" data-hide>
  <h2 class="visually-hidden">Navigation</h2>

  <ul class="nav__main__items" aria-label="Hauptnavigation">
    @foreach($pages as $slug => $menuitem)
      @php
        $classes = 'nav__main__item';
        $textClasses = 'nav__main__text';

        $default = 'news';

        if((isset($_GET['page']) && strpos($menuitem['file'], $_GET['page']) !== false) || 
          (!isset($_GET['page']) && strpos($menuitem['file'], $default) !== false)) {
            $classes = 'nav__main__item nav__main__item--active';
          $textClasses = 'nav__main__text nav__main__text--active';
        }
      @endphp

      @if($menuitem['menu'] === 'main')
        <li class="{{ $classes }}">
          
          <a class="nav__main__link" href="/{{ $slug }}">
            <span class="svg-{{ $slug }} icon nav__main__icon" aria-hidden="true"></span>
            <span class="{{ $textClasses }}">
              {{ $menuitem['menuname'] }}
            </span>
          </a>
        </li>
      @endif
    @endforeach
  </ul>
</nav>