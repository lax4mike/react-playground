var gulp          = require("gulp"),
    utils         = require("./utils"),
    config        = utils.loadConfig(),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    concat        = require("gulp-concat");


// css
gulp.task("css", function(){

    return gulp.src(config.css.src)
        .pipe(utils.drano())
        .pipe(sass(config.sass))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(pixrem())
        .pipe(concat(config.css.filename))
        .pipe(gulp.dest(config.css.dest));
});


// watch css
if (config.watch){
    utils.logYellow("watching", "css:", config.css.watch);
    gulp.watch(config.css.watch, ["css"]);
}

