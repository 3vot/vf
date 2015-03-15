var gulp = require('gulp');
var config  = require("r2-config");

gulp.task('setVarsLocal', function() {
	global.isWatching = true;
  config.set("env", "local");
   config.set("host", "https://localhost:3000");
});

gulp.task('setVarsProduction', function() {
  global.isWatching = false;
});