<?php
  $featuredImage = getArticleImage($article, array('thumb_small'));
  $src = explode(' ', $featuredImage['src'][0])[0];
  
  $containerClasses = 'art__imgct';

  if(strpos($src, 'webclerks_logo.svg')) {
    $containerClasses = 'art__imgct art__imgct--webclerks';
  }
?>

<a href="<?php echo e($url); ?>" class="art__link js-article-link">
  
  <div class="<?php echo e($containerClasses); ?>" data-src="<?php echo e($src); ?>" data-classes="art__img" data-alt="<?php echo e($featuredImage['alt']); ?>">
  </div>  

  <h4 class="art__hl">
      <?php echo e($article->title->rendered); ?>

  </h4>

  <p class="art__meta">
    <time datetime="<?php echo e(formatDate($article->date)->format("Y-m-d")); ?>">
      von webclerks am <?php echo e(formatDate($article->date)->format("d.F.Y")); ?>

    </time>
  </p>

  <?php if($article->acf->gesponsered): ?>
    <p class="art__sponsored">
      <span class="visually-hidden">Dieser Artikel wurde </span>gesponsert
    </p>
  <?php endif; ?>
</a>