
@php
  $currentYear = $calendar->date->format('Y');
  $currentMonth = $calendar->date->format('m');
  $currentWeek = $calendar->date->format('W');

  if($currentWeek === "52") {
    $currentWeek = 0;
  }
@endphp

<time datetime="{{ $currentYear }}-{{ $currentMonth }}" class="cal__month">
  <span class="visually-hidden">{{ $calendar->date->format('F') }}</span>

  @if($calendar->weekdayNames)
    <span class="cal__week">  
      @foreach($calendar->weekdayNames as $weekdayName)
        <span class="cal__day">{{ substr($weekdayName, 0, 1) }}
        </span>
      @endforeach
    </span>
    @foreach($calendar->weeksAndDays as $weekCount => $week)
      @php
        $nextWeek = $currentWeek + $weekCount;
        $nextWeek = str_pad($nextWeek, 2, 0, STR_PAD_LEFT);
      @endphp

      <time datetime="{{ $currentYear }}-W{{ $nextWeek }}" class="cal__week cal__week--{{$weekCount}}">
        @foreach($week as $day)
        
          @php
            $dayClasses = 'cal__nr';

            $today = new DateTime();
            $currentDay = DateTime::createFromFormat('d.m.Y', str_pad($day, 2, 0, STR_PAD_LEFT).'.'.$currentMonth.'.'.$currentYear);
            

            if($today->format('d.m.Y') === $currentDay->format('d.m.Y')) {
              $dayClasses = 'cal__nr cal__nr--today';
            }

            if(new DateTime() > $currentDay) {
              $dayClasses = 'cal__nr cal__nr--past';
            }

            if($selectedDay !== '' && (int) date('j', $selectedDay) === $day) {
              $dayClasses .= ' cal__nr--a';
            }
          @endphp

          <time datetime="{{ $currentYear }}-{{ $currentMonth }}-{{ str_pad($day, 2, 0, STR_PAD_LEFT) }}" class="cal__day">

            @if(array_key_exists(($nextWeek), $calendar->events))
              @if(array_key_exists($day, $calendar->events[$nextWeek]))
              @php
                $eventsOnday = $calendar->events[$nextWeek][$day];
              @endphp
                <a href="/events/{{ $settings['location'] }}/{{ $currentYear }}/{{ $currentMonth }}/{{ $eventsOnday[0]['id'] }}" aria-label="{{ $day }} View {{ count($eventsOnday) }} Events" class="{{ $dayClasses }} cal__nr--date">
                  {{ $day }}
                </a>
              @else
                <span class="{{ $dayClasses }}">{{ $day }}</span>
              @endif
            @else
                <span class="{{ $dayClasses }}">{{ $day }}</span>
            @endif
          </time> 
        @endforeach
        @if(isset($_GET['eventid']) && $_GET['eventid'] === $selectedID && $nextWeek  === date('W', $selectedDay))
          <span class="cal__wk__events">
            @foreach($calendar->events[date('W', $selectedDay)][date('j', $selectedDay)] as $eventOnDay) 
              <a href="/events/{{ $settings['location'] }}/{{ $currentYear }}/{{ $currentMonth }}/{{ $eventOnDay['id'] }}?view=card"  class="cal__event"><span class="cal__event__txt">{{ $eventOnDay['name'] }}</span>
              </a>
            @endforeach
          </span>
        @endif
      </time> 
    @endforeach
  @endif
</time> 