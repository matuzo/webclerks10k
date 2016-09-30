<?php
	$currentPage = new stdClass();
	$currentPage->title = "News";
	$currentPage->description = "News";
	$currentPage->slug = $page;
  $currentPage->parentClass = 'news tabs';

	// Default Kategori
	$defaultCategory = 'jobs';

	// Legt die category id (WP) und den Titel für die Kategorie fest
	$category = setCategoryIdAndTitle($defaultCategory);
	$categoryId = $category['id'];
	$categoryTitle = $category['title'];
	$categoryTitleMore = $category['titlemore'];
  $currentPage->featuredTitle = $categoryTitle;
  $currentPage->contentTitle = $categoryTitleMore;
  $currentPage->pageClass = $pages[$page]['name'];

	// News, je nach Parameter, holen
  // $allNews = setParamsAndFetchNews($categoryId);
	$allNews = readNews($category['slug']);

  // readNews($category['slug']);

	// Erster Newsartikel
	$featurednews = $allNews[0];

  if(isset($_GET['slug'])) {
    $featurednews = array_filter($allNews, function($news) {
      // print $news->slug."<br >";
      // print $_GET['slug']."<br >";
      return $news->slug === $_GET['slug'];
    });

    $featurednews = current($featurednews);

    $currentPage->pageClass .= ' mobile-card';
  }


	// Tabmenü erstellen
	$tabs = buildPageTabs($pages, 'news', 'jobs');

	##
	## FUNKTIONEN
	##

	function setCategoryIdAndTitle($defaultCategory) {
		// Verfügbare News-Kategorien, derzeit noch hardcoded
		$categories = ['projekte' => array('4', 'Latest project', 'More projects'), 
									 'jobs' => array('2', 'Most current job offer', 'More job offers'), 
									 'branche' => array('3', 'Latest industry news', 'More industry news')];

		// Default Kategorie
		$category = $defaultCategory;

		// Id der Default Kategorie
		$categoryId = $categories[$category][0];

		// Titel der Default Kategorie
		$categoryTitle = $categories[$category][1];

		// Titel für weitere Einträge in der Kategorie
		$categoryTitleMore = $categories[$category][2];

		// Wenn nicht News Startseite
		if(isset($_GET['category'])) {
			// Kategorie
			$category = $_GET['category'];
      // Id der Kategorie
      $categoryId = $categories[$_GET['category']][0];
      // Titel der Kategorie
      $categoryTitle = $categories[$_GET['category']][1];
      // Titel für weitere Einträge der Kategorie
      $categoryTitleMore = $categories[$_GET['category']][2];
      
    }

    return ['slug' => $category, 'id' => $categoryId, 'title' => $categoryTitle, 'titlemore' => $categoryTitleMore];
  }

  function readNews($category) {
    $news = file_get_contents('content/data/'.$category.'.json');
    return json_decode($news);
  }


	function setParamsAndFetchNews($categoryId) {
		// Parameter für WP Query
		$params = ['_embed' => '',
							 // Nach Kategorie filtern 
							 'categories' => $categoryId, 
							 // Absteigend nach Datum ordnen
							 'filter[orderby]' => 'meta_value date', 
							 'filter[order]' => 'DESC',
							 'orderby' => 'date',
		 					 // gesponserte Artikel an den Anfang reihen
							 'filter[meta_key]' => 'gesponsered',
							 ];
		
		// // Wenn eine Kategorie und ein Titel verfügbar sind,
		// // werden nicht alle Artikel angezeigt, sondern nur einer
		// if(isset($_GET['slug'])) {
		// 	$params = ['_embed' => '', 
		// 						 'slug' => $_GET['slug'],
		// 						];

		// // Wenn der zweite Parameter kein Titel, sondern ein Tag ist,
		// // wird nach Tag gefiltert
		// } else if(isset($_GET['tag'])) {
		// 	$params = ['_embed' => '', 
		// 						 'filter[tag]' => $_GET['tag'],
		// 						];
		// }

		// News holen (siehe functions.php)
    // var_dump(getWPPosts('posts', $params));
  
		return getWPPosts('posts', $params);
	}


	function getArticleImage($article, $sizes) {
    $srcset = array();

		if (isset($article->_embedded->{'wp:featuredmedia'})):
      $featured = $article->_embedded->{'wp:featuredmedia'}[0];
      foreach ($sizes as $size) {
        if(isset($featured->media_details->sizes->$size)) {
          $srcset[] = $featured->media_details->sizes->$size->source_url.' '.$featured->media_details->sizes->$size->width.'w';
          // $srcset[] = array('url' => $featured->media_details->sizes->$size->source_url,
                            // 'width' => $featured->media_details->sizes->$size->width);
        } else {
          // $srcset = $featured->media_details->sizes->thumb_small->source_url;
        }
      }
      $featuredAlt = $featured->alt_text; 
    else:
      $srcset = '/assets/images/webclerks_logo.svg';
      $featuredAlt = $article->title->rendered; 
    endif;



		return ['src' => $srcset, 'alt' => $featuredAlt];
	}

	echo $blade->view()->make('pages/news')->with([
                       'pages' => $pages, 
											 'currentPage' => $currentPage, 
											 'sitename' => $sitename,
											 'tabs' => $tabs,
											 'siteUrl' => $siteUrl,
											 'categoryslug' => $category['slug'],
											 'featurednews' => $featurednews,
											 'categoryTitle' => $categoryTitle,
                       'cards' => $cards,
											 'categoryTitleMore' => $categoryTitleMore,
											 'news' => $allNews,
											])->render();
?>