<?php
  $currentPage = new stdClass();
  $currentPage->title = "Meetups";
  $currentPage->description = "Meetups";
  $currentPage->slug = $page;
  $currentPage->pageClass = $pages[$page]['name'] . ' no-card';
  $currentPage->parentClass = 'meetups tabs';
  $currentPage->featuredTitle = "Upcomping event";
  $currentPage->contentTitle = "webclerks october meetup";

  $tabs = buildPageTabs($pages, 'meetup', 'grillerei');

  echo $blade->view()->make('pages/meetup')->with([
                       'currentPage' => $currentPage, 
                       'sitename' => $sitename,
                       'pages' => $pages,
                       'cards' => $cards,
                       'tabs' => $tabs,
                       'siteUrl' => $siteUrl,
                      ])->render();
?>