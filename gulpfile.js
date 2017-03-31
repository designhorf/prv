'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    gzip = require('gulp-gzip'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    testDest = './test',
    destination = './assets';

gulp.task('clean', function () {
    return gulp.src(destination + '/*')
        .pipe(clean());
});

gulp.task('compress', function() {
  gulp.src('./assets/stylesheets/*.css')
  .pipe(gzip())
  .pipe(gulp.dest(destination));
});

gulp.task('uglify', function () {
  return gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(destination + '/js'));
});

gulp.task('sass', function () {
  return gulp.src('./stylesheets/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(destination + '/stylesheets'));
});

gulp.task('autoprefixer', function () {
  var cssDest = destination + '/stylesheets';
  return gulp.src(cssDest)
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'], cascade: false })]))
    .pipe(gulp.dest(cssDest));
});

gulp.task('codeminify', function() {
  return gulp.src(['./*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(testDest));
});

gulp.task('imagemin', function() {
  return gulp.src('./images/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ], {verbose: true}
    ))
		.pipe(gulp.dest(destination + '/images'));
});



gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['sass', 'autoprefixer', 'compress']);
});

gulp.task('default', function() {
  runSequence('clean',
              ['sass', 'uglify', 'codeminify', 'imagemin'],
              'autoprefixer',
              'compress'
              );
});
