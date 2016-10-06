<?php $__env->startSection('featuredTitle', $currentPage->featuredTitle); ?>

<?php $__env->startSection('featuredImage'); ?>
  <div class="ft__imgct" data-src="/content/files/images/grillplatz12.jpg" data-classes="ft__imgct__img"></div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredContent'); ?>

  <h3 class="ft__ct__hl ft__ct__hl--card">Performance, Bots & More</h3>

  <p>23.09.2016</p>
  <p>
    <a href="https://www.wien.gv.at/stadtplan/grafik.aspx?lang=de-AT&bookmark=1mx7RnDOdkZFtwlEeI6EQ-a5RphlnMHnkur2pH4Oprw-b-b">
      Donauinsel Grillplatz 12
    </a>
  </p>

  <p>
    The first webclerks BBQ took place on 23.09 at „Donauinsel“. There all people could talk completely apart from offices and working spaces.
  </p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('partials.featured', ['classes' => '', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>