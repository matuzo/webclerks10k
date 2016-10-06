<?php $__env->startSection('title', $currentPage->title); ?>

<?php $__env->startSection('featured'); ?>


  <?php echo $__env->renderEach('partials.featured.webclerk', $webclerks, 'webclerk'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredNav'); ?>

  <?php echo $__env->make('partials.featured_nav', ['slug' => 'slug', 'all' => json_decode(json_encode($webclerks), true), 'url' => '/webclerks/', 'prevString' => 'Vorherige(r) webclerk', 'nextString' => ' Nächste(r) webclerk'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
  <p>You are interested in the everything concerning websites? Cool, so are we! That’s the reason we founded web clerks: to get together with great people that work in the different fields of the web industry. </p>

  <strong>This meetup is for:</strong>

  <ul class="list">
    <li class="list__it"><span class="list__txt">Front- and Backend Developers</span></li>
    <li class="list__it"><span class="list__txt">UX/UI Designers</span></li>
    <li class="list__it"><span class="list__txt">sability, Accessibility, Marketing & SEO specialists</span></li>
    <li class="list__it"><span class="list__txt">and everyone interested in one of the above fields!</span></li>
  </ul>

  <h3 class="main-content__hl">How does this work?</h3>

  <p>We meet up once every 1,5 months to listen to talks, eat snacks, get to know each other and socialise. Everyone  is welcome, no matter your skill level, design tool of choice or programming language. We are looking forward to great events and interesting people!</p>

  <section class="team">
    <p class="team__lbl">
      <strong>The team</strong>
    </p>

    <ul class="image-list">
      <?php foreach($webclerks as $webclerk): ?>
        <li class="image-list__it">
          <a class="image-list__a" href="/webclerks/<?php echo e($webclerk->slug); ?>#<?php echo e($webclerk->slug); ?>">
            <div class="image-list__img" data-src="<?php echo e(getUserImage($webclerk->acf->twitterhandle, '', '')); ?>" data-classes="d"></div>
            <span class="visually-hidden">
              <?php echo e($webclerk->title->rendered); ?>

            </span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </section>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('master', ['order' => 'contentFirst'], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>