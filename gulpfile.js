const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const stylish = require('gulp-jscs-stylish');
const postcss = require('gulp-postcss');
const base64 = require('gulp-base64');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const header = require('gulp-header');
const fs = require('fs');

gulp.task('connect', function () {
    // runs connect server
    connect.server({
        root: ""
    });
});

gulp.task('open', function () {
    // open browser with example
    var uri = 'http://localhost:8080/example.html';
    open(uri);
});

gulp.task('checkcode', function () {
    // validate source code using jscs and jshint
    gulp.src('.')
        .pipe(jshint())
        .pipe(jscs())
        .on('error', function () { })
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function () {
    // compile css and assets, add license information
    var stream = gulp.src(['UIColorPicker/**/*.css', '!UIColorPicker/resources/**/'])
        .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
        .pipe(base64())
        .pipe(cleanCss())
        .pipe(concat('UIColorPicker.css'))
        .pipe(header(fs.readFileSync('licenses/mozilla.txt', 'utf8')))
        .pipe(gulp.dest('UIColorPicker/resources/'));
    return stream;
});
