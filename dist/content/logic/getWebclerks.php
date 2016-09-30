<?php
  require '../../../vendor/autoload.php';

  $params = ['_embed' => ''];
  
  function getWPPosts($type, $query = '') {
    $client = new GuzzleHttp\Client();
    $myFile = fopen('../data/webclerks.json', 'w') or die('Problems');

    $res = $client->request('GET', 'https://content.webclerks.at/wp-json/wp/v2/'.$type.'/',
        ['query' => $query,
        'save_to' => $myFile]);
  }

  getWPPosts('webclerks_clerks', $params);
