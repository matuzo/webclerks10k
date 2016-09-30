<section class="events__filter dialog" data-modal-content="filter" @if(isset($_GET['modal']) && $_GET['modal'] === 'filter') style="display: block" @endif>
  <h3 class="events__filter__hl dialog__hl" id="events_filter">Filter</h3>
  <div class="dialog__ct">
    @if($settings['location'] !== 'alle')
      <ul class="events__filter__items" aria-labelledby="events_filter">
        @foreach ($settings['cityFilter'] as $city)
        <li class="events__filter__item">
          <a class="{{ $city['classes'] }} events__filter__link" href="{{ $city['url'] }}?view={{ $_SESSION['events_view'] }}">
            {{ $city['name'] }}
          </a>
        </li>
        @endforeach
      </ul>
    @endif
  </div>
</section>
