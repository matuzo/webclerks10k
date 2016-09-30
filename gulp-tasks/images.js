var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rev = require('gulp-rev'),
    webp = require('gulp-webp'),
    override = require('gulp-rev-css-url');

const spriteConfig = {
    mode: {
        css: {
            render: {
                scss: {
                    dest: '../styles/abstracts/_sprite.scss'
                }
            },
            bust: false,
            dest: 'assets',
            sprite: '../images/sprite.svg',
            layout: 'horizontal'
        }
    },
    shape: {
        dimension       : {         // Set maximum dimensions
            maxWidth    : 64,
            maxHeight   : 64
        },
        spacing: {                         // Spacing related options
            padding : 1,
            box: 'padding'
        }
    }
};

gulp.task('sprite', function () {
    return gulp.src('app/assets/images/sprite/*.svg')
        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest('app/assets'))
});

gulp.task('replaceSpriteRev',function(){
    return gulp.src(['dist/assets/**/*', '!dist/assets/fonts/*', '!dist/assets/icons/*', '!dist/assets/images/icons/*', '!dist/assets/scripts/vendor/*', '!dist/assets/images/webclerks_logo.svg', '!dist/assets/styles/main.css'])
                .pipe(rev())
                .pipe(override())
                .pipe(gulp.dest('dist/assets/'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('dist/'))
});


gulp.task('webp', () =>
    gulp.src('app/content/files/images/**/*')
        .pipe(webp())
        .pipe(gulp.dest('app/content/files/images'))
);