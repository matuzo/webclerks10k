<?php
  $currentPage = new stdClass();
  $currentPage->description = "Events in Austria";
  $currentPage->slug = $page;
  $currentPage->title = "Meetups and conferences in Austria";
  $currentPage->contentTitle = "Calendar";
  $currentPage->parentClass = 'events';
  $currentPage->pageClass = '';

  // Set current month, year and location
  $currentMonth = date('m');
  $currentYear = date('Y');
  $location = 'austria';

  if(isset($_GET['month'])) { $currentMonth = $_GET['month']; }
  if(isset($_GET['year'])) { $currentYear = $_GET['year']; }
  if(isset($_GET['city'])) { $location = $_GET['city']; }

  // Fetch events
  $eventsData = getEvents($location, $currentYear, $currentMonth);

  if(isset($eventsData['errorcode'])) {
    echo $blade->view()->make('pages/events')->with(['currentPage' => $currentPage, 
                             'pages' => $pages,
                             'sitename' => $sitename,
                             'error' => $errormessages[$eventsData['errorcode']]
                            ])->render();
    die();
  }

  $events = $eventsData['events']; 

  // Jump to next month if there are no events in the current month 
  if(empty($events) && !isset($_GET['year']) && !isset($_GET['month'])) {
    $currentMonth = $currentMonth + 1;

    $eventsData = getEvents($location, $currentYear, $currentMonth);
    $events = $eventsData['events']; 
  }

  // Get Cities
  $cities = $eventsData['cities']; 

  if(empty($cities)) header("HTTP/1.0 404 Not Found");

  // The last possible month in the current selection
  $lastMonth = $eventsData['lastmonth'] / 1000; 
  $lastMonthInSet = $eventsData['lastdateinset'] / 1000; 

  // Total Events
  $totalEvents = $eventsData['totalevents']; 

  $eventsByWeek = array(); 
  $page = 0;
  $eventsPage = 0;

      $selectedID = '';
      $selectedDay = '';


  // debug($events);
    
  $eventsKeysReset = array_values($events);

  foreach ($eventsKeysReset as $key => $event) {
    $week = date('W', $event['date'] / 1000);
    $day = date('j', $event['date'] / 1000);
    
    if($key % EVENTSPERPAGE === 0) {
      $page++;
    }
    $event['page'] = $page;
    $eventsByWeek[$week][$day][] = $event;

    if(isset($_GET['eventid']) && !isset($currentKey) && $event['id'] === $_GET['eventid']) {
      $currentKey = $key;


      $selectedID = $eventsKeysReset[$currentKey]['id'];
      $selectedDay = $eventsKeysReset[$currentKey]['date'] / 1000;
      // $eventsOnDay = array_filter($events, function($event) use ($selectedDay) {
      //   return (($event['date']) === $selectedDay );
      // });
    }

    if(!isset($_GET['eventid']) && !isset($currentKey) && date('j') <= $day && date('W') <= $week ) {
      $currentKey = $key;

    }

    if(isset($currentKey) && !isset($currentKeyByPage)) {
      $currentKeyByPage = $currentKey % EVENTSPERPAGE;
      $eventsPage = ceil(($currentKey + 1) / EVENTSPERPAGE);
    }
  }


  if(!isset($currentKey)) {
    $currentKey = 0;
  }


  // Events by Page
  $eventsByPage = getEventsByPage(array_values($events), $eventsPage);

  
  $articleCount = 0;
  foreach ($eventsByPage as $key => $event) {
    $dayByPage = date('j', $event['date'] / 1000);

    if(date('j') >= $dayByPage && !isset($currentKeyByPage)) {
      $currentKeyByPage = $key;
    }

    $articleClasses = 'events__event';

    if($articleCount === (count($events) - 1) && count($events) <= 5) {
      $articleClasses .= ' last';
    }

    if($articleCount === 0) {
      $articleClasses .= ' first';
    }

    $event['classes'] = $articleClasses;
    $event['slug'] = slug($event['name']);
    $event['date'] = $event['date'] / 1000;

    $eventsByPage[$articleCount] = $event;
    $articleCount++;
  }



  // Get data for city filter
  $cityFilter = buildCityFilter($cities, $currentYear, $currentMonth);
  $totalCities = $eventsData['allcities']; 

  // First day of current month
  $firstOfMonth = DateTime::createFromFormat('d-m-Y', '01-'.$currentMonth.'-'.$currentYear);
  
  // Get calendar data
  $calendar = buildCalendar($firstOfMonth, $lastMonthInSet, $eventsByWeek);

  // Build pagination
  $pagination = eventPagination($totalEvents, $location, $eventsPage);

  // Data for template
  $settings = [
    'cityFilter' => $cityFilter,
    'currentYear' => $currentYear,
    'currentMonth' => $currentMonth,
    'location' => $location,
    'view' => 'list',
  ];

  $_SESSION['events_view'] = 'cal';
  $_SESSION['events_display'] = 'card';
  $currentPage->pageClass = '';
  
  if(isset($_GET['view'])) {
    $_SESSION['events_view'] = $_GET['view'];
    
    if($_GET['view'] === 'list') {
      $currentPage->featuredTitle = $totalEvents." events in ". date('F', strtotime('01.'.$currentMonth.'.'.$currentYear))." in ".$totalCities[$location];
      $currentPage->pageClass = 'mobile-card mobile-list';
      $_SESSION['events_display'] = 'list';
    } else if($_GET['view'] === 'card') {
      $currentPage->featuredTitle = $eventsByPage[$currentKeyByPage]['eventtype'];
      $currentPage->pageClass = 'mobile-card';
      $_SESSION['events_display'] = 'card';
    } else {
      $_SESSION['events_display'] = 'card';
    }
  }

  if(!isset($_GET['view']) || $_GET['view'] === 'cal') {
      $currentPage->featuredTitle = 'Calendar';
  }

  $currentPage->pageClass .= ' events--'.strtolower($eventsByPage[$currentKeyByPage]['eventtype']);

  $eventUrl = '/events/'.$location.'/'.$currentYear.'/'.$currentMonth.'/';

  $maxCards = EVENTSPERPAGE;

  if(count($events) < $maxCards) {
    $maxCards = count($events);
  }

  $cards = [
    'currentKeyByPage' => $currentKeyByPage,
    'position' =>( $currentKeyByPage * -100),
    'noOfCards' => count($events),
    'cardWidth' => (100 / $maxCards),
    'cardsWidth' => 'calc('.(100 * $maxCards).'% + ('.$maxCards.' * 28px))',
  ];

  echo $blade->view()->make('pages/events')->with([
                           'currentPage' => $currentPage, 
                           'sitename' => $sitename,
                           'pages' => $pages,
                           'calendar' => $calendar,
                           'events' => $events,
                           'eventsByPage' => $eventsByPage,
                           'totalCities' => $totalCities,
                           'totalEvents' => $totalEvents,
                           'noOfCards' => $noOfCards,
                           'settings' => $settings,
                           'siteUrl' => $siteUrl,
                           'eventUrl' => $eventUrl,
                           'pagination' => $pagination,
                           'currentKey' => $currentKey,
                           'currentKeyByPage' => $currentKeyByPage,
                           'selectedID' => $selectedID,
                           'selectedDay' => $selectedDay,
                           'cards' => $cards,
                          ])->render();
?>