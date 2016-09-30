<ul class="nav__tabs" aria-label="{{ $label }}" role="tablist">
  @php
    $tabCount = 0;
  @endphp
  @foreach ($tabs as $slug => $tab)
    @if($tab['menu'] === $menu)      
      @php
        $tabAttributes = 'aria-selected="false" tabindex="-1"';
        
        if(strrpos($tab['classes'], "active")):
          $tabAttributes = 'aria-selected="true" tabindex="0"';
        endif;
      @endphp
      <li class="nav__tabs__item" role="presentation">
        <a class="{{ $tab['classes'] }} js-tab" href="/{{ $slug }}" role="tab" data-tab="{{ $tabCount}}" <?= $tabAttributes ?> data-name="{{ $tab['name'] }}">
          <span class="nav__tabs__text">
            {{ $tab['menuname'] }} 
          </span>
        </a>
      </li>
    @endif
    @php
      $tabCount++;
    @endphp
  @endforeach
</ul>