<?php
  $currentPage = new stdClass();
  $currentPage->title = "Imprint";
  $currentPage->description = "Imprint";
  $currentPage->slug = $page;
  $currentPage->featuredTitle = "Imprint";
  $currentPage->contentTitle = "webclerks";
  $currentPage->parentClass = '';
  $currentPage->pageClass = $pages[$page]['name'];

  echo $blade->view()->make('pages/impressum')->with([
                       'currentPage' => $currentPage, 
                       'sitename' => $sitename,
                       'pages' => $pages,
                       'cards' => $cards,
                       'siteUrl' => $siteUrl,
                      ])->render();
?>