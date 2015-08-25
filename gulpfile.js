"use strict";
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');

gulp.task('lint', function() {
    gulp.src('js/main.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
    return sass('sass/', { style: 'expanded' })
        .pipe(prefix("last 3 version", "> 1%", "ie 8"))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('css/'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/'))
});

gulp.task('scripts', function() {
    gulp.src(['js/jquery-1.11.3.min.js', 'js/picturefill.min.js', 'js/svgeezy.min.js', 'js/main.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js/'))
        .pipe(rename('main.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
    gulp.watch('js/main.js', ['lint', 'scripts']);
    gulp.watch('sass/**/{*.sass,*.scss}', ['sass']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['lint', 'scripts', 'sass']);
