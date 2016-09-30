<?php
	$currentPage = new stdClass();
	$currentPage->title = "404";
	$currentPage->description = "Page not found";
	$currentPage->slug = '404';
  $currentPage->featuredTitle = "Page not found :(";
  $currentPage->contentTitle = "Page not found";
  $currentPage->parentClass = '';
  $currentPage->pageClass = 'page404';

	print $blade->view()->make('pages/404')->with([
														'currentPage' => $currentPage, 
														'sitename' => $sitename,
														'pages' => $pages,
                            'cards' => $cards,
														'siteUrl' => $siteUrl,
														])->render();
?>