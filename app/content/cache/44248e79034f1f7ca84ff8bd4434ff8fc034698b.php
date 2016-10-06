  <?php if($currentKey > 0): ?>
    <a class="nav__arrow nav__arrow--left" href="<?php echo e($url); ?><?php echo e($all[$currentKey - 1][$slug]); ?>?view=card" title="<?php echo e($all[$currentKey - 1]['slug']); ?>">
      <span data-inlinesvg="arrow_prev" class="nav__arrow__icon">
        <span class="visually-hidden"><?php echo e($prevString); ?></span>
      </span>
    </a>
  <?php else: ?>
    <span class="nav__arrow nav__arrow--left" aria-hidden="true">
      <span data-inlinesvg="arrow_prev" class="nav__arrow__icon nav__arrow__icon--ia"></span>
    </span>
  <?php endif; ?>
  <?php if($currentKey < (count($all) - 1)): ?>
    <a class="nav__arrow nav__arrow--right" href="<?php echo e($url); ?><?php echo e($all[$currentKey + 1][$slug]); ?>?view=card" title="<?php echo e($all[$currentKey + 1]['slug']); ?>">
      <span data-inlinesvg="arrow_next" class="nav__arrow__icon">
        <span class="visually-hidden"><?php echo e($nextString); ?></span>
      </span>
    </a>
  <?php else: ?>
    <span class="nav__arrow nav__arrow--right" aria-hidden="true">
      <span data-inlinesvg="arrow_next" class="nav__arrow__icon nav__arrow__icon--ia"></span>
    </span>
  <?php endif; ?>