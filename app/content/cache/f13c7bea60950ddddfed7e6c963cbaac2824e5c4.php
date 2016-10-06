<?php $__env->startSection('featuredTitle', $currentPage->featuredTitle); ?>

<?php $__env->startSection('featuredImage'); ?>
  <div class="ft__imgct ft__imgct--fullheight" data-src="/content/files/images/grillplatz12.jpg" data-classes="ft__imgct__img"></div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('featuredContent'); ?>
  <p>Sign up for our newsletter to receive news form the industry, job offers and infos about our events.</p>

  <div id="mc_embed_signup">
    <form action="//webclerks.us12.list-manage.com/subscribe/post?u=42557a80686cbcee8a0e47854&amp;id=9ca3d71dca" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="form validate" target="_blank">
      <fieldset class="form__fs">
        <legend class="form__legend">webclerks newsletter subscription</legend>
        <div id="mc_embed_signup_scroll" class="form__item">
          <p class="mc-field-group form__paragraph">
            <label for="mce-EMAIL" class="form__label">
              E-Mail »
            </label>
            <input class="required form__input" id="mce-EMAIL" name="EMAIL" type="email" value="" required aria-required="true"  placeholder="e.g. claudia@webclerks.at">
          </p>
          <p class="mc-field-group form__paragraph">
            <label for="mce-FNAME" class="form__label">
              Name »
            </label>
            <input class="required form__input" id="mce-FNAME" name="FNAME" type="text" value="" required aria-required="true" autocapitalize="words" autocomplete="name" autocorrect="off" placeholder="e.g. Claudia">
          </p>

          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_42557a80686cbcee8a0e47854_9ca3d71dca" tabindex="-1" value=""></div>

          <button class="form__btn btn btn--round" id="mc-embedded-subscribe" name="subscribe" type="submit">Send</button>
        </div>
        <p class="form__hint">All fields are required</p>

      </fieldset>
    </form>
  </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('partials.featured', ['classes' => '', 'id' => ''], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>