<div class="cal__change">
  <?php $prevMonth = $calendar->previousDate->format('F'); ?>

  <?php if($calendar->showPrevMonth): ?>
    <a class="cal__change-month cal__change-month--prev" href="/events/<?php echo e($settings['location']); ?>/<?php echo e($calendar->previousDate->format('Y/m')); ?>?view=<?php echo e($_SESSION['events_view']); ?>">
        <span data-inlinesvg="arrow_prev" class="cal__change-month__icon">
          <span class="visually-hidden">Previous month:</span> <span class="cal__txt"><?php echo e($prevMonth); ?></span>
        </span>
    </a>
  <?php else: ?>
    <span class="cal__change-month cal__change-month--prev">
      <span data-inlinesvg="arrow_prev" class="cal__change-month__icon cal__change-month__icon--ia">
      </span>
    </span>
  <?php endif; ?>

  <span class="cal__change-month--current"><?php echo e($calendar->date->format('F')); ?></span>

  <?php $nextMonth = $calendar->nextDate->format('F'); ?>

  <?php if($calendar->showNextMonth): ?>
    <a class="cal__change-month cal__change-month--next" href="/events/<?php echo e($settings['location']); ?>/<?php echo e($calendar->nextDate->format('Y/m')); ?>?view=<?php echo e($_SESSION['events_view']); ?>">
      <span data-inlinesvg="arrow_next" class="cal__change-month__icon">
        <span class="visually-hidden">Next month:</span> <span class="cal__txt"><?php echo e($nextMonth); ?></span>
      </span>
    </a>
  <?php else: ?>
    <span class="cal__change-month cal__change-month--next">
      <span data-inlinesvg="arrow_next" class="cal__change-month__icon cal__change-month__icon--ia">
      </span>
    </span>
  <?php endif; ?>
</div>