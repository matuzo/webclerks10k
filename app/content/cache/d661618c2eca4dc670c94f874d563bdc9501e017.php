<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('featured'); ?>
  <?php echo $__env->make('partials.featured.404', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
<p>Sorry, the page you are looking for doesn't exist. Take a run around the block or return to  <a href="news">the news</a> page</p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('master', ['order' => 'contentFirst'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>