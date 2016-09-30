const gulp = require('gulp'),
     usemin = require('gulp-usemin'),
     htmlmin = require('gulp-htmlmin'),
     uglify = require('gulp-uglify'),
     minifyCss = require('gulp-minify-css'),
     inject = require('gulp-inject'),
     rev = require('gulp-rev');

/**
* HTML von master minifyen, 
* JS zusammenfügen, uglifyen und revisionieren
* CSS vielfache Media Queries zusammenfassen, minifyen, revisionieren
*/

gulp.task('usemin', function() {
  return gulp.src(['app/content/views/master.blade.php'])
  .pipe(usemin({
    html: [ htmlmin({collapseWhitespace: true}) ],
    jsAttributes : {
      async : true,
      defer : true,
    },
    inlinejs: [ uglify() ],
    inlinejs2: [ uglify() ],
    inlinecss: [ minifyCss() ],
    assetsDir: 'app',
    outputRelativePath: '../../',
  }))
  .pipe(gulp.dest('dist/content/views'))
  // .pipe()
});

/**
 * Blade Templates minifyen und kopieren
 */

 gulp.task('minify-blade-and-copy', function() {
  return gulp.src(['app/content/views/**/*.blade.php', '!app/content/views/master.blade.php'])
  // .pipe(htmlmin({
  //   collapseWhitespace: false,
  //       // ignoriert: {{ }}, <?php ?>, und @if()
  //       ignoreCustomFragments: [/\{\{[^\}]+\}\}/g, /<\?[\s\S]*?\?>/, /\@if[^\}]+\)/],
  //   removeComments: true
  // }))
  .pipe(gulp.dest('dist/content/views'));
});

/**
 * CSS wird mit rel preload eingebunden ('preload' wird bei onload per JS zu 'stylesheet' )
 * Zusätzlich wird das JS auch normal mit noscript eingebunden, falls JS nicht funktioniert
 */
 gulp.task('inject-css', function () {
  var target = gulp.src('dist/content/views/master.blade.php');
  var outputFolder = 'dist/content/views';
  var cssSource = gulp.src(['dist/assets/styles/*.css', '!dist/assets/styles/main.css', '!dist/assets/styles/m.css'], {read: false });
  var baseCSSSource = gulp.src(['dist/assets/styles/main.css'], {read: false });
  var jsSource = gulp.src(['dist/assets/scripts/*.js', '!dist/assets/scripts/m.js'], {read: false });

  function cssPreload(filepath) {
    if (filepath.slice(-4) === '.css') {
        return '<script>if ( "classList" in document.documentElement ) { loadCSS( "' + filepath + '" ); }</script>';
    }
    
    return inject.transform.apply(inject.transform, arguments);
  }

  function jsAsyncDefer(filepath) {
    // if (filepath.slice(-3) === '.js') {
    //  return '<script src="' + filepath + '" async defer></script>';
    // }
    if (filepath.slice(-3) === '.js') {
     return '<script>if ( "classList" in document.documentElement ) { loadJS( "' + filepath + '" ); }</script>';
    }

    return inject.transform.apply(inject.transform, arguments);
  }

  return target
    .pipe(inject(
        cssSource, 
        {ignorePath: '/dist', starttag: '<!-- inject:full:{{ext}} -->'}
    ))

  // Mit custom transform (preload) einbinden
  .pipe(inject(
    cssSource, 
    { ignorePath: '/dist', transform: cssPreload }
    ))
  // In noscript Element einbinden
  .pipe(inject(
    baseCSSSource, 
    { ignorePath: '/dist', name: 'noscript' }
    ))
  // Js einbinden
  .pipe(inject(
    jsSource, 
    { ignorePath: '/dist', transform: jsAsyncDefer  }
    ))
  .pipe(gulp.dest(outputFolder));
});
