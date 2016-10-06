<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('featured'); ?>
  <?php echo $__env->make('partials.featured.offline', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
<p>Oh, Oh… it looks like the connection was interrupted. Please connect to the internet to see this page or visit one of the available offline pages:</p>

<div class="js-offline-pages"></div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('master', ['order' => 'featuredFirst'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>