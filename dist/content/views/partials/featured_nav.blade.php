  @if($currentKey > 0)
    <a class="nav__arrow nav__arrow--left" href="{{ $url }}{{ $all[$currentKey - 1][$slug] }}?view=card" title="{{ $all[$currentKey - 1]['slug'] }}">
      <span data-inlinesvg="arrow_prev" class="nav__arrow__icon">
        <span class="visually-hidden">{{ $prevString }}</span>
      </span>
    </a>
  @else
    <span class="nav__arrow nav__arrow--left" aria-hidden="true">
      <span data-inlinesvg="arrow_prev" class="nav__arrow__icon nav__arrow__icon--ia"></span>
    </span>
  @endif
  @if($currentKey < (count($all) - 1))
    <a class="nav__arrow nav__arrow--right" href="{{ $url }}{{ $all[$currentKey + 1][$slug] }}?view=card" title="{{ $all[$currentKey + 1]['slug'] }}">
      <span data-inlinesvg="arrow_next" class="nav__arrow__icon">
        <span class="visually-hidden">{{ $nextString }}</span>
      </span>
    </a>
  @else
    <span class="nav__arrow nav__arrow--right" aria-hidden="true">
      <span data-inlinesvg="arrow_next" class="nav__arrow__icon nav__arrow__icon--ia"></span>
    </span>
  @endif