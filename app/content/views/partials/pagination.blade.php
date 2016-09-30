<nav class="nav__pagination" role="navigation" aria-label="Suchergebnisse blättern">
  @if ($pagination->totalpages > 1)
    <ul class="nav__pagination__list">
      @if ($pagination->currentpage > 1)
        <li class="nav__pagination__item">
          <a href="?currentpage=1&view={{ $_SESSION['events_view'] }}" class="nav__pagination__item__inner" aria-label="Erste Seite">
            &laquo;
          </a>
        </li>

        <?php $prevpage = $pagination->currentpage - 1; ?>

        <li class="nav__pagination__item">
          <a href="?currentpage={{ $prevpage }}&view={{ $_SESSION['events_view'] }}" class="nav__pagination__item__inner" aria-label="Vorherige Seite">
            &lsaquo;
          </a>
        </li>
      @endif
      
      @php
        $count = 0;
      @endphp
      
      @foreach ($pagination->pages as $page)
        @if($count < 4)
          <li class="nav__pagination__item">
            @if ($pagination->currentpage === $page)
              <strong class="nav__pagination__item__inner">
                {{ $page }} <span class="visually-hidden">(Aktuelle Seite)</span>
              </strong>
            @else
              <a href="?currentpage={{ $page }}&view={{ $_SESSION['events_view'] }}" class="nav__pagination__item__inner"  aria-label="Seite {{ $page }}">
                {{ $page }}
              </a>
            @endif
            @php
              $count++;
            @endphp
          </li>
        @endif
      @endforeach

      @if ($pagination->currentpage < $pagination->totalpages)
        <?php $nextpage = $pagination->currentpage + 1; ?>
        <li class="nav__pagination__item">
          <a href="?currentpage={{ $nextpage }}&view={{ $_SESSION['events_view'] }}" class="nav__pagination__item__inner"  aria-label="Nächste Seite">
            &rsaquo;
          </a>
        </li>

        <li class="nav__pagination__item">
          <a href="?currentpage={{ $pagination->totalpages }}&view={{ $_SESSION['events_view'] }}" class="nav__pagination__item__inner" aria-label="Letzte Seite">
            &raquo;
          </a>
        </li>
      @endif
  <!-- htmlmin:ignore -->
    </ul>
  <!-- htmlmin:ignore -->
  @endif
</nav> <!-- .nav__pagination -->