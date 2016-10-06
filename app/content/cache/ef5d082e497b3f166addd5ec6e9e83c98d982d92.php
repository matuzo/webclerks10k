<!-- htmlmin:ignore -->
<?php 
  $classes = 'ft__card--floated';
  $classes = '';

  if($event['date'] < time()) {
    $classes .= ' ft__card--past';
  }
  
  $imagePath = '/assets/images/webclerks_logo.svg';

  if(!empty($event['photo'])) {
    $imagePath = $event['photo'];
  }
 ?>
<!-- htmlmin:ignore -->



<?php if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal'): ?>
  <?php $__env->startSection('featuredImage'); ?>
    <div class="ft__imgct" data-src="<?php echo e($imagePath); ?>" data-classes="event__img" data-alt=""></div>
  <?php $__env->stopSection(true); ?>
<?php endif; ?>

<?php $__env->startSection('featuredContent'); ?>

<?php if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal'): ?>
  <h4 class="ft__ct__hl"><?php echo e($event['name']); ?></h4>
  <?php if(!empty($event['description'])): ?>
    <?php echo e($event['description']); ?>...
  <?php endif; ?>
<?php else: ?>
  <time class="ft__ct__date" datetime="<?php echo e(date('Y-m-d', $event['date'])); ?>">
    <?php echo e(date('d.m.Y, H:i', $event['date'])); ?>

  </time>
  <h4 class="ft__ct__hl">
    <a href="<?php echo e($event['url']); ?>" target="_blank" class="ft__ct__hl__l">
    <?php echo e($event['name']); ?>

    </a>
  </h4>
<?php endif; ?>

<?php if(!isset($_GET['view']) || $_GET['view'] === 'card' || $_GET['view'] === 'cal'): ?>
  <ul class="event__meta">
    <li class="event__meta__item"> <?php echo e(date('d.m.Y, H:i', $event['date'])); ?></li>

      <?php if(!empty($event['venue'])): ?>
        <li class="event__meta__item"> <?php echo e($event['venue']); ?> </li>
      <?php endif; ?>

      <?php if(!empty($event['city'])): ?>
        <li class="event__meta__item"> <?php echo e($event['city']); ?> </li>
      <?php endif; ?>
  </ul>
<?php endif; ?>

  <a href="<?php echo e($event['url']); ?>" class="btn--round btn ft__btn">
    <span data-inlinesvg="more" class="btn__icon">
      <span class="btn__text">
        View event on meetup.com
      </span>
    </span>
  </a>

<?php if(!isset($error)): ?>
<?php endif; ?>
<?php $__env->stopSection(true); ?>
<?php echo $__env->make('partials.featured', ['classes' => $classes, 'id' => "e{$event['slug']}-{$event['id']}"], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>