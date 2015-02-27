var gulp = require('gulp');
var rename = require('gulp-rename');
var gulpBrowserify = require('gulp-browserify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//
gulp.task('small1', function() {
    gulp.src('./src/small/entry.js')
        .pipe(gulpBrowserify({
            insertGlobals : false,
            debug : true
        }))
        .pipe(uglify())
        .pipe(rename('bundle1.js'))
        .pipe(gulp.dest('./build/small'));
});

gulp.task('small2', function() {
    return browserify('./src/small/entry.js')
        .bundle()
        .pipe(source('bundle2.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/small'));
});

gulp.task('small3', function() {
    return browserify('./src/small/entry.js', {debug: true})
        .plugin('minifyify', {output: './build/small/bundle3.map.json'})
        .bundle()
        .pipe(source('bundle3.js'))
        .pipe(gulp.dest('./build/small'));
});

gulp.task('default', ['small1', 'small2', 'small3']);
