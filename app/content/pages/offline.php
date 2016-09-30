<?php
	$currentPage = new stdClass();
	$currentPage->title = "Offline";
	$currentPage->description = "You are unfortunately offline";
	$currentPage->slug = 'offline';
  $currentPage->featuredTitle = "No internet :(";
  $currentPage->contentTitle = "You are unfortunately offline";
  $currentPage->parentClass = '';
  $currentPage->pageClass = 'offline no-card';

	print $blade->view()->make('pages/offline')->with([
														'currentPage' => $currentPage,
														'sitename' => $sitename,
														'pages' => $pages,
                            'cards' => $cards,
														'siteUrl' => $siteUrl,
														])->render();
?>
