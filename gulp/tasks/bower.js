var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    minifyCSS      = require('gulp-minify-css'),
    mainBowerFiles = require("main-bower-files");



/* bundle up vendor libraries (from bower) */
// http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
gulp.task("bower", function(next){

    if (!config.bower || !config.bower.root){
        utils.logYellow("bower", "not configured");
        return;
    }

    // https://github.com/ck86/main-bower-files
    // mainBowerFiles returns array of "main" files from bower.json
    var bowerfiles = mainBowerFiles({
        checkExistence: true,
        paths: config.bower.root,
        debugging: false
    });

    if (bowerfiles.length === 0){
        return;
    }

    // log the bower files to the gulp output
    utils.logYellow("bower files", "\n\t" + bowerfiles.join("\n\t"));

    // make js
    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("js"))
        .pipe(concat(config.bower.jsFilename))
        .pipe(gulpif((config.uglify), uglify(config.uglify)))
        .pipe(gulp.dest(config.js.dest));

    // make css
    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("css"))
        .pipe(concat(config.bower.cssFilename))
        .pipe(gulpif((config.minifyCSS), minifyCSS(config.minifyCSS)))
        .pipe(gulp.dest(config.css.dest));


    next();

});

// watch bower.json to regenerate vendor libraries
if (config.bower && config.bower.root && config.watch){
    var bowerJson = config.bower.root + "bower.json";
    utils.logYellow("watching", "bower:", bowerJson);
    gulp.watch(bowerJson, ["bower"]);
}



var filterByExtension = function(extension){  
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
};
