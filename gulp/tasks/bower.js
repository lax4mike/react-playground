var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    minifyCSS      = require("gulp-minify-css"),
    mainBowerFiles = require("main-bower-files"),
    sourcemaps     = require("gulp-sourcemaps");


// dev/default settings
var bower = {
    root: config.root + "/bower/",

    js: {
        filename: "vendor.js",
        dest: config.dest + "/js"
    },
    
    css: {
        filename: "vendor.css",
        dest: config.dest + "/css",
    },

    // to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    uglify: false,

    // to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    minifyCSS: false,

    sourcemaps: true
};

// production settings
if (config.env === "prod"){

    // https://github.com/codemirror/CodeMirror/issues/2276
    // http://blog.entelect.co.za/view/6435/minification-and-why-i-m-seeing-instead-of-whitespace
    bower.uglify = {
        output: { 
            ascii_only: true 
        }
    };
    bower.minifyCSS = {};
    bower.sourcemaps = false;
}



/* bundle up vendor libraries (from bower) */
// http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
gulp.task("bower", function(next){

    if (!bower || !bower.root){
        utils.logYellow("bower", "not configured");
        return;
    }

    // https://github.com/ck86/main-bower-files
    // mainBowerFiles returns array of "main" files from bower.json
    var bowerfiles = mainBowerFiles({
        checkExistence: true,
        paths: bower.root,
        debugging: false
    });

    if (bowerfiles.length === 0){
        return;
    }

    // log the bower files to the gulp output
    utils.logYellow("bower files", "\n\t" + bowerfiles.join("\n\t"));

    // make js
    var bowerJs = gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("js"))

            // include sourcemaps
            .pipe(gulpif(bower.sourcemaps,  sourcemaps.init() ))
                .pipe(concat(bower.js.filename))
            .pipe(gulpif(bower.sourcemaps, sourcemaps.write() ))

        .pipe(gulpif((bower.uglify), uglify(bower.uglify)))
        .pipe(gulp.dest(bower.js.dest));

    // make css
    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("css"))
        .pipe(concat(bower.css.filename))
        .pipe(gulpif((bower.minifyCSS), minifyCSS(bower.minifyCSS)))
        .pipe(gulp.dest(bower.css.dest));


    next();

});

// watch bower.json to regenerate vendor libraries
if (config.watch){
    var bowerJson = bower.root + "bower.json";
    utils.logYellow("watching", "bower:", bowerJson);
    gulp.watch(bowerJson, ["bower"]);
}



function filterByExtension(extension){  
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
}
