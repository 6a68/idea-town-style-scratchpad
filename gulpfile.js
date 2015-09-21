var gulp = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    neat = require('node-neat'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass');

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe(sass({
       includePaths: bourbon.with(neat.includePaths)
     }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/'))
});

gulp.task('connect', function connectTask() {
  connect.server({
    root: 'app',
    livereload: false,
    port: 9988
  });
});

gulp.task('move', function() {
  gulp.src('./node_modules/mozilla-tabzilla/**/*')
  .pipe(gulp.dest('./app/lib/mozilla-tabzilla'));
});

gulp.task('server', ['styles', 'connect']);

gulp.task('default', ['server'], function() {
  livereload.listen()
  gulp.watch('app/**/*',['styles']).on('change',livereload.changed);
  gulp.watch('app/index.html',['styles']).on('change',livereload.changed);
});
