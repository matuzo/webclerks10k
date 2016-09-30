<?php
  function getWPPosts($type, $query = '') {
    $client = new GuzzleHttp\Client();
    $res = $client->request('GET', 'https://content.webclerks.at/wp-json/wp/v2/'.$type.'/',
        ['query' => $query]);
    return json_decode($res->getBody());
  }

  function slug($string) {
    $specialchar = str_replace(' ', '-', trim(str_replace(str_split('()/,&!:\'.#'), '',$string)));
    $umlauts = str_replace('ö', 'oe', mb_strtolower($specialchar, 'UTF-8'));
    $umlauts = str_replace('ü', 'ue', $umlauts);
    $umlauts = str_replace('ä', 'ae', $umlauts);
    $umlauts = str_replace('ß', 'sz', $umlauts);

    return $umlauts;
  }

  function debug($arr) {
    print "<div class='debug'><pre>".print_r($arr, true)."</pre></div>";
  }

  function formatDate($date) {
    $date = DateTime::createFromFormat("Y-m-d\TH:i:s", $date);
    return $date;
  }

  function lowResPreviewImage($src) {
    // if(!strpos($src, '.svg')) {
    //   $img = new abeautifulsite\SimpleImage($src);
    //   $img->save($src, 10);
    // }

    return $src;
  }

  function getGitHubUser($username) {
    $client = new GuzzleHttp\Client();
    $res = $client->request('GET', 'https://api.github.com/users/'.$username, [
        'headers' => ['User-Agent' => 'matuzo']
    ]);

    return json_decode($res->getBody());
  }

  function buildPageTabs($pages, $menu, $default) {
    $currentPages = [];

    // Alle Seiten (siehe config.php) durchlaufen
    foreach($pages as $key => $page) {
      // Alle news-Seiten filtern
      if($page['menu'] === $menu) {
        $currentPages[$key] = $page;
        // Defaultklassen vergeben
        $currentPages[$key]['classes'] = 'nav__tabs__link';

        // Aktive Link für die aktuelle Kategorie setzen
        if((isset($_GET['category']) && strpos($key, $_GET['category']) !== false) || 
          (!isset($_GET['category']) && strpos($key, $default) !== false)) {
            $currentPages[$key]['classes'] .= ' nav__tabs__link--active';
        }
      }
    }

    return $currentPages;
  }