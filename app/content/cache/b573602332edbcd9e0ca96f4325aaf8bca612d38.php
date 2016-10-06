<?php 
  $padding = 28;
 ?>

<style>
  @media  screen and (min-width: 768px) {
    .ft__cards__inner {
      -ms-transform: translateX(<?php echo e(($cards['cardWidth'] * $currentKey) * -1); ?>%);
      transform: translateX(<?php echo e(($cards['cardWidth'] * $currentKey) * -1); ?>%);
      width: <?php echo e($cards['cardsWidth']); ?>;
    }

    .ft__card {
      width: calc(<?php echo e($cards['cardWidth']); ?>% - <?php echo e($padding); ?>px);
      float: left;
      margin-right: <?php echo e($padding); ?>px;
    }

    .ft__card:not(:nth-of-type(<?php echo e($currentKey + 1); ?>)) {
      visibility: hidden;
    }
  }
</style>