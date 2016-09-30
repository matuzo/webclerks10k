<?php
  $currentPage = new stdClass();
  $currentPage->title = "Past Meetups";
  $currentPage->description = "Past Meetups";
  $currentPage->slug = $page;
  $currentPage->featuredTitle = "Last Event: webclerks BBQ";
  $currentPage->contentTitle = "Past Meetups";
  $currentPage->pageClass = $pages[$page]['name'] . ' no-card';
  $currentPage->parentClass = 'meetups tabs';


  $tabs = buildPageTabs($pages, 'meetup', 'grillerei');
  
  echo $blade->view()->make('pages/pastmeetups')->with([
                       'currentPage' => $currentPage, 
                       'sitename' => $sitename,
                       'pages' => $pages,
                       'tabs' => $tabs,
                       'cards' => $cards,
                       'siteUrl' => $siteUrl,
                      ])->render();
?>