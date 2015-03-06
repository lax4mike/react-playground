var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    browserify     = require("browserify"),
    transform      = require("vinyl-transform");

// maybe we"ll do this someday if we can integrate it with bower
// http://lincolnloop.com/blog/speedy-browserifying-multiple-bundles/


/* compile application javascript */
gulp.task("js", function(){

    // for browserify usage, see https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    var browserified = transform(function(filename) {
        var b = browserify(config.browserify || {});
        b.add(filename);
        return b.bundle();
    });

    return gulp.src(config.js.src)
        .pipe(utils.drano())
        .pipe(browserified)
        .pipe(gulpif((config.uglify), uglify(config.uglify)))
        .pipe(gulp.dest(config.js.dest));

});

// watch js
if (config.watch){
    utils.logYellow("watching", "js:", config.js.watch);
    gulp.watch(config.js.watch, ["js"]);
}

