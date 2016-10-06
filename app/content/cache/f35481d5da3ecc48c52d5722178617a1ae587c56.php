  <?php 
    $padding = 28;
    $offset = $padding * $cards['currentKeyByPage'];
   ?>

  <?php if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal'): ?>
    <style>
      @media  only screen {
      .ft__cards__inner {
        -ms-transform: translateX(<?php echo e(($cards['cardWidth'] * $currentKeyByPage) * -1); ?>%);
        transform: translateX(<?php echo e(($cards['cardWidth'] * $currentKeyByPage) * -1); ?>%);
        width: <?php echo e($cards['cardsWidth']); ?>;
      }
      .ft__card {
        width: calc(<?php echo e($cards['cardWidth']); ?>% - <?php echo e($padding); ?>px);
        float: left;
        margin-right: <?php echo e($padding); ?>px;
      }
      .ft__hl {
        width: calc(<?php echo e($cards['cardWidth']); ?>% - <?php echo e($padding); ?>px);
        -ms-transform: translateX(calc(<?php echo e((100 * $currentKeyByPage)); ?>% + <?php echo e(($padding * $currentKeyByPage)); ?>px));
        transform: translateX(calc(<?php echo e((100 * $currentKeyByPage)); ?>% + <?php echo e(($padding * $currentKeyByPage)); ?>px));
      }
      .ft__card:not(:nth-of-type(<?php echo e($currentKeyByPage + 1); ?>)) {
        visibility: hidden;
      }
      }
    </style>
  <?php endif; ?>