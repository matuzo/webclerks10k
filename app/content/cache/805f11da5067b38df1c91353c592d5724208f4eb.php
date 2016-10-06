  <?php 
    $featuredClasses = 'site__ct__ft ft js-site-content-featured';
   ?>

<?php if(isset($tabs)): ?>
  <section class="<?php echo e($featuredClasses); ?>" role="tabpanel">
<?php else: ?>
  <section class="<?php echo e($featuredClasses); ?>">
<?php endif; ?>
    <div class="ft__cards">
      <div class="ft__cards__inner js-featured-cards-inner">
        <?php if($currentPage->featuredTitle !== ''): ?>
          <?php if(isset($tabs)): ?>
            <h3 class="ft__hl" tabindes="0"><?php echo e($currentPage->featuredTitle); ?></h3>
          <?php else: ?>
            <h3 class="ft__hl"><?php echo e($currentPage->featuredTitle); ?></h3>
          <?php endif; ?>
        <?php endif; ?>
        <?php echo $__env->yieldContent('featured'); ?>
      </div> 
    </div> 
    <?php echo $__env->yieldContent('featuredNav'); ?>
  </section>