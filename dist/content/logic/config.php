<?php
  $sitename = "webclerks";
  $siteUrl = "/";

  define("FETCHUSERIMAGES", false);
  define("EVENTSPERPAGE", 5);
  date_default_timezone_set('Europe/Vienna'); 

  $pages = [
    "news" => ["menuname" => "News", "menu" => "main", "file" => "news", "name" => "jobs"],
      "news/jobs" => ["menuname" => "Jobs", "menu" => "news", "file" => "news", "name" => "jobs"],
      "news/projekte" => ["menuname" => "Projects", "menu" => "news", "file" => "news", "name" => "projects"],
      "news/branche" => ["menuname" => "Industry", "menu" => "news", "file" => "news", "name" => "industry"],
    "events" => ["menuname" => "Events", "menu" => "main", "file" => "events", "name" => "events"],
    "meetup" => ["menuname" => "Meetup", "menu" => "main", "file" => "meetup", "name" => "meetup"],
      "meetup/grillerei" => ["menuname" => "Upcoming", "menu" => "meetup", "file" => "meetup", "name" => "nextmeetup"],
      "meetup/vergangene" => ["menuname" => "Past", "menu" => "meetup", "file" => "pastmeetups", "name" => "pastmeetups"],
    "webclerks" => ["menuname" => "webclerks", "menu" => "main", "file" => "webclerks", "name" => "webclerks"],
    "kontakt" => ["menuname" => "Contact", "menu" => "main", "file" => "kontakt", "name" => "contact"],
    "impressum" => ["menuname" => "Imprint", "menu" => "", "file" => "imprint", "name" => "imprint"],
    "offline" => ["menuname" => "", "menu" => "", "file" => "offline", "name" => "offline"],
  ];

  $page = 'news';
  $page = 'news';

  if(isset($_GET['page'])) {
    $page = $_GET['page'];

    if(isset($_GET['category'])) {
      $page = $_GET['page'].'/'.$_GET['category'];
    }
  }

  $errormessages[] = 'Im ausgewählten Monat gibt es leider keine Events. <br /> Schau doch einfach was <a href="/events">aktuellen Monat</a> los ist.';
  $errormessages[] = 'In dieser Stadt gibt es leider keine Events <br /> Schau doch einfach was <a href="/events/oesterreich">in Österreich</a> los ist.';

// Defaults

$noOfCards = 1;

$cards = [
  'noOfCards' => $noOfCards,
  'cardWidth' => (100 / $noOfCards),
  'cardsWidth' => 100 * $noOfCards.'%',
];

if(!isset($_GET['page']) || $_GET['page'] !== 'events') {
  $_SESSION['events_view'] = 'cal';
  $_SESSION['events_display'] = 'card';
}