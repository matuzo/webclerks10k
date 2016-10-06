<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('tabs'); ?>
  <?php echo $__env->make('partials.tabs', ['pages' => $tabs, 'menu' => 'meetup', 'label' => 'Upcoming or past meetups'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featured'); ?>
  <?php echo $__env->make('partials.featured.nextevent', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
  <section>
    <h4 class="main-content__subhl">webclerks Meetup #4</h4>

    <p class="main-content__meta">
      <span class="main-content__meta__date">24. Oct 2016 -</span>
      <a class="main-content__meta__place" href="http://www.stockwerk.co.at/">Stockwerk</a>
    </p>

    <div data-src="/content/files/images/meetup2.jpg" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>

    <p class="main-content__p">The fourth webclerks meetup takes place on 24. October at <a href="http://www.stockwerk.co.at/">Stockwerk Coworking Space</a>. You will meet different people from different areas out of World Wide Web and you will hear and see three fabulous presentations. Thanks to our sponsors, we can offer drinks and snacks for your physical-well being (while stocks last).</p>

    <p>
      <a href="http://www.meetup.com/webclerks/events/231936124/">RSVP</a>
    </p>

    <h5 class="list-img-info__subhl">Talks &amp; Speakers</h5>
    <ul class="list-img-info">
      <li class="list-img-info__item">
        <div data-src="<?php echo e(getUserImage('ganslandt', '', '')); ?>" data-alt="webclerks Meetup #3" data-classes="list-img-info__item__img"></div>
        <h6 class="list-img-info__item__talk">Animations</h6>
        <p class="list-img-info__item__des">
          <span class="item__des__name">Björn Ganslandt</span>
          <a class="item__des__link" href="https://twitter.com/3x14159265">@Ansimorph</a>
        </p>
      </li>
      <li class="list-img-info__item">Coming soon</li>
      <li class="list-img-info__item"></li>
    </ul>

    <!-- <h5 class="list-img-info__subhl">Sponsors</h5>
    <ul class="list-img-info">
      <li class="list-img-info__item">
        <div data-src="/content/files/images/easyname_logo.webp" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>
      </li>
      <li class="list-img-info__item">
        <div data-src="/content/files/images/stockwerk_logo.webp" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>
      </li>
      <li class="list-img-info__item">
      </li>
    </ul> -->
  </section>

  <section>
    <h4 class="main-content__subhl">webclerks Meetup #5</h4>

    <p class="main-content__meta">
      <span class="main-content__meta__date">12. Dec 2016 -</span>
      <a class="main-content__meta__place" href="http://www.stockwerk.co.at/">Stockwerk</a>
    </p>

    <div data-src="/content/files/images/meetup2.jpg" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>

    <p class="main-content__p">The fifth webclerks meetup takes place on 12. December  at <a href="http://www.stockwerk.co.at/">Stockwerk Coworking Space</a>. You will meet different people from different areas out of World Wide Web and you will hear and see three fabulous presentations. Thanks to our sponsors, we can offer drinks and snacks for your physical-well being (while stocks last).</p>

    <p>
      <a href="http://www.meetup.com/webclerks/events/231936148/">RSVP</a>
    </p>

    <h5 class="list-img-info__subhl">Talks &amp; Speakers</h5>
    <ul class="list-img-info">
      <li class="list-img-info__item">Coming soon</li>
      <li class="list-img-info__item"></li>
      <li class="list-img-info__item"></li>
    </ul>

    <!-- <h5 class="list-img-info__subhl">Sponsors</h5>
    <ul class="list-img-info">
      <li class="list-img-info__item">
        <div data-src="/content/files/images/easyname_logo.webp" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>
      </li>
      <li class="list-img-info__item">
        <div data-src="/content/files/images/stockwerk_logo.webp" data-alt="webclerks Meetup #3" data-classes="main-content__img"></div>
      </li>
      <li class="list-img-info__item">
      </li>
    </ul> -->
  </section>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('master', ['order' => 'featuredFirst'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>