<section class="events__filter dialog" data-modal-content="filter" <?php if(isset($_GET['modal']) && $_GET['modal'] === 'filter'): ?> style="display: block" <?php endif; ?>>
  <h3 class="events__filter__hl dialog__hl" id="events_filter">Filter</h3>
  <div class="dialog__ct">
    <?php if($settings['location'] !== 'alle'): ?>
      <ul class="events__filter__items" aria-labelledby="events_filter">
        <?php foreach($settings['cityFilter'] as $city): ?>
        <li class="events__filter__item">
          <a class="<?php echo e($city['classes']); ?> events__filter__link" href="<?php echo e($city['url']); ?>?view=<?php echo e($_SESSION['events_view']); ?>">
            <?php echo e($city['name']); ?>

          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </div>
</section>
