var gulp = require('gulp');
var notify = require("gulp-notify");

var VFT = require("3vot-clay/plugins/transform");
var handleErrors = require('../util/handleErrors');

gulp.task('vfpage', function() {
  return gulp.src('src/htdocs/index.html')
	.pipe( VFT({ name: process.env.NAME + "_dev", host: "https://localhost:3000" }) )
   .on('error', handleErrors)
});


