<?php
  $currentPage = new stdClass();
  $currentPage->title = "Contact";
  $currentPage->description = "Contact";
  $currentPage->slug = $page;
  $currentPage->featuredTitle = "webclerks Newsletter";
  $currentPage->contentTitle = "Get in touch with us";
  $currentPage->parentClass = '';
  $currentPage->pageClass = $pages[$page]['name'] . ' no-card';

  echo $blade->view()->make('pages/kontakt')->with([
                       'currentPage' => $currentPage, 
                       'sitename' => $sitename,
                       'pages' => $pages,
                       'cards' => $cards,
                       'siteUrl' => $siteUrl,
                      ])->render();
?>