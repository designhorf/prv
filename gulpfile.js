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
    tinfier = require('gulp-tinifier'),
    sassLint = require('gulp-sass-lint'),
    gulpCopy = require('gulp-copy'),
    testDest = './test',
    destination = './public';


var options = {
    key:'Ka7s1XBXsoRBUseVfRm7lmCDFaOzXTqX',
    verbose: true
};

// var config = require('./gulp.config.js');
var imgToCompress = './images/**/*';
var distFolder = './testImg';

gulp.task('clean', function () {
    return gulp.src(destination + '/*')
        .pipe(clean());
});

gulp.task('gulpCopy', function() {
  var fontsSource = './fonts/**/*.*';

  gulp.src(fontsSource)
  .pipe(gulp.dest(destination + '/fonts'));
});

gulp.task('compress', function() {
  gulp.src('./assets/stylesheets/*.css')
  .pipe(gzip())
  .pipe(gulp.dest(destination));
  setTimeout(() => console.log('Done!'),  500);
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

gulp.task('sasslint', function () {
  return gulp.src('stylesheets/**/*.scss')
    .pipe(sassLint({
      rules: {
        'no-transition-all': 0,
        'no-ids': 1
      },
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});



gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['sasslint', 'sass', 'autoprefixer', 'compress']);
});

gulp.task('default', function() {
  runSequence('clean',
              ['sasslint', 'sass', 'uglify', 'codeminify', 'imagemin'],
              'gulpCopy',
              'autoprefixer',
              'compress'
              );
});
