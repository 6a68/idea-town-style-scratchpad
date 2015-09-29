var gulp = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    normalize = require('node-normalize-scss');

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: normalize.includePaths}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    // option passed in on the next line ensures FF doesn't
    // shit the bed when trying to figure out where
    // normalize comes from
    .pipe(sourcemaps.write({sourceRoot: 'app/styles'}))
    .pipe(gulp.dest('app/'))
});

gulp.task('connect', function connectTask() {
  connect.server({
    root: 'app',
    livereload: false,
    port: 9988
  });
});

gulp.task('move:jquery', function() {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./app/lib/jquery'));
});

gulp.task('move:tabzilla', function() {
  gulp.src('./node_modules/mozilla-tabzilla/**/*')
  .pipe(gulp.dest('./app/lib/mozilla-tabzilla'));
})

gulp.task('server', ['styles', 'connect']);

gulp.task('default', ['server'], function() {
  livereload.listen()
  gulp.watch('app/**/*',['styles']).on('change',livereload.changed);
  gulp.watch('app/index.html',['styles']).on('change',livereload.changed);
});
