const gulp = require('gulp'),
      sass = require('gulp-sass'),
      gcmq = require('gulp-group-css-media-queries'),
      rev = require('gulp-rev'),
      clean = require('gulp-clean'),
      rename = require('gulp-rename'),
      minifyCss = require('gulp-minify-css'),
      uncss = require('gulp-uncss'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps');


// Sass zu CSS kompilieren
gulp.task('compile-sass', function () {
  return gulp.src(['app/assets/styles/main.scss', 'app/assets/styles/critical.scss', 'app/assets/styles/enhanced.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/styles/'));
});


// Alle Revisionen der CSS-Dateien im Dist-Ordner löschen
gulp.task('clean-styles', function () {
  return gulp.src('dist/assets/styles/*.css', {read: false})
    .pipe(clean());
});

/**
 * Doppelte Media Queries löschen
 * CSS minifyen
 * Datei umbennen
 * Revision erstellen
 * Pfad in rev Manifest schreiben
 */
gulp.task('optimize-css', function() {
  var url = 'http://localhost:3000';
  var urls = [url, 
             url+'/events',
             url+'/news/projekte', 
             url+'/news/branche', 
             url+'/meetup', 
             url+'/meetup/vergangene', 
             url+'/404', 
             url+'/offline', 
             url+'/webclerks', 
             url+'/kontakt'];
  var ignores = [
        '.art__imgct--image-loaded', 
        '.ft__imgct--webclerks', 
        '.art__imgct--webclerks', 
        '.page--navvisible', 
        '.art__img', 
        'img', 
        '.jobs',
        '.jobs',
        '.projects',
        '.btn__toggle-offcanvas',
        /^.mobile-list/,
        /^.mobile-card/,
        /^.dialog/,
        /^.no-svg/,
        /^.site__hl/,
        /^.btn/,
        /^.modal/,
        /^.nav__arrow/]
    gulp.src(['app/assets/styles/main.css'])
    .pipe(gcmq())
    .pipe(minifyCss())
    .pipe(uncss({
      html: urls,
      ignore: ignores
    }))
    .pipe(gulp.dest('dist/assets/styles'))


  return gulp.src(['app/assets/styles/main.css', 'app/assets/styles/enhanced.css'])
    .pipe(concat('m.css'))
    .pipe(gcmq())
    .pipe(minifyCss())
    .pipe(uncss({
      html: urls,
      ignore: ignores
    }))
    .pipe(gulp.dest('dist/assets/styles'))
});