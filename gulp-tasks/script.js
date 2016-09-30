const gulp = require('gulp'),
      clean = require('gulp-clean'),
      webpack = require('gulp-webpack'),
      uglify = require('gulp-uglify'),
      rev = require('gulp-rev'),
      rename = require('gulp-rename');


// Alle Revisionen der JS-Dateien im Dist-Ordner löschen
gulp.task('clean-scripts', function () {
  return gulp.src('dist/assets/scripts/*.js', {read: false})
  .pipe(clean());
});

// ES6 Javascript zu ES5 kompilieren
// und mit webpack bundlen
gulp.task('compile-js', function() {
    return gulp.src('app/assets/scripts/main.js')
        .pipe(webpack( require('../webpack.config.js') ))
        .pipe(gulp.dest('app/assets/scripts/'))
})

gulp.task('rev-js', function() {
    return gulp.src('dist/assets/scripts/*.js')
        .pipe(rev.manifest({merge: true}))
        .pipe(gulp.dest('dist'))
})

/**
 * JS uglifyen
 * Datei umbennen
 * Revision erstellen
 * Pfad in rev Manifest schreiben
 */
gulp.task('optimize-js', function() {
    return gulp.src('app/assets/scripts/main.compiled.js')
        .pipe(uglify())
        .pipe(rename('m.js'))
        .pipe(gulp.dest('dist/assets/scripts'))
});