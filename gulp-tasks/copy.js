const gulp = require('gulp'),
      replace = require('gulp-replace'),
      chmod = require('gulp-chmod'),
      runSequence = require('run-sequence');

/**
*  Copy misc files
*/

gulp.task('copy-misc', function() {
  gulp.src(['app/.htaccess', 
            'app/favicon.ico', 
            'app/sw.js', 
            'app/browserconfig.xml',
            'app/manifest.json',
            ])
    .pipe(gulp.dest('dist'))

  // gulp.src('app/assets/fonts/*')
  //   .pipe(gulp.dest('dist/assets/fonts'))

  gulp.src(['app/assets/images/**/*', '!app/assets/images/sprite/*', '!app/assets/images/sprite'])
    .pipe(gulp.dest('dist/assets/images'))  

  gulp.src(['app/assets/fonts/**/*'])
    .pipe(gulp.dest('dist/assets/fonts'))

  gulp.src(['app/assets/scripts/vendor/html5shiv.js'])
    .pipe(gulp.dest('dist/assets/scripts/vendor'))


  gulp.src(['app/assets/icons/**/*'])
    .pipe(gulp.dest('dist/assets/icons'))

  gulp.src('app/content/data/*.json')
    .pipe(gulp.dest('dist/content/data'))

  return gulp.src('app/content/files/**/*')
    .pipe(gulp.dest('dist/content/files'))
});

/**
* Copy all PHP includes
*/

gulp.task('copy-php', function() {
  gulp.src(['app/index.php'])
    //.pipe(replace("ENV = 'dev'", "ENV = 'prod'"))
    .pipe(gulp.dest('dist/'));

  gulp.src(['app/content/logic/*.php', 'app/content/pages/*.php'], {base:"app/content"})
    .pipe(gulp.dest('dist/content'));
  
  return gulp.src(['app/content/cache'])
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/content/'));
})  

/**
 * Alle Dateien in den den dist Ordner kopieren
 */
gulp.task('copy', function(callback) {
    runSequence('copy-php', 'copy-misc', 'adjust-paths-after-copying', callback);
});


// /**
// *  Adjust paths when copying, if necessary
// */

gulp.task('adjust-paths-after-copying', function() {
  gulp.src('dist/index.php')
  .pipe(replace('../vendor/', 'vendor/'))
  .pipe(gulp.dest('dist'));    
  // return gulp.src('app/content/logic/contact.php')
  // .pipe(replace('dirname(dirname(dirname(__DIR__)))', 'dirname(dirname(__DIR__))'))
  // .pipe(gulp.dest('dist/content/logic'));
});