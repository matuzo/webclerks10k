<?php $__env->startSection('featuredImage'); ?>
  <div class="ft__imgct ft__imgct--fullheight" data-src="<?php echo e(getUserImage($webclerk->acf->twitterhandle, '', '', 600, false)); ?>" data-classes="ft__imgct__img"></div>
<?php $__env->stopSection(true); ?>

<?php $__env->startSection('featuredContent'); ?>

  <h3 class="ft__ct__hl ft__ct__hl--card"><?php echo e($webclerk->title->rendered); ?></h3>
  
  <p>
    <?php echo e($webclerk->acf->aufgaben); ?>

  </p>
  
  <?php echo $webclerk->content->rendered; ?>

  <?php echo $webclerk->acf->links; ?>


 <a href="https://www.twitter.com/<?php echo e($webclerk->acf->twitterhandle); ?>" class="btn--round btn ft__btn">
    <span data-inlinesvg="twitter" class="btn btn__icon">
      <span class="btn__text">
        view twitter page
      </span>
    </span>
  </a>

<?php $__env->stopSection(true); ?>

<?php echo $__env->make('partials.featured', ['classes' => 'ft__card--no-headline', 'id' => $webclerk->slug], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>