<?php $__env->startSection('featuredTitle', $currentPage->featuredTitle); ?>

<?php $__env->startSection('featuredImage'); ?>
  <div class="ft__imgct" data-src="/content/files/images/meetup2.jpg" data-classes="ft__imgct__img"></div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredContent'); ?>

  <h3 class="ft__ct__hl ft__ct__hl--card">webclerks Meetup #4</h3>

  <p>24. Oct 2016, start at 19:00 Uhr</p>
  <p>
    <a href="http://www.stockwerk.co.at/">
      Stockwerk Co Workingspace
    </a>
  </p>

  <p>
    Please tell the <a href="http://www.meetup.com/webclerks/">meetup group</a> if you are going or not. This facilitates the planning. Thanks.
  </p>

  <a href="https://www.meetup.com/webclerks/events/231936124/">RSVP</a>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('partials.featured', ['classes' => '', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>