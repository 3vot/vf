var browserSync = require('browser-sync');
var gulp        = require('gulp');



gulp.task('browserSync', ['build', 'vfpage'], function() {

   browserSync({
    https: true,
    server: {
      https: true,
      // src is included for use with sass source maps
      baseDir: ['build', 'src'],
      middleware: function (req, res, next) {
        if(req.url.indexOf("/validate") == 0 ) return res._send('<script>window.location ="' + process.env.INSTANCE_URL + "/apex/" + process.env.NAME + "_dev" + '";</script>');
        next();
      }
    },
    notify: true,

    socket: {
        namespace: function (namespace) {
            return "https://localhost:3000" + namespace;
        }
    },

    scriptPath: function (path) {
      return "https://localhost:3000" + path;
    },

    startPath: "/validate?url=" + process.env.INSTANCE_URL + "/apex/" + process.env.NAME + "_dev",
    files: [ "build/**" ]
  });


});


 