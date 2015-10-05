"use strict";
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;
var ghPages = require('gulp-gh-pages');
var argv = require('yargs').argv;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

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

gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
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
        .pipe(gulp.dest('_site/css'))
});

gulp.task('prod-js', ['babel','clean-prod'], function() {
    gulp.src(['js/jquery-1.11.3.min.js', 'js/svgeezy.min.js', 'js/selectivizr-min.js', 'js/modernizr-custom-mq.js','js/bundle.js'])
        .pipe(concat('all.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('_site/js/'));
});

gulp.task('lint', function() {
    gulp.src('js/main.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('babel',['lint'], function () {
  return browserify('js/main.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function (err) { console.log('Error : ' + err.message); })
    .pipe(source('bundle.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('js'))
});


gulp.task('reload-js', ['babel'], function(){
    return gulp.src('js/bundle.js')
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

// Seperate task to build and move sass on jekyll rebuild
// - sass-on-build depends on sass rebuild taking an aditional 2s even if only updating sass
//  used for inital launch and when rebuilding _site/
gulp.task('sass-on-build', ['jekyll-dev'], function() {
    return sass('sass/', { style: 'expanded' })
        .pipe(prefix("last 3 version", "> 1%", "ie 8"))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', ['jekyll-dev', 'sass-on-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('deploy', ['build'], function() {
  var message = argv.m || 'Update ' + new Date().toISOString();
  return gulp.src('./_site/**/*')
    .pipe(ghPages({
      message: argv.m
    }));
});

gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['reload-js']);
    gulp.watch('sass/**/{*.sass,*.scss}', ['sass']);
    gulp.watch(['*.html', '**/*.html', '_posts/*', '_data/*'], ['jekyll-rebuild', 'sass', 'reload-js']);
});

gulp.task('dev', ['browser-sync', 'watch']);
gulp.task('build', ['jekyll-prod', 'clean-prod','prod-sass', 'prod-js']);
gulp.task('default', ['dev']);