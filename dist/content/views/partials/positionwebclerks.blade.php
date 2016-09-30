@php
  $padding = 28;
@endphp

<style>
  @media screen and (min-width: 768px) {
    .ft__cards__inner {
      -ms-transform: translateX({{ ($cards['cardWidth'] * $currentKey) * -1 }}%);
      transform: translateX({{ ($cards['cardWidth'] * $currentKey) * -1 }}%);
      width: {{ $cards['cardsWidth'] }};
    }

    .ft__card {
      width: calc({{ $cards['cardWidth'] }}% - {{ $padding }}px);
      float: left;
      margin-right: {{ $padding }}px;
    }

    .ft__card:not(:nth-of-type({{$currentKey + 1}})) {
      visibility: hidden;
    }
  }
</style>