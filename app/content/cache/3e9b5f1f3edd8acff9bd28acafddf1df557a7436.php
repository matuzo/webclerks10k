<main class="site__ct js-site-content page__ct clearfix" id="hauptinhalt" role="main">
  <h2 class="page__hl">
    <?php echo $__env->yieldContent('title'); ?>
  </h2>

  <?php echo $__env->yieldContent('tabs'); ?>

  <?php if($order === 'featuredFirst'): ?>
    <?php echo $__env->make('partials.featured_content', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php endif; ?>

  <section class="site__ct__main main-content js-site-content-section js-site-content-main">
    <div class="site__ct__main__inner">
      <h3 class="main-content__hl"><?php echo e($currentPage->contentTitle); ?></h3>
      <?php echo $__env->yieldContent('content'); ?>
    </div>
  </section>
  <?php if($order !== 'featuredFirst'): ?>
    <?php echo $__env->make('partials.featured_content', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <?php endif; ?>
</main>