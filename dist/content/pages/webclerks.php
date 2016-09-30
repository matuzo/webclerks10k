<?php
  $currentPage = new stdClass();
  $currentPage->title = "Who we are";
  $currentPage->description = "Who we are";
  $currentPage->slug = $page;
  $currentPage->featuredTitle = "";
  $currentPage->contentTitle = "webclerks - community & meetup";
  $currentPage->parentClass = '';
  $currentPage->pageClass = $pages[$page]['name'] . ' no-card';


  $params = ['_embed' => ''];

  // $webclerks = getWPPosts('webclerks_clerks', $params);
  $webclerks = json_decode(file_get_contents('content/data/webclerks.json'));

  $currentKey = '';


  if(!isset($_GET['person'])) {
    shuffle($webclerks);
    $_SESSION['webclerks'] = $webclerks;
  } else {
    // debug($_SESSION['webclerks']);
    if(!isset($_SESSION['webclerks'])) {
      $_SESSION['webclerks'] = $webclerks;
    }

    $current = array_filter($_SESSION['webclerks'], function($person, $key) use (&$currentKey) {
      if ($person->slug === $_GET['person']) {
        $currentKey = $key;
        return $person;
      }
    }, ARRAY_FILTER_USE_BOTH);

  }

  $noOfCards = count($webclerks);

  $cards = [
    'currentKeyByPage' => $currentKey,
    'position' => $currentKey * -100,
    'noOfCards' => $noOfCards,
    'cardWidth' => (100 / $noOfCards),
    'cardsWidth' => 'calc('.(100 * $noOfCards).'% + ('.$noOfCards.' * 28px))',
  ];

  echo $blade->view()->make('pages/webclerks')->with([
                       'currentPage' => $currentPage, 
                       'sitename' => $sitename,
                       'pages' => $pages,
                       'webclerks' => $_SESSION['webclerks'],
                       'currentClerk' => $currentKey,
                       'currentKey' => $currentKey,
                       'siteUrl' => $siteUrl,
                       'cards' => $cards,
                      ])->render();
?>