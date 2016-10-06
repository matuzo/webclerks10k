<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('tabs'); ?>
  <?php echo $__env->make('partials.tabs', ['pages' => $tabs, 'menu' => 'news', 'label' => 'Art der Neuigkeiten wählen'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featured'); ?>
  <?php echo $__env->make('partials.featured.recentnews', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>  
  <?php foreach($news as $article): ?>

    <?php 
      $articleClasses = 'art';

      if($article->acf->gesponsered) {
        $articleClasses .= ' art--sponsored';
      }
     ?>

    <article class="<?php echo e($articleClasses); ?>" id="<?php echo e($article->slug); ?>" role="article">
      
      <?php $url = $siteUrl.'news/'.$categoryslug.'/'.$article->slug; ?>
      
      <?php echo $__env->make('partials.article_teaser', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    </article>
  <?php endforeach; ?>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('master', ['order' => 'featuredFirst', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>