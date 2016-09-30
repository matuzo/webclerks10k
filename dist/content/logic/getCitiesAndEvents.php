<?php
date_default_timezone_set('Europe/Vienna'); 

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  require '../functions.php';
  $theevent = getEvents($_GET['city'], $_GET['year'], $_GET['month']);
  $events['events'] = getEventsByPage($theevent['events']);
  $events['allevents'] = array_values($theevent['events']);
  $events['totalevents'] = $theevent['totalevents'];
  $events['allcities'] = $theevent['allcities'];
  $events['cities'] = $theevent['cities'];
  $events['lastdate'] = $theevent['lastmonth'];
  $events['firstdateinset'] = $theevent['firstdateinset'];
  $events['lastdateinset'] = $theevent['lastdateinset'];
  print json_encode($events);

}

function getEventsByPage($events, $page) {
  $rowsPerPage = 5;
  // $page = 1;
  $firstRow = 0;

  if(isset($_GET['currentpage'])) {
    $page = $_GET['currentpage'];
  }

  if($page > 1) {
    $firstRow = ($rowsPerPage * $page) - 5;
  }

  return $events = array_slice($events, $firstRow, $rowsPerPage);
}

function getEvents($city = 'austria', $year = NULL, $monthFrom = NULL) {

  $file = "content/data/meetups.json";
  
  // Fix filepath for ajax requests
  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $file = "../meetups.json";
  }

  // Fetch events from JSON
  $meetupdata = json_decode(file_get_contents($file), true);

  // All cities
  $meetupdata['allcities'] = $meetupdata['cities'];

  // Last month of all events
  $meetupdata['lastmonth'] = $meetupdata['events'][count($meetupdata['events']) - 1]['date'];

  // Last date in the current selection
  $meetupdata['lastdateinset'] = $meetupdata['lastmonth'];

  // Set dates and location
  if(!$year) $year = date('Y');

  $monthTo = $monthFrom + 1;

  // If $city is 'alle', don't filter anything
  if($city !== 'alle') {

    // Filter by city if $city isn't 'austria'
    if($city !== 'austria') {

      $meetupdata['lastdateincity'] = array_filter($meetupdata['events'], function($event) use ($city) {
        // Clean up
          $eventcity = str_replace(array("Vienna", "1060 Wien"), "Wien", $event['city']);
          return slug($eventcity) == $city;           
      });

      if(empty($meetupdata['lastdateincity'])) {
        $error = array('errorcode' => 1);
        return $error;
      }

      // Update the last date in the current selection
      $meetupdata['lastdateinset'] = array_values($meetupdata['lastdateincity'])[count($meetupdata['lastdateincity']) - 1]['date'];
    }

    // Filter by date
    $meetupdata['events'] = array_filter($meetupdata['events'], function($event) use ($monthFrom, $monthTo, $year) {

      return (($event['date'] / 1000) > mktime(23, 59, 59, $monthFrom, 0, $year) && ($event['date'] / 1000) <= mktime(23, 59, 59, $monthTo, 0, $year));
    });

    // Copy events
    $meetupdata['cities'] = $meetupdata['events'];

    // Extract cities form copied events
    // and save them in $cities 
    foreach ($meetupdata['cities'] as $event) {
        // if(!empty($event['city']) && ($event['date'] / 1000) > time()) {
        if(!empty($event['city'])) {
          $eventcity = $event['city'];
          $eventcity = str_replace(array("Vienna", "1060 Wien"), "Wien", $eventcity);
        $cities[slug($eventcity)] = $eventcity;
      }
    }

    if(!isset($cities)) {
      $error = array('errorcode' => 0);
      return $error;
    }

    // Add Austria to the cities
    if($cities !== NULL) {
      $meetupdata['cities'] = array_merge(['austria' => 'Austria'], array_unique($cities));
    } 

    // Filter by city if $city isn't 'austria'
    if($city !== 'austria') {
      $meetupdata['events'] = array_filter($meetupdata['events'], function($event) use ($city) {
        // var_dump($city);
          $eventcity = str_replace(array("Vienna", "1060 Wien"), "Wien", $event['city']);
          return slug($eventcity) == $city;
      });
    }

    // First date in the current selection
    if(isset(array_values($meetupdata['events'])[0]))
    $meetupdata['firstdateinset'] = array_values($meetupdata['events'])[0]['date'];

    // Number of events in total
    $meetupdata['totalevents'] = count($meetupdata['events']);
  } else {
    $meetupdata['totalevents'] = count($meetupdata['events']);
    array_shift($meetupdata['cities']);
  }

  return $meetupdata;
}