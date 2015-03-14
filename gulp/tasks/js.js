var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    browserify     = require("browserify"),
    transform      = require("vinyl-transform");

// maybe we"ll do this someday if we can integrate it with bower
// http://lincolnloop.com/blog/speedy-browserifying-multiple-bundles/

// dev/default settings 
var js = {
    src   : config.root + "/js/index.js",
    watch : config.root + "/js/**/*.js",
    dest  : config.dest + "/js",

    // js uglify options , to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    uglify: false,

    // include source maps
    browserify: {
        debug: true
    }
};

// production settings
if (config.env === "prod"){

    // uglify javascript for production
    js.uglify = {};

    // do not include sourcemaps
    js.browserify = {
        debug: false
    };
}



/* compile application javascript */
gulp.task("js", function(){

    // for browserify usage, see https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    var browserified = transform(function(filename) {
        var b = browserify(js.browserify || {});
        b.add(filename);
        return b.bundle();
    });

    return gulp.src(js.src)
        .pipe(utils.drano())
        .pipe(browserified)
        .pipe(gulpif((js.uglify), uglify(js.uglify)))
        .pipe(gulp.dest(js.dest));

});

// watch js
if (config.watch){
    utils.logYellow("watching", "js:", js.watch);
    gulp.watch(js.watch, ["js"]);
}

