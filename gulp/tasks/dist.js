var gulp = require('gulp');
var notify = require("gulp-notify");

var VFSR = require("3vot-clay/plugins/staticresource");
var VFT = require("3vot-clay/plugins/transform");

var handleErrors = require('../util/handleErrors');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var jsonminify = require('gulp-jsonminify');
var revall = require('gulp-rev-all');
var clean = require('gulp-clean');
var p = require('../../package.json');



gulp.task('clean', ['build'], function() {
    return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('./build/**')
//    .pipe(revall({
  //      ignore: [/^\/favicon.ico$/g, /^\/index.html/g, /^\/captions/g, /^\/images\/static/g, /^\/sounds/g, /^\/images\/social/g, /^\/images\/map\/dist/g]//,
        //prefix: global.previewUrl || p.previewUrl
//    }))
    .pipe(gulp.dest('dist'));
});

gulp.task( 'staticresource', ['setVarsProduction', 'copy'], function () {
  return gulp.src( "dist/**" )
    .pipe( VFSR({ instance_url: process.env.INSTANCE_URL , access_token: process.env.ACCESS_TOKEN , name: process.env.NAME  }) )
    .on('error', handleErrors)
});

gulp.task( 'dist', ['staticresource'], function () {
  gulp.src( "dist/**" )
  .pipe( VFT({ name: process.env.NAME, open: true }) )
  .on('error', handleErrors);

});