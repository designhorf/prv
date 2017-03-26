'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    gzip = require('gulp-gzip'),
    htmlmin = require('gulp-htmlmin'),
    testDest = './test';

gulp.task('compress', function() {
    gulp.src('./index.html')
    .pipe(gzip())
    .pipe(gulp.dest(testDest));
});

gulp.task('sass', function () {
  return gulp.src('./stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(testDest));
});

gulp.task('autoprefixer', function () {
  return gulp.src('./test/**/*.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'], cascade: false })]))
    .pipe(gulp.dest(testDest));
});

gulp.task('css:watch', function () {
  gulp.watch('./stylesheets/**/*.scss', ['stylesheets']);
});

gulp.task('minify', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(testDest));
});

gulp.task('default', ['sass', 'autoprefixer', '']);
