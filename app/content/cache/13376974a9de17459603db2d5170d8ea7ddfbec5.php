<div class="ft__card ft__card--<?php echo e($_SESSION['events_display']); ?> <?php echo e($classes); ?>" <?php if($id): ?> id="<?php echo e($id); ?>" <?php endif; ?>>
    <?php echo $__env->yieldContent('featuredImage'); ?>
  <div class="ft__ct ft__ct--<?php echo e($_SESSION['events_display']); ?>">
    <?php echo $__env->yieldContent('featuredContent'); ?>
  </div> 
</div> 