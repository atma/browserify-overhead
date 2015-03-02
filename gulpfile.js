var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var size = require('gulp-size');
var rimraf = require('rimraf');


// Concatenate and uglify all the files with no modification
gulp.task('uglify:original', ['uglify:small', 'uglify:large', 'uglify:many', 'uglify:subdeps', 'uglify:prod']);

gulp.task('uglify:small', function() {
    return gulp.src('./src/small/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('small.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/small/'));
});

gulp.task('uglify:large', function() {
    return gulp.src(['./node_modules/lodash/index.js', './src/large/entry.js'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('large.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/large/'));
});

gulp.task('uglify:many', function() {
    return gulp.src('./src/many/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('many.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/many/'));
});

gulp.task('uglify:subdeps', function() {
    return gulp.src('./src/subdeps/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('subdeps.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/subdeps/'));
});

gulp.task('uglify:prod', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/backbone/node_modules/underscore/underscore.js',
            './node_modules/backbone/backbone.js',
            './src/prod/*.js'
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('prod.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/prod/'));
});


// Clean task
gulp.task('clean', function(cb) {
    rimraf('./build', cb);
});


// Browserify all bundles
gulp.task('browserify', ['browserify:small', 'browserify:large', 'browserify:many', 'browserify:subdeps', 'browserify:prod']);

// Browserify "small" bundle
gulp.task('browserify:small', function() {
    return browserify({
            entries: ['./src/small/entry.js'],
            debug: true
        })
        .bundle()
        .pipe(source('small-bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/small/'));
});

// Browserify "large" bundle (includes lodash)
gulp.task('browserify:large', function() {
    return browserify({
        entries: ['./src/large/entry.js'],
        debug: true
    })
        .bundle()
        .pipe(source('large-bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/large/'));
});

// Browserify "many" bundle
gulp.task('browserify:many', function() {
    return browserify({
        entries: ['./src/many/entry.js'],
        debug: true
    })
        .bundle()
        .pipe(source('many-bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/many/'));
});

// Browserify "subdeps" bundle
gulp.task('browserify:subdeps', function() {
    return browserify({
        entries: ['./src/subdeps/entry.js'],
        debug: true
    })
        .bundle()
        .pipe(source('subdeps-bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/subdeps/'));
});

// Browserify "prod" bundle
gulp.task('browserify:prod', function() {
    return browserify({
        entries: ['./src/prod/entry.js'],
        debug: true
    })
        .bundle()
        .pipe(source('prod-bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            showFiles: true,
            gzip: false
        }))
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('./build/prod/'));
});

// Runs all tasks
gulp.task('default', ['uglify:original', 'browserify']);
