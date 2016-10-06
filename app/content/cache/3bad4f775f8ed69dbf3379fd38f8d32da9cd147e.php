
<?php 
  $currentYear = $calendar->date->format('Y');
  $currentMonth = $calendar->date->format('m');
  $currentWeek = $calendar->date->format('W');

  if($currentWeek === "52") {
    $currentWeek = 0;
  }
 ?>

<time datetime="<?php echo e($currentYear); ?>-<?php echo e($currentMonth); ?>" class="cal__month">
  <span class="visually-hidden"><?php echo e($calendar->date->format('F')); ?></span>

  <?php if($calendar->weekdayNames): ?>
    <span class="cal__week">  
      <?php foreach($calendar->weekdayNames as $weekdayName): ?>
        <span class="cal__day"><?php echo e(substr($weekdayName, 0, 1)); ?>

        </span>
      <?php endforeach; ?>
    </span>
    <?php foreach($calendar->weeksAndDays as $weekCount => $week): ?>
      <?php 
        $nextWeek = $currentWeek + $weekCount;
        $nextWeek = str_pad($nextWeek, 2, 0, STR_PAD_LEFT);
       ?>

      <time datetime="<?php echo e($currentYear); ?>-W<?php echo e($nextWeek); ?>" class="cal__week cal__week--<?php echo e($weekCount); ?>">
        <?php foreach($week as $day): ?>
        
          <?php 
            $dayClasses = 'cal__nr';

            $today = new DateTime();
            $currentDay = DateTime::createFromFormat('d.m.Y', str_pad($day, 2, 0, STR_PAD_LEFT).'.'.$currentMonth.'.'.$currentYear);
            

            if($today->format('d.m.Y') === $currentDay->format('d.m.Y')) {
              $dayClasses = 'cal__nr cal__nr--today';
            }

            if(new DateTime() > $currentDay) {
              $dayClasses = 'cal__nr cal__nr--past';
            }

            if($selectedDay !== '' && (int) date('j', $selectedDay) === $day) {
              $dayClasses .= ' cal__nr--a';
            }
           ?>

          <time datetime="<?php echo e($currentYear); ?>-<?php echo e($currentMonth); ?>-<?php echo e(str_pad($day, 2, 0, STR_PAD_LEFT)); ?>" class="cal__day">

            <?php if(array_key_exists(($nextWeek), $calendar->events)): ?>
              <?php if(array_key_exists($day, $calendar->events[$nextWeek])): ?>
              <?php 
                $eventsOnday = $calendar->events[$nextWeek][$day];
               ?>
                <a href="/events/<?php echo e($settings['location']); ?>/<?php echo e($currentYear); ?>/<?php echo e($currentMonth); ?>/<?php echo e($eventsOnday[0]['id']); ?>" aria-label="<?php echo e($day); ?> View <?php echo e(count($eventsOnday)); ?> Events" class="<?php echo e($dayClasses); ?> cal__nr--date">
                  <?php echo e($day); ?>

                </a>
              <?php else: ?>
                <span class="<?php echo e($dayClasses); ?>"><?php echo e($day); ?></span>
              <?php endif; ?>
            <?php else: ?>
                <span class="<?php echo e($dayClasses); ?>"><?php echo e($day); ?></span>
            <?php endif; ?>
          </time> 
        <?php endforeach; ?>
        <?php if(isset($_GET['eventid']) && $_GET['eventid'] === $selectedID && $nextWeek  === date('W', $selectedDay)): ?>
          <span class="cal__wk__events">
            <?php foreach($calendar->events[date('W', $selectedDay)][date('j', $selectedDay)] as $eventOnDay): ?> 
              <a href="/events/<?php echo e($settings['location']); ?>/<?php echo e($currentYear); ?>/<?php echo e($currentMonth); ?>/<?php echo e($eventOnDay['id']); ?>?view=card"  class="cal__event"><span class="cal__event__txt"><?php echo e($eventOnDay['name']); ?></span>
              </a>
            <?php endforeach; ?>
          </span>
        <?php endif; ?>
      </time> 
    <?php endforeach; ?>
  <?php endif; ?>
</time> 