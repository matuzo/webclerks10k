<div class="cal__change">
  <?php $prevMonth = $calendar->previousDate->format('F'); ?>

  @if($calendar->showPrevMonth)
    <a class="cal__change-month cal__change-month--prev" href="/events/{{ $settings['location'] }}/{{ $calendar->previousDate->format('Y/m') }}?view={{ $_SESSION['events_view'] }}">
        <span data-inlinesvg="arrow_prev" class="cal__change-month__icon">
          <span class="visually-hidden">Previous month:</span> <span class="cal__txt">{{ $prevMonth }}</span>
        </span>
    </a>
  @else
    <span class="cal__change-month cal__change-month--prev">
      <span data-inlinesvg="arrow_prev" class="cal__change-month__icon cal__change-month__icon--ia">
      </span>
    </span>
  @endif

  <span class="cal__change-month--current">{{ $calendar->date->format('F') }}</span>

  <?php $nextMonth = $calendar->nextDate->format('F'); ?>

  @if($calendar->showNextMonth)
    <a class="cal__change-month cal__change-month--next" href="/events/{{ $settings['location'] }}/{{ $calendar->nextDate->format('Y/m') }}?view={{ $_SESSION['events_view'] }}">
      <span data-inlinesvg="arrow_next" class="cal__change-month__icon">
        <span class="visually-hidden">Next month:</span> <span class="cal__txt">{{ $nextMonth }}</span>
      </span>
    </a>
  @else
    <span class="cal__change-month cal__change-month--next">
      <span data-inlinesvg="arrow_next" class="cal__change-month__icon cal__change-month__icon--ia">
      </span>
    </span>
  @endif
</div>