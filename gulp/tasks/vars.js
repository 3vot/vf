var gulp = require('gulp');

gulp.task('setVarsLocal', function() {
	global.isWatching = true;
});

gulp.task('setVarsProduction', function() {
  global.isWatching = false;
});