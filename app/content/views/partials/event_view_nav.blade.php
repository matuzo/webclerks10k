<ul class="nav__views">
  <li class="nav__views__it">
    <a href="?modal=filter" data-modal="filter" class="js-modal nav__views__lk nav__views__lk--filter">
      <span data-inlinesvg="filter" class="nav__views__ic">
        <span class="btn__text">Filter by city</span>
      </span>
    </a>
  </li>
  
  <li class="nav__views__it">
    <a href="?view=card" class="nav__views__lk @if($_SESSION['events_view'] === 'card') {{ 'nav__views__lk--a' }} @endif">
      <span data-inlinesvg="carousel" class="nav__views__ic">
        <span class="btn__text">Views as card</span>
      </span>
    </a>
  </li>
</ul>