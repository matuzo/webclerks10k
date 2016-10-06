<?php $__env->startSection('featuredTitle', $currentPage->featuredTitle); ?>

<?php $__env->startSection('featuredImage'); ?>
  <div class="ft__imgct ft__imgct--fullheight" data-src="/content/files/images/schaltkreis.jpg" data-classes="ft__imgct__img"></div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredContent'); ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('partials.featured', ['classes' => '', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>