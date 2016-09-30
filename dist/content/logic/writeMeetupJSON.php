<?php
	date_default_timezone_set('Europe/Vienna'); 

  require '../../../vendor/autoload.php';
	require 'functions.php';

  use DMS\Service\Meetup\MeetupKeyAuthClient;

            
  $client = MeetupKeyAuthClient::factory('key' => '619a5e3a4e69392e5819142760516d', 'scheme' => 'https'));

  $events = $client->getEvents(
    array(
      'member_id' => '182521143', 
      'status' => 'upcoming,past',
      'time' => '-1m,',
      'fields' => 'group_photo',
      'photo-host' => 'secure'));

  // $metadata = $events->getMetaData();

  $meetups = array();

  $cities['alle'] = 'Austria';
  $cities['austria'] = 'Austria';

$firstOfMonth = new DateTime('first day of this month');

foreach ($events as $event) {

  // Get event data and store
  if(( $event['time'] / 1000) >= $firstOfMonth->getTimeStamp()) {
  $data = [
    "name" => $event['name'], 
    "slug" => slug($event['name']), 
    "date" => $event['time'],
    "id" => $event['id'],
    "url" => $event['event_url']
  ];

  if(!empty($event['group']['group_photo']['photo_link'])) {
        $data['photo'] = $event['group']['group_photo']['highres_link'];
        $data['thumb'] = $event['group']['group_photo']['thumb_link'];
      }

      if(!empty($event['venue']['name'])) {
        $data['venue'] = $event['venue']['name'];
      }

      if(!empty($event->description)) {
        $data['description'] = substr(strip_tags($event->description), 0, 100);
      }

      if(empty($event['venue']['city'])) {
        $event['venue'] = array();
        if (strpos($event['group']['name'], 'Vienna') !== false) {
          $event['venue']['city'] = 'Vienna';
        } else if (strpos($event['group']['name'], 'Bregenz') !== false) {
          $event['venue']['city'] = 'Bregenz';
        } else {
          $event['venue']['city'] = 'Unbekannt';
        }
      }

      $data['city'] = str_replace(array("Vienna", "1060 Wien", "1040 Wien"), "Wien", $event['venue']['city']); 
      $data['city'] = str_replace(array("4061 Pasching / Linz"), "Pasching bei Linz", $data['city']); 

      $data['eventtype'] = 'Meetup';

      $cities[slug($data['city'])] = $data['city'];

      $eventsData[] = $data;
  }
}

$customEvents[] = ["name" => "Joomladay Austria Tag 1",
           "slug" => slug("Joomladay Austria Tag 1"), 
           "id" => slug("Joomladay Austria Tag 1"), 
           "date" => strtotime("02 December 2016 07:00") * 1000,
           "url" => "http://joomla-day.at/",
           "venue" => "tba",
           "city" => "Wien",
           "eventtype" => "Conference",
           "description" => "Am JoomlaDay™ wird es Vorträge für alle an Joomla!® Interessierten geben"];  
           
$customEvents[] = ["name" => "Joomladay Austria Tag 2",
           "slug" => slug("Joomladay Austria Tag 2"), 
           "id" => slug("Joomladay Austria Tag 2"), 
           "date" => strtotime("03 December 2016 07:00") * 1000,
           "url" => "http://joomla-day.at/",
           "venue" => "tba",
           "city" => "Wien",
           "eventtype" => "Conference",
           "description" => "Am JoomlaDay™ wird es Vorträge für alle an Joomla!® Interessierten geben"];  

foreach ($customEvents as $customEvent) {
  $customCities[slug($customEvent['city'])] = $customEvent['city'];
}

function cmp($a, $b){
    $ad = $a['date'];
    $bd = $b['date'];
    return ($ad-$bd);
}

$mergedEvents = array_merge($eventsData, $customEvents);
usort($mergedEvents, 'cmp');

$mergedCities = array_merge($cities, $customCities);

$meetups['cities'] = $mergedCities;
$meetups['events'] = $mergedEvents; 

$fp = fopen('../data/meetups.json', 'w');
fwrite($fp, json_encode($meetups));
fclose($fp);
