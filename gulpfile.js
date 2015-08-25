"use strict";
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var ghBuild = require('gulp-gh-pages');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;

gulp.task('jekyll-prod', function (gulpCallBack){
   var enviroment = process.env
   enviroment['JEKYLL_ENV'] = 'production';
   var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', env: enviroment});

   jekyll.on('exit', function(code) {
       gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
   });
});

gulp.task('jekyll-dev', function (done) {
    browserSync.notify('Running: $ jekyll build - This takes awhile...');

    spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('clean-prod', ['jekyll-prod'], function(){
  return gulp.src(['_site/css/*', '_site/js/*'], {read: false})
        .pipe(clean());
});

gulp.task('prod-sass', ['clean-prod'], function() {
    return sass('sass/', { style: 'compact' })
        .pipe(prefix("last 3 version", "> 1%", "ie 8"))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('_site/css/'))
});

gulp.task('prod-js', ['clean-prod'], function() {
    gulp.src(['js/jquery-1.11.3.min.js', 'js/picturefill.min.js', 'js/svgeezy.min.js', 'js/selectivizr-min.js', 'js/main.js'])
        .pipe(rename('main.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('_site/js/'));
});

gulp.task('lint', function() {
    gulp.src('js/main.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('reload-js', ['lint'], function(){
  gulp.src('js/main.js')
      .pipe(gulp.dest('_site/js'))
      .pipe(browserSync.reload({stream:true}))
})

gulp.task('sass', function() {
    return sass('sass/', { style: 'expanded' })
        .pipe(prefix("last 3 version", "> 1%", "ie 8"))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', ['sass', 'jekyll-dev'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('js/main.js', ['lint', 'reload-js']);
    gulp.watch('sass/**/{*.sass,*.scss}', ['sass']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('dev', ['browser-sync', 'watch']);
gulp.task('build', ['jekyll-prod', 'clean-prod','prod-sass', 'prod-js']);
gulp.task('default', ['dev']);
