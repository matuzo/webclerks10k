    const gulp = require('gulp'),
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      changed = require('gulp-changed'),
      replace = require('gulp-replace');

require('require-dir')('gulp-tasks');

/**
 * Projekt starten
 */

gulp.task('default', ['compile-js'], function() {
    browserSync.init({
        proxy: "webclerks10k.dev"
    });

    /**
    *  Refresh browser if .php, .scss or .js files change
    *  Compile Sass to CSS
    */

    // gulp.watch(['app/content/**/*.php', '!app/content/cache/*.php'], reload);
    gulp.watch(['app/assets/styles/**/*.scss'], ['compile-sass', reload]);
    gulp.watch(['app/assets/scripts/**/*.js', '!app/assets/scripts/main.compiled.js', '!app/assets/scripts/main.compiled.js.map'], ['compile-js', reload]);
});

/**
* Dist Task
* Dist Ordner durchputzen und alle notwendigen Dateien kopieren
*/

gulp.task('dist', function(callback) {
  runSequence('clean-scripts', 
              'clean-styles', 
              'update-serviceworker-version',
              'minify-blade-and-copy', 
              'copy', 
              // 'revSprite', 
              'optimize-css',
              'optimize-js',
              'usemin',
              'replaceSpriteRev', 
              'inject-css',
               callback);
});

/**
 * Nicht die beste Lösung, aber ok...
 * Im /diff Ordner ist immer die letzte Version des sw.js
 * bei jedem `gulp dist` wird gecheckt ob die Version in /app der Version
 * in /diff entspricht. Wenn nicht, bekommen alle drei (/app, /dist, /diff)
 * eine neue Versionsnummer und werden angeglichen an die /app Version
 */
gulp.task('update-serviceworker-version', () => {
    return gulp.src('app/sw.js')
        // Checken ob sich die Service Worker Datei seit dem letzten Mal verändert hat
        .pipe(changed('diff', { hasChanged: changed.compareSha1Digest}))
        // Wenn ja, den string mit der Versionsnummber holen
        .pipe(replace(/'webclerks-static-.[0-9]*'/g, function(oldVersion) {
            // und um 1 erhöhen
            var oldNumber = oldVersion.match(/\d+/);
            var newNumber = parseInt(oldNumber) + 1;
            return "'webclerks-static-v" + newNumber + "'";
        }))
        // dann im app, diff und dist Ordner speichern
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('diff'))
        .pipe(gulp.dest('dist'));
});