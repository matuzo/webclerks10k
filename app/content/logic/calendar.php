<?php
  function buildCityFilter($cities, $currentYear, $currentMonth) {
    foreach ($cities as $city) {
      $slug = slug($city);
      $filterclasses = 'events__filter__link';
      $filterUrl = '/events/'.$slug.'/'.$currentYear;

      if(empty($_GET['year']) && empty($_GET['month']) || !empty($_GET['year']) && !empty($_GET['month'])) {
        $filterUrl .= '/'.$currentMonth;
      }
      if(isset($_GET['city']) && $slug == $_GET['city']) {
        $filterclasses .= ' events__filter__link--active';
      }

      $cities[$slug] = ['name' => $city, 'url' => $filterUrl, 'classes' => $filterclasses];
    }

    return $cities;
  }

  function buildCalendarNavigation($calendar, $firstOfMonth, $lastMonthInSet) {
    // Prev Month
    $previousMonth = clone $firstOfMonth;
    $calendar->previousDate = $previousMonth->modify('first day of -1 month');
    
    // Next Month
    $nextMonth = clone $firstOfMonth;
    $calendar->nextDate = $nextMonth->modify('first day of +1 month');

    $calendar->showPrevMonth = true;
    $calendar->showNextMonth = true;

    if($firstOfMonth->getTimestamp() < time()):
      $calendar->showPrevMonth = false;
    endif;

    if($nextMonth->getTimestamp() > $lastMonthInSet):
      $calendar->showNextMonth = false;
    endif;

    return $calendar;
  }

  function buildCalendar($firstOfMonth, $lastMonthInSet, $events) {
    // Container for calendar data
    $calendar = new Stdclass;

    // Current Date
    $calendar->date = $firstOfMonth;

    $calendar = buildCalendarNavigation($calendar, $firstOfMonth, $lastMonthInSet);

    // Get calendar data
    $calendarData = new MatuzoCalendar($firstOfMonth->format('Y-m-d H:i:s')); 
    $calendarData->setFirstDayOfWeek();
    $calendarData->showWeekdayNames();
    $calendarData->getWeeksAndDays();

    $calendar->weekdayNames = $calendarData->weekdayNames;

    // Total days
    $calendar->numberOfDays = $calendarData->numberOfDays;

    // Total weeks
    $calendar->numberOfWeeks = $calendarData->numberOfWeeks;

    // Days and weeks
    $calendar->weeksAndDays = $calendarData->weeksAndDays;
    
    // Events in Month ordered by week
    $calendar->events = $events;
    
    return $calendar;
  }
  
  class MatuzoCalendar {
    public $weekdayNames = false;

    function __construct( $date_string = null ) {
      $this->setDate($date_string);
    }

    /**
     * Set the current month to display
     * @param [type] $date_string Formatted date string ('Y-m-d H:i:s'). If empty, the current date will be selected
     */
    public function setDate( $date_string = null ) {
      if( $date_string ) {
        $this->now = getdate(strtotime($date_string));
      } else {
        $this->now = getdate();
      }
    }

    /**
     * Change the first day of the week
     * @param [type] $offset 1 - 7 (1 = Monday, 7 = Sunday)
     */
    public function setFirstDayOfWeek( $offset = 1 ) {
      $this->offset = ($offset - 1) % 7;
    }

    /**
     * Show a header with weekday names
     * @param  boolean $show   Shown by default
     * @param  string  $format Formatting: %a or %A
     */
    public function showWeekdayNames( $show = true, $format = 'a') {
      if($show) {
        $timestamp = strtotime('next Monday');

        for($i = 1; $i <= 7; $i++){
          $this->weekdayNames[] = strftime('%'.$format, $timestamp);
          $timestamp = strtotime('+1 day', $timestamp);
        }

        if($this->offset > 0) {
          $firstHalf = array_slice($this->weekdayNames, $this->offset);
          $secondHalf = array_slice($this->weekdayNames, 0, $this->offset);

          $this->weekdayNames = array_merge($firstHalf, $secondHalf);
        }
      }
    }

    public function getWeeksAndDays() {
      // Number of days in this month
      $this->numberOfDays = cal_days_in_month(CAL_GREGORIAN, $this->now['mon'], $this->now['year']);

      // Number of weeks in this month
      $firstDayOfMonth = mktime(0, 0, 1, $this->now['mon'], 1, $this->now['year']);
      $weekNumberOfFirstDayOfMonth = date('N', $firstDayOfMonth) - $this->offset;
      
      $this->numberOfWeeks = ceil(($this->numberOfDays + $weekNumberOfFirstDayOfMonth) / 7);

      $this->weeksAndDays = array();

      $week = 0;

      for($day = 1;  $day <= $this->numberOfDays; $day++) {
        $this->weeksAndDays[$week][] = $day;
       
        if((($day - 1) + $weekNumberOfFirstDayOfMonth) % 7 === 0) {
          $week++;
        }

      }
    }
  }