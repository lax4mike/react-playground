var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    svgmin         = require("gulp-svgmin");


// images 
gulp.task("images", function(next){

    var images = gulp.src(config.images.src)
                    .pipe(gulp.dest(config.images.dest));

    var svg = gulp.src(config.svg.src)
                .pipe(svgmin())
                .pipe(gulp.dest(config.images.dest));

    next();

});

// watch css
if (config.watch){
    utils.logYellow("watching", "images:", config.images.watch);
    gulp.watch(config.images.watch, ["images"]);
}
