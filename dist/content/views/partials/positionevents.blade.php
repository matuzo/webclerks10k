  @php
    $padding = 28;
    $offset = $padding * $cards['currentKeyByPage'];
  @endphp

  @if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal')
    <style>
      @media only screen {
      .ft__cards__inner {
        -ms-transform: translateX({{ ($cards['cardWidth'] * $currentKeyByPage) * -1 }}%);
        transform: translateX({{ ($cards['cardWidth'] * $currentKeyByPage) * -1 }}%);
        width: {{ $cards['cardsWidth'] }};
      }
      .ft__card {
        width: calc({{ $cards['cardWidth'] }}% - {{ $padding }}px);
        float: left;
        margin-right: {{ $padding }}px;
      }
      .ft__hl {
        width: calc({{ $cards['cardWidth'] }}% - {{ $padding }}px);
        -ms-transform: translateX(calc({{ (100 * $currentKeyByPage) }}% + {{ ($padding * $currentKeyByPage) }}px));
        transform: translateX(calc({{ (100 * $currentKeyByPage) }}% + {{ ($padding * $currentKeyByPage) }}px));
      }
      .ft__card:not(:nth-of-type({{$currentKeyByPage + 1}})) {
        visibility: hidden;
      }
      }
    </style>
  @endif