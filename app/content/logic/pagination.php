<?php
  function eventPagination($totalEvents, $location, $curPage) {

    $pagination = new Stdclass;

    $pagination->url =  '/events/'.$location;

    if(isset($_GET['year'])) {
      $pagination->url .= '/'.$_GET['year'];
    }

    if(isset($_GET['month'])) {
      $pagination->url .= '/'.$_GET['month'];
    }

    // number of rows to show per page
    $rowsperpage = 5;
    // find out total pages
    $totalpages = ceil($totalEvents / $rowsperpage);
    $pagination->totalpages = $totalpages;

    // get the current page or set a default
    if (isset($_GET['currentpage']) && is_numeric($_GET['currentpage'])) {
       // cast var as int
       $currentpage = (int) $_GET['currentpage'];
    } else if($curPage) {
       $currentpage = $curPage;
    } else {
       // default page num
       $currentpage = 1;
    } // end if

    // if current page is greater than total pages...
    if ($currentpage > $totalpages):
       // set current page to last page
       $currentpage = $totalpages;
    endif;

    // if current page is less than first page...
    if ($currentpage < 1):
       // set current page to first page
       $currentpage = 1;
    endif;

    // the offset of the list, based on current page 
    $offset = ($currentpage - 1) * $rowsperpage;

    /******  build the pagination links ******/
    // range of num links to show
    $range = 3;

    $url = '';

    $pagination->currentpage = 1;
    $pagination->pages = array();
    // loop to show links to range of pages around current page
    for ($x = ($currentpage - $range); $x < (($currentpage + $range) + 1); $x++) {
      // if it's a valid page number...
      if (($x > 0) && ($x <= $totalpages)) {
        $pagination->pages[] = $x;
        // if we're on current page...
        if ($x == $currentpage) {
          // 'highlight' it but don't make a link
          $pagination->currentpage = $x;
          // if not current page...
        }
      } // end if 
    } // end for


    return $pagination;
  }