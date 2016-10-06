<div class="cal"> 
  <?php echo $__env->make('partials.calendar_switchmonths', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
  <div class="cal__wrapper">
    <div class="cal__months">
      <?php echo $__env->make('partials.calendar_widget', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
    </div> <!-- cal__calendars -->
  </div> <!-- cal__wrapper -->
</div> <!-- .cal -->
