<?php $__env->startSection('featuredTitle', $currentPage->featuredTitle); ?>

<?php $__env->startSection('featuredImage'); ?>
  <?php
    $featuredImage = getArticleImage($featurednews, array('image285', 'image435', 'full'));
    $src = explode(' ', $featuredImage['src'][0])[0];
    $srcset = implode(",", $featuredImage['src']);
  ?>
  <div class="ft__imgct ft__imgct--<?php echo e($_SESSION['events_view']); ?>" data-src="<?php echo e($src); ?>" data-srcset="<?php echo e($srcset); ?>" data-classes="ft__img" data-alt="<?php echo e($featuredImage['alt']); ?>">
  </div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredContent'); ?>
  <h4 class="ft__ct__hl"><?php echo e($featurednews->title->rendered); ?></h4>

  <?php echo $featurednews->content->rendered; ?>


  <a href="/news/<?php echo e($categoryslug); ?>" class="btn btn--round btn--small ft__btn ft__btn--close">
    <span class="svg-close icon--close icon ft__btn__icon">
      <span class="btn__text">
        Close
      </span>
    </span>
  </a>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('partials.featured', ['classes' => '', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>