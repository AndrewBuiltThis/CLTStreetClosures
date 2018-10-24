
// This is the gulp file to watch for changes to the application
// and to compile the scss into css for the application.

const gulp =  require('gulp');
const sass = require('gulp-sass');

// Compile the scss files into css
gulp.task('sass', function() {
    gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/css'));
});

// Compile and watch
gulp.task('sass:watch', function() {
    gulp.watch('./scss/*.scss', ['sass']);
});