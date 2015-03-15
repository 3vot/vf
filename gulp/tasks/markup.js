var gulp = require('gulp');
var notify = require("gulp-notify");

var VFT = require("3vot-clay/plugins/transform");
var handleErrors = require('../util/handleErrors');


var dest = './build';

gulp.task('markup', function() {
  return gulp.src('src/htdocs/**')	
   .pipe(gulp.dest(dest));
});
