var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    rename         = require("gulp-rename");



/* html */
gulp.task("html", function(next) {


    return gulp.src(config.html.src)
            .pipe(utils.drano())
            .pipe(gulp.dest(config.html.dest));

});


// watch html
if (config.watch){
    utils.logYellow("watching", "html:", config.html.watch);
    gulp.watch(config.html.watch, ["html"]);
}

