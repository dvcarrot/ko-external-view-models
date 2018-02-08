const gulp = require('gulp');
const server = require('browser-sync');
const concat = require('gulp-concat');

gulp.task('vendor-js', function () {
    const sources = [
        'bower_components/lodash/dist/lodash.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/knockout/dist/knockout.js'
    ];
    gulp.src(sources)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./scripts/'));
});

gulp.task('serve', function () {
    server.init({
        server: ".",
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch("*.html").on("change", server.reload);
    gulp.watch("components/*.html").on("change", server.reload);
    gulp.watch("scripts/*.js").on("change", server.reload);
});
