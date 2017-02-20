// gulpfile.js
var gulp = require("gulp");
var gutil = require("gulp-util");
var src = {
    // html 文件
    html: "src/html/*.html",
    // vendor 目录和 bower_components
    vendor: ["vendor/**/*", "bower_components/**/*"],
    // style 目录下所有 xx/index.less
    style: "src/style/*/index.less",
    // 图片等应用资源
    assets: "assets/**/*"
};

var dist = {
    root: "dist/",
    html: "dist/",
    style: "dist/style",
    vendor: "dist/vendor",
    assets: "dist/assets"
};

var bin = {
    root: "bin/",
    html: "bin/",
    style: "bin/style",
    vendor: "bin/vendor",
    assets: "bin/assets"
};

var del = require("del");

/**
 * clean build dir
 */
function clean(done) {
    del.sync(dist.root);
    done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
      .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
      .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
    return gulp.src(dist.root + '**/*')
      .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src(src.style)
      .pipe(cached('style'))
      .pipe(less())
      .on('error', handleError)
      .pipe(autoprefixer({
          browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

