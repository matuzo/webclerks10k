<?php
  require 'vendor/autoload.php';

  session_start();
  
  use Philo\Blade\Blade;

  $views = __DIR__ . '/content/views';
  $cache = __DIR__ . '/content/cache';
  $blade = new Blade($views, $cache);
  
  require 'content/logic/getCitiesAndEvents.php';
  require 'content/logic/calendar.php';
  require 'content/logic/pagination.php';
  require 'content/logic/getUserImage.php';
  require 'content/logic/config.php';
  require 'content/logic/functions.php';


  if(array_key_exists($page, $pages)):
    include 'content/pages/'.$pages[$page]['file'].'.php';
  else:
    include 'content/pages/404.php';
  endif;

