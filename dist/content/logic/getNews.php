<?php

  require '../../../vendor/autoload.php';

  $categories = array(2, 3, 4);
  $params = ['_embed' => '',
           // Absteigend nach Datum ordnen
           'filter[orderby]' => 'meta_value date', 
           'filter[order]' => 'DESC',
           'orderby' => 'date',
           // gesponserte Artikel an den Anfang reihen
           'filter[meta_key]' => 'gesponsered',
           ];
  
  function getWPPosts($type, $query = '', $categoryId) {
    $newsFiles = array("2" => 'jobs', "3" => 'branche', "4" => 'projekte');
    $client = new GuzzleHttp\Client();
    // Nach Kategorie filtern 
    $query['categories'] = $categoryId; 
        $myFile = fopen('../data/'.$newsFiles[$categoryId].'.json', 'w') or die('Problems');

    $res = $client->request('GET', 'https://content.webclerks.at/wp-json/wp/v2/'.$type.'/',
        ['query' => $query,
        'save_to' => $myFile]);
  }


  foreach ($categories as $category) {
    getWPPosts('posts', $params, $category);
  }
