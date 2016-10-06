<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('featured'); ?>

<?php echo $__env->renderEach('partials.featured.event', $eventsByPage, 'event'); ?>
  
  <?php if($_SESSION['events_view'] === 'list'): ?>
    <?php echo $__env->make('partials.pagination', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php else: ?>
    <?php $__env->startSection('featuredNav'); ?>
      <?php echo $__env->make('partials.featured_nav', ['slug' => 'id', 'all' => array_values($events), 'url' => $eventUrl, 'prevString' => 'Vorheriges Events', 'nextString' => 'Nächstes Event'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
    <?php $__env->stopSection(); ?>
  <?php endif; ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
  <?php if(isset($error)): ?>
    error :(
  <?php else: ?>
    <?php echo $__env->make('partials.cityfilter', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    <?php echo $__env->make('partials.event_view_nav', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    <?php echo $__env->make('partials.calendar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php endif; ?>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('master', ['order' => 'featuredFirst'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>