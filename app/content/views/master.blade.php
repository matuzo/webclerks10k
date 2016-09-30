<!DOCTYPE html>
<html lang="en" class="no-js site site--{{ $order}} {{$currentPage->parentClass}} {{$currentPage->pageClass}}" id="webclerks">
<head>
  <meta charset="UTF-8">
  <title>{{ $sitename }} | @yield('title')</title>

  <meta name="description" content="{{ $currentPage->description }}">

  <meta name="viewport" content="width=device-width, minimum-scale=1.0">

  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icons/apple-touch-icon.png">

  <link rel="icon" type="image/png" href="/assets/images/icons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/assets/images/icons/favicon-16x16.png" sizes="16x16">

  <link rel="manifest" href="/manifest.json">
  <link rel="mask-icon" href="/assets/images/icons/safari-pinned-tab.svg" color="#ff566c">
  <meta name="theme-color" content="#ff566c">
 
  <!--[if lt IE 9]>
    <script src="/assets/scripts/vendor/html5shiv.js"></script>
  <![endif]-->
  
  <!-- build:inlinecss -->
    <link rel="stylesheet" href="/assets/styles/critical.css">
  <!-- endbuild -->
  
  <!-- build:remove -->
    <link rel="stylesheet" href="/assets/styles/main.css">
    <link rel="stylesheet" href="/assets/styles/enhanced.css">
  <!-- endbuild -->

 
  <noscript>
    <!-- noscript:css -->
    <!-- endinject -->
  </noscript>


  <!-- build:inlinejs -->
    <script src="/assets/scripts/vendor/loadCSS.js"></script>
    <script src="/assets/scripts/vendor/loadJS.js"></script>
  <!-- endbuild -->

  <!-- build:inlinejs2 -->
    <script src="/assets/scripts/inline.js"></script>
  <!-- endbuild -->
 
<?php if(isset($_SESSION['fullcss'])) { 
?>
   <!-- inject:full:css -->
  <!-- endinject -->

<?php
} else {
?>
   <!-- inject:css -->
  <!-- endinject -->  
<?php
}
?>
@if(isset($_GET['page']) && $_GET['page'] === 'events')
  @include('partials.positionevents')
@elseif (isset($_GET['page']) && $_GET['page'] === 'webclerks')
  @include('partials.positionwebclerks')
@endif


</head>
<body class="page js-page">

  @include('layout.header')

  @include('layout.content')

  @include('layout.mainnav')
  
  @include('layout.footer')

  <!-- inject:js -->
  <!-- endinject -->
  
  <!-- build:remove -->
    <script src="/assets/scripts/main.compiled.js"></script>
    {{-- <script src="/assets/scripts/vendor/tota11y.min.js"></script> --}}
  <!-- endbuild -->

</body>
</html>