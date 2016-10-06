<ul class="nav__tabs" aria-label="<?php echo e($label); ?>" role="tablist">
  <?php 
    $tabCount = 0;
   ?>
  <?php foreach($tabs as $slug => $tab): ?>
    <?php if($tab['menu'] === $menu): ?>      
      <?php 
        $tabAttributes = 'aria-selected="false" tabindex="-1"';
        
        if(strrpos($tab['classes'], "active")):
          $tabAttributes = 'aria-selected="true" tabindex="0"';
        endif;
       ?>
      <li class="nav__tabs__item" role="presentation">
        <a class="<?php echo e($tab['classes']); ?> js-tab" href="/<?php echo e($slug); ?>" role="tab" data-tab="<?php echo e($tabCount); ?>" <?= $tabAttributes ?> data-name="<?php echo e($tab['name']); ?>">
          <span class="nav__tabs__text">
            <?php echo e($tab['menuname']); ?> 
          </span>
        </a>
      </li>
    <?php endif; ?>
    <?php 
      $tabCount++;
     ?>
  <?php endforeach; ?>
</ul>